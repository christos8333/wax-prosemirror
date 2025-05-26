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

        if (from == null || to == null || from >= to) {
          console.warn(
            `[CommentPlugin] Skipping decoration for id ${annotation.id}: invalid Yjs positions`,
            {
              from,
              to,
              annotation,
            },
          );
          return; // Skip invalid range
        }

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

        // Update pmFrom / pmTo for fallback in non-Yjs mode
        annotation.data.pmFrom = from;
        annotation.data.pmTo = to;
      });
    } else {
      // Fallback mode — use pmFrom / pmTo stored in comment data
      this.allCommentsList().forEach(annotation => {
        const { pmFrom, pmTo } = annotation.data;
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
        } else {
          console.warn(
            `[CommentPlugin] Skipping fallback decoration for id ${annotation.id}: invalid pmFrom/pmTo`,
            {
              pmFrom,
              pmTo,
              annotation,
            },
          );
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

  apply(transaction, state) {
    const action = transaction.getMeta(CommentDecorationPluginKey);
    const ystate = ySyncPluginKey.getState(state);

    const mappedDecos = this.decorations.map(
      transaction.mapping,
      transaction.doc,
    );

    if (action?.type) {
      if (action.type === 'addComment') {
        this.addComment(action, ystate);
        this.createDecorations(state, mappedDecos);
      }

      if (action.type === 'updateComment') {
        this.updateComment(action, ystate);
      }

      if (action.type === 'deleteComment') {
        this.deleteComment(action.id);
        this.createDecorations(state, mappedDecos);
      }

      if (action.type === 'createDecorations') {
        this.createDecorations(state, mappedDecos);
      }

      return this;
    }

    if (ystate?.isChangeOrigin) {
      this.options.map.doc.transact(() => {
        this.createDecorations(state, mappedDecos);
      }, CommentDecorationPluginKey);

      return this;
    }

    if (ystate?.binding && ystate?.binding.mapping) {
      this.options.map.doc.transact(() => {
        this.updateCommentPositions(ystate);
      }, CommentDecorationPluginKey);
    }

    this.decorations = mappedDecos;

    if (!ystate?.binding) {
      this.options.map.forEach((annotation, _) => {
        if ('from' in annotation && 'to' in annotation) {
          annotation.from = transaction.mapping.map(annotation.from);
          annotation.to = transaction.mapping.map(annotation.to);
        }
      });
      this.createDecorations(state);
      return this;
    }

    return this;
  }
}
