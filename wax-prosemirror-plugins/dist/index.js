'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var prosemirrorState = require('prosemirror-state');
var prosemirrorView = require('prosemirror-view');
var lodash = require('lodash');
var waxProsemirrorUtilities = require('wax-prosemirror-utilities');
var hljs = _interopDefault(require('highlight.js/lib/core'));
var prosemirrorHighlightjs = require('prosemirror-highlightjs');

function deactivateAllSelectedChanges(tr) {
  const pluginState = {
    decos: prosemirrorView.DecorationSet.empty
  };
  return tr.setMeta(key, pluginState).setMeta('track', true);
} // From https://discuss.prosemirror.net/t/expanding-the-selection-to-the-active-mark/478/2 with some bugs fixed

function getFromToMark(doc, pos, mark) {
  const $pos = doc.resolve(pos),
        parent = $pos.parent;
  const start = parent.childAfter($pos.parentOffset);

  if (!start.node) {
    return null;
  }

  let startIndex = $pos.index(),
      startPos = $pos.start() + start.offset;

  while (startIndex > 0 && mark.isInSet(parent.child(startIndex - 1).marks)) {
    startPos -= parent.child(--startIndex).nodeSize;
  }

  let endIndex = $pos.index() + 1,
      endPos = $pos.start() + start.offset + start.node.nodeSize;

  while (endIndex < parent.childCount && mark.isInSet(parent.child(endIndex).marks)) {
    endPos += parent.child(endIndex++).nodeSize;
  }

  return {
    from: startPos,
    to: endPos
  };
}

const findSelectedChanges = state => {
  const selection = state.selection,
        selectedChanges = {
    insertion: false,
    deletion: false,
    formatChange: false
  };
  let insertionPos = false,
      deletionPos = false,
      formatChangePos = false,
      insertionMark,
      deletionMark,
      formatChangeMark,
      insertionSize,
      deletionSize,
      formatChangeSize;

  if (selection.empty) {
    const resolvedPos = state.doc.resolve(selection.from),
          marks = resolvedPos.marks();

    if (marks) {
      insertionMark = marks.find(mark => mark.type.name === 'insertion' && !mark.attrs.approved);

      if (insertionMark) {
        insertionPos = selection.from;
      }

      deletionMark = marks.find(mark => mark.type.name === 'deletion');

      if (deletionMark) {
        deletionPos = selection.from;
      }

      formatChangeMark = marks.find(mark => mark.type.name === 'format_change');

      if (formatChangeMark) {
        formatChangePos = selection.from;
      }
    }
  } else {
    state.doc.nodesBetween(selection.from, selection.to, (node, pos) => {
      if (pos < selection.from) {
        return true;
      }

      if (!insertionMark) {
        insertionMark = node.attrs.track ? node.attrs.track.find(trackAttr => trackAttr.type === 'insertion') : node.marks.find(mark => mark.type.name === 'insertion' && !mark.attrs.approved);

        if (insertionMark) {
          insertionPos = pos;

          if (!node.isInline) {
            insertionSize = node.nodeSize;
          }
        }
      }

      if (!deletionMark) {
        deletionMark = node.attrs.track ? node.attrs.track.find(trackAttr => trackAttr.type === 'deletion') : node.marks.find(mark => mark.type.name === 'deletion');

        if (deletionMark) {
          deletionPos = pos;

          if (!node.isInline) {
            deletionSize = node.nodeSize;
          }
        }
      }

      if (!formatChangeMark) {
        formatChangeMark = node.marks.find(mark => mark.type.name === 'format_change');

        if (formatChangeMark) {
          formatChangePos = pos;

          if (!node.isInline) {
            formatChangeSize = node.nodeSize;
          }
        }
      }
    });
  }

  if (insertionMark) {
    selectedChanges.insertion = insertionSize ? {
      from: insertionPos,
      to: insertionPos + insertionSize
    } : getFromToMark(state.doc, insertionPos, insertionMark);
  }

  if (deletionMark) {
    selectedChanges.deletion = deletionSize ? {
      from: deletionPos,
      to: deletionPos + deletionSize
    } : getFromToMark(state.doc, deletionPos, deletionMark);
  }

  if (formatChangeMark) {
    selectedChanges.formatChange = formatChangeSize ? {
      from: formatChangePos,
      to: formatChangePos + formatChangeSize
    } : getFromToMark(state.doc, formatChangePos, formatChangeMark);
  }

  return selectedChanges;
};

const key = new prosemirrorState.PluginKey('track');
const selectedInsertionSpec = {};
const selectedDeletionSpec = {};
const selectedChangeFormatSpec = {};
var TrackChangePlugin = (options => {
  return new prosemirrorState.Plugin({
    key,
    state: {
      init(config, state) {
        const userIds = ['33'];
        state.doc.descendants(node => {
          if (node.attrs.track) {
            node.attrs.track.forEach(track => {
              if (!userIds.includes(track.user) && track.user !== 0) {
                userIds.push(track.user);
              }
            });
          } else {
            node.marks.forEach(mark => {
              if (['deletion', 'insertion', 'format_change'].includes(mark.type.name) && !userIds.includes(mark.attrs.user) && mark.attrs.user !== 0) {
                userIds.push(mark.attrs.user);
              }
            });
          }
        });
        return {
          decos: prosemirrorView.DecorationSet.empty
        };
      },

      apply(tr, prev, oldState, state) {
        const meta = tr.getMeta(key);

        if (meta) {
          // There has been an update, return values from meta instead
          // of previous values
          return meta;
        }

        let {
          decos
        } = this.getState(oldState);

        if (tr.selectionSet) {
          const {
            insertion,
            deletion,
            formatChange
          } = findSelectedChanges(state);
          decos = prosemirrorView.DecorationSet.empty;
          const decoType = tr.selection.node ? prosemirrorView.Decoration.node : prosemirrorView.Decoration.inline;

          if (insertion) {
            decos = decos.add(tr.doc, [decoType(insertion.from, insertion.to, {
              class: 'selected-insertion'
            }, selectedInsertionSpec)]);
          }

          if (deletion) {
            decos = decos.add(tr.doc, [decoType(deletion.from, deletion.to, {
              class: 'selected-deletion'
            }, selectedDeletionSpec)]);
          }

          if (formatChange) {
            decos = decos.add(tr.doc, [decoType(formatChange.from, formatChange.to, {
              class: 'selected-format-change'
            }, selectedChangeFormatSpec)]);
          }
        } else {
          decos = decos.map(tr.mapping, tr.doc);
        }

        return {
          decos
        };
      }

    },
    props: {
      decorations(state) {
        const {
          decos
        } = this.getState(state);
        return decos;
      },

      handleDOMEvents: {
        focus: (view, _event) => {
          view.dispatch(deactivateAllSelectedChanges(view.state.tr));
        }
      }
    }
  });
});

