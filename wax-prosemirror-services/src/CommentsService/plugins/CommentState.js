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

  createDecorations(state) {
    const decorations = [];
    const ystate = ySyncPluginKey.getState(state);

    if (ystate?.binding) {
      const { doc, type, binding } = ystate;
      this.allCommentsList().forEach(annotation => {
        // Always use stored absolute positions for Yjs
        const from = annotation.data.pmFrom;
        const to = annotation.data.pmTo;

        if (!from || !to) {
          return;
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
      });
    } else {
      this.allCommentsList().forEach(annotation => {
        const {
          data: { pmFrom, pmTo },
        } = annotation;

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
      });
    }

    this.decorations = DecorationSet.create(state.doc, decorations);
  }

  updateCommentPositions(ystate) {
    this.options.map.doc.transact(() => {
      this.decorations.find().forEach(deco => {
        const { id } = deco.spec;
        const annotation = this.options.map.get(id);
        if (annotation) {
          // Get current absolute positions from decoration
          const currentFrom = deco.from;
          const currentTo = deco.to;

          // Update absolute positions first
          annotation.data.pmFrom = currentFrom;
          annotation.data.pmTo = currentTo;

          // Then convert to relative positions
          annotation.from = absolutePositionToRelativePosition(
            currentFrom,
            ystate.type,
            ystate.binding.mapping,
          );
          annotation.to = absolutePositionToRelativePosition(
            currentTo,
            ystate.type,
            ystate.binding.mapping,
          );

          this.options.map.set(id, annotation);
          if (this.options.commentsDataMap.has(id)) {
            this.options.commentsDataMap.set(id, annotation);
          }
        }
      });
    }, CommentDecorationPluginKey);
  }

  apply(transaction, state) {
    const action = transaction.getMeta(CommentDecorationPluginKey);
    const ystate = ySyncPluginKey.getState(state);

    if (action?.type) {
      if (action.type === 'addComment') this.addComment(action, ystate);
      if (action.type === 'updateComment') this.updateComment(action, ystate);
      if (action.type === 'deleteComment') this.deleteComment(action.id, ystate);
      if (action.type === 'createDecorations') this.createDecorations(state);
      return this;
    }

    // // First map decorations through the transaction
    this.decorations = this.decorations.map(
      transaction.mapping,
      transaction.doc,
    );

    if (ystate?.isChangeOrigin) {
       this.updateCommentPositions(ystate);
      this.createDecorations(state);
      return this;
    }

    if (ystate?.binding && ystate?.binding.mapping && !ystate.isChangeOrigin) {
      // For Yjs changes, update positions and recreate decorations
      this.updateCommentPositions(ystate);
      this.createDecorations(state);
    } else {
      // For non-Yjs changes, update positions directly
      this.options.map.forEach((annotation, _) => {
        if ('from' in annotation && 'to' in annotation) {
          annotation.from = transaction.mapping.map(annotation.from);
          annotation.to = transaction.mapping.map(annotation.to);
          annotation.data.pmFrom = transaction.mapping.map(annotation.data.pmFrom);
          annotation.data.pmTo = transaction.mapping.map(annotation.data.pmTo);
        }
      });
      this.createDecorations(state);
    }

    return this;
  }
}
