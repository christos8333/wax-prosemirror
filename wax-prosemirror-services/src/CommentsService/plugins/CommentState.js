/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import { v4 as uuidv4 } from 'uuid';
import { Decoration, DecorationSet } from 'prosemirror-view';
import {
  ySyncPluginKey,
  relativePositionToAbsolutePosition,
  absolutePositionToRelativePosition,
} from 'y-prosemirror';
import CommentDecoration from './CommentDecoration';
import CommentDecorationPluginKey from './CommentDecorationPluginKey';

const randomId = () => {
  return uuidv4();
};

export default class CommentState {
  constructor(options) {
    this.decorations = DecorationSet.empty;
    this.options = options;
    this.transactYjsPos = false;
  }

  addCommentNonYjs(action) {
    const id = randomId();
    const { map } = this.options;
    const { from, to, data } = action;
    map.set(id, {
      id,
      from,
      to,
      data,
    });
  }

  addComment(action, ystate) {
    // NON YJS ADD
    if (!ystate?.binding && !ystate?.binding.mapping) {
      this.addCommentNonYjs(action);
      return;
    }

    //  YJS ADD COMMENT
    this.transactYjsPos = true;
    const { map, commentsDataMap } = this.options;
    const { from, to, data } = action;
    const id = randomId();
    const relativeFrom = absolutePositionToRelativePosition(
      from,
      ystate.type,
      ystate.binding.mapping,
    );
    const relativeTo = absolutePositionToRelativePosition(
      to,
      ystate.type,
      ystate.binding.mapping,
    );
    map.set(id, {
      id,
      from: relativeFrom,
      to: relativeTo,
      data,
    });
    commentsDataMap.set(id, {
      id,
      from: relativeFrom,
      to: relativeTo,
      data,
    });
  }

  updateComment(action, ystate) {
    const { map, commentsDataMap, onSelectionChange } = this.options;
    const annotationToUpdate = map.get(action.id);
    if (annotationToUpdate) {
      if (ystate?.binding && ystate?.binding.mapping) {
        commentsDataMap.set(action.id, {
          ...annotationToUpdate,
          data: action.data,
        });
      } else {
        map.set(action.id, {
          ...annotationToUpdate,
          data: action.data,
        });
        onSelectionChange(this.allCommentsList());
      }
    }
  }

  deleteComment(id) {
    const { map, commentsDataMap } = this.options;
    if (commentsDataMap.get(id)) commentsDataMap.delete(id);
    map.delete(id);
  }

  commentsAt(position, to) {
    return this.decorations.find(position, to || position).map(decoration => {
      return new CommentDecoration(decoration);
    });
  }

  allCommentsList() {
    const { map } = this.options;
    return Array.from(map, ([key, value]) => {
      return { ...value, id: key };
    }).filter(value => {
      return 'from' in value && 'to' in value;
    });
  }

  allCommentsDataList() {
    const { commentsDataMap } = this.options;
    return Array.from(commentsDataMap, ([key, value]) => {
      return { ...value, id: key };
    }).filter(value => {
      return 'from' in value && 'to' in value;
    });
  }

  setTransactYjsPos(transactYjsPos) {
    this.transactYjsPos = transactYjsPos;
    return this.transactYjsPos;
  }

  getMap() {
    return this.options.map;
  }

  getCommentsDataMap() {
    return this.options.commentsDataMap;
  }

  createDecorations(state, mappedDecos = DecorationSet.empty) {
    const decorations = [];
    const ystate = ySyncPluginKey.getState(state);

    if (ystate?.binding) {
      const { doc, type, binding } = ystate;

      this.allCommentsList().forEach(annotation => {
        // First try Yjs positions
        let from = relativePositionToAbsolutePosition(
          doc,
          type,
          annotation.from,
          binding.mapping,
        );
        let to = relativePositionToAbsolutePosition(
          doc,
          type,
          annotation.to,
          binding.mapping,
        );

        // If Yjs fails, try finding current mapped decoration for that ID
        if (from == null || to == null || from >= to) {
          const fallbackDeco = mappedDecos.find(
            undefined,
            undefined,
            spec => spec.id === annotation.id,
          )[0];
          if (fallbackDeco) {
            from = fallbackDeco.from;
            to = fallbackDeco.to;

            // Update annotation to reflect new positions
            annotation.from = absolutePositionToRelativePosition(
              from,
              type,
              binding.mapping,
            );
            annotation.to = absolutePositionToRelativePosition(
              to,
              type,
              binding.mapping,
            );
            this.options.map.set(annotation.id, annotation);

            // Store the absolute positions for future fallback
            annotation.data.pmFrom = from;
            annotation.data.pmTo = to;
          }
        }

        if (from != null && to != null && from < to) {
          const decoration = Decoration.inline(
            from,
            to,
            {
              class: 'comment',
              'data-id': annotation.id,
            },
            {
              id: annotation.id,
              data: annotation,
              inclusiveEnd: true,
            },
          );
          decorations.push(decoration);
        }
      });
    } else {
      this.allCommentsList().forEach(annotation => {
        const {
          data: { pmFrom, pmTo },
        } = annotation;

        if (pmFrom != null && pmTo != null && pmFrom < pmTo) {
          const decoration = Decoration.inline(
            pmFrom,
            pmTo,
            {
              class: 'comment',
              'data-id': annotation.id,
            },
            {
              id: annotation.id,
              data: annotation,
              inclusiveEnd: true,
            },
          );
          decorations.push(decoration);
        }
      });
    }

    this.decorations = DecorationSet.create(state.doc, decorations);
  }