const commentPlugin = new prosemirrorState.PluginKey('commentPlugin');

const getComment = state => {
  const commentMark = state.schema.marks.comment;
  const commentOnSelection = waxProsemirrorUtilities.DocumentHelpers.findFragmentedMark(state, commentMark); // Don't allow Active comment if selection is not collapsed

  if (state.selection.from !== state.selection.to && commentOnSelection && commentOnSelection.attrs.conversation.length) {
    return;
  }

  if (commentOnSelection) {
    const commentNodes = waxProsemirrorUtilities.DocumentHelpers.findChildrenByMark(state.doc, commentMark, true);
    const allCommentsWithSameId = [];
    commentNodes.map(node => {
      node.node.marks.filter(mark => {
        if (mark.type.name === 'comment' && commentOnSelection.attrs.id === mark.attrs.id) {
          allCommentsWithSameId.push(node);
        }
      });
    });

    if (allCommentsWithSameId.length > 1) {
      const minPos = lodash.minBy(allCommentsWithSameId, 'pos');
      const maxPos = lodash.maxBy(allCommentsWithSameId, 'pos');
      return {
        from: minPos.pos,
        to: maxPos.pos + lodash.last(allCommentsWithSameId).node.nodeSize,
        attrs: commentOnSelection.attrs,
        contained: commentOnSelection.contained
      };
    }
  }

  return commentOnSelection;
};

var CommentPlugin = (props => {
  return new prosemirrorState.Plugin({
    key: commentPlugin,
    state: {
      init: (_, state) => {
        return {
          comment: getComment(state)
        };
      },

      apply(tr, prev, _, newState) {
        const comment = getComment(newState);
        let createDecoration;

        if (comment) {
          createDecoration = prosemirrorView.DecorationSet.create(newState.doc, [prosemirrorView.Decoration.inline(comment.from, comment.to, {
            class: 'active-comment'
          })]);
        }

        return {
          comment,
          createDecoration
        };
      }

    },
    props: {
      decorations: state => {
        const commentPluginState = state && commentPlugin.getState(state);
        return commentPluginState.createDecoration;
      },
      setCommentActive: state => {}
    }
  });
});

const WaxSelectionPlugin = new prosemirrorState.Plugin({
  state: {
    init(config, instance) {
      return {
        deco: prosemirrorView.DecorationSet.empty
      };
    },

    apply(transaction, state, prevEditorState, editorState) {
      const sel = transaction.curSelection; // TODO fix the selection when a note is present.

      let flag = false;
      const difference = sel.$to.pos - sel.$from.pos;
      editorState.doc.nodesBetween(sel.$from.pos, sel.$to.pos, (node, from) => {
        if (node.type.name === 'footnote') flag = true;
      });

      if (sel && !flag) {
        const decos = [prosemirrorView.Decoration.inline(sel.$from.pos, sel.$to.pos, {
          class: 'wax-selection-marker'
        })];
        const deco = prosemirrorView.DecorationSet.create(editorState.doc, decos);
        return {
          deco
        };
      }

      return state;
    }

  },
  props: {
    decorations(state) {
      if (state && this.getState(state)) {
        return this.getState(state).deco;
      }

      return null;
    }

  }
});

const highlightPlugin = (nodeTypes = ['code_block']) => {
  return new prosemirrorState.Plugin({
    state: {
      init(_, instance) {
        const content = prosemirrorHighlightjs.getHighlightDecorations(instance.doc, hljs, nodeTypes, () => undefined);
        return prosemirrorView.DecorationSet.create(instance.doc, content);
      },

      apply(tr, set, state) {
        if (!tr.docChanged) {
          return set.map(tr.mapping, tr.doc);
        }

        const {
          selection: {
            $from,
            $to
          },
          doc
        } = state;
        let codeBlock = false;
        doc.nodesBetween($from.pos, $to.pos, (node, from) => {
          if (node.type.name === 'code_block') {
            codeBlock = true;
          }
        });

        if (codeBlock) {
          const content = prosemirrorHighlightjs.getHighlightDecorations(tr.doc, hljs, nodeTypes, () => undefined);
          return prosemirrorView.DecorationSet.create(tr.doc, content);
        }

        return set.map(tr.mapping, tr.doc);
      }

    },
    props: {
      decorations(state) {
        return this.getState(state);
      }

    }
  });
};

exports.CommentPlugin = CommentPlugin;
exports.TrackChangePlugin = TrackChangePlugin;
exports.WaxSelectionPlugin = WaxSelectionPlugin;
exports.highlightPlugin = highlightPlugin;
//# sourceMappingURL=index.js.map