  updateCommentPositions(ystate) {
    this.decorations.find().forEach(deco => {
      const { id } = deco.spec;
      const annotation = this.options.map.get(id);

      if (annotation) {
        // Convert current decoration positions to relative positions
        annotation.from = absolutePositionToRelativePosition(
          deco.from,
          ystate.type,
          ystate.binding.mapping,
        );
        annotation.to = absolutePositionToRelativePosition(
          deco.to,
          ystate.type,
          ystate.binding.mapping,
        );

        // Store the absolute positions for reference
        annotation.data.pmFrom = deco.from;
        annotation.data.pmTo = deco.to;

        this.options.map.set(id, annotation);
      }
    });
  }

  handleParagraphSplit(state, ystate, transaction) {
    if (!ystate?.binding) return;

    const { doc, type, binding } = ystate;
    const { selection } = state;
    const $pos = selection.$from;

    // Get the current paragraph range
    for (let depth = $pos.depth; depth >= 0; depth--) {
      const node = $pos.node(depth);
      if (node.isBlock) {
        const from = $pos.start(depth);
        const to = $pos.end(depth);

        // Find all comments that overlap with this paragraph
        const affectedComments = this.allCommentsList().filter(annotation => {
          // Convert relative positions to absolute to check overlap
          const absFrom = relativePositionToAbsolutePosition(
            doc,
            type,
            annotation.from,
            binding.mapping,
          );
          const absTo = relativePositionToAbsolutePosition(
            doc,
            type,
            annotation.to,
            binding.mapping,
          );

          return (
            absFrom != null &&
            absTo != null &&
            ((absFrom >= from && absFrom <= to) ||
              (absTo >= from && absTo <= to) ||
              (absFrom <= from && absTo >= to))
          );
        });

        // Update positions for affected comments using transaction mapping
        affectedComments.forEach(annotation => {
          const absFrom = relativePositionToAbsolutePosition(
            doc,
            type,
            annotation.from,
            binding.mapping,
          );
          const absTo = relativePositionToAbsolutePosition(
            doc,
            type,
            annotation.to,
            binding.mapping,
          );

          if (absFrom != null && absTo != null && absFrom < absTo) {
            // Use transaction mapping to get new positions
            const newFrom = transaction.mapping.map(absFrom);
            const newTo = transaction.mapping.map(absTo);

            // Update both relative and absolute positions
            annotation.from = absolutePositionToRelativePosition(
              newFrom,
              type,
              binding.mapping,
            );
            annotation.to = absolutePositionToRelativePosition(
              newTo,
              type,
              binding.mapping,
            );
            annotation.data.pmFrom = newFrom;
            annotation.data.pmTo = newTo;

            this.options.map.set(annotation.id, annotation);
          }
        });

        break;
      }
    }
  }

  apply(transaction, state) {
    const action = transaction.getMeta(CommentDecorationPluginKey);
    const ystate = ySyncPluginKey.getState(state);

    const mappedDecos = this.decorations.map(
      transaction.mapping,
      transaction.doc,
    );

    if (action && action.type) {
      if (action.type === 'addComment') {
        this.addComment(action, ystate);
        this.createDecorations(state, mappedDecos);
      }
      if (action.type === 'updateComment') {
        this.updateComment(action, ystate);
      }
      if (action.type === 'deleteComment') {
        this.deleteComment(action.id, ystate);
        this.createDecorations(state, mappedDecos);
      }
      if (action.type === 'createDecorations') {
        this.createDecorations(state);
      }
      return this;
    }

    if (ystate?.isChangeOrigin) {
      this.options.map.doc.transact(() => {
        this.createDecorations(state, mappedDecos);
      }, CommentDecorationPluginKey);
      return this;
    }

    if (ystate?.binding && ystate?.binding.mapping && !ystate.isChangeOrigin) {
      this.options.map.doc.transact(() => {
        this.updateCommentPositions(ystate);
      }, CommentDecorationPluginKey);
    }

    // Handle paragraph splits
    if (transaction.docChanged && transaction.selection?.$from) {
      const $from = transaction.selection.$from;
      const oldParent = transaction.before.nodeAt($from.before($from.depth));
      const newParent = transaction.doc.nodeAt($from.before($from.depth));

      const paragraphWasSplit =
        oldParent && newParent && oldParent.childCount < newParent.childCount;

      if (paragraphWasSplit && ystate?.binding) {
        // Handle the paragraph split properly
        this.handleParagraphSplit(state, ystate, transaction);
        // Recreate all decorations to ensure consistency
        this.createDecorations(state, mappedDecos);
        return this;
      }
    }

    // Default decoration mapping
    this.decorations = this.decorations.map(
      transaction.mapping,
      transaction.doc,
    );

    return this;
  }
}
