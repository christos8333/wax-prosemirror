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
      this.allCommentsList().forEach((annotation, id) => {
        const from = relativePositionToAbsolutePosition(
          doc,
          type,
          annotation.from,
          binding.mapping,
        );
        const to = relativePositionToAbsolutePosition(
          doc,
          type,
          annotation.to,
          binding.mapping,
        );

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

  updateCommentPostions(ystate) {
    this.options.map.doc.transact(() => {
      this.decorations.find().forEach(deco => {
        let newFrom = deco.from;
        let newTo = deco.to;
        const { id } = deco.spec;
        // if (this.transactYjsPos) {
        newFrom = absolutePositionToRelativePosition(
          deco.from,
          ystate.type,
          ystate.binding.mapping,
        );
        newTo = absolutePositionToRelativePosition(
          deco.to,
          ystate.type,
          ystate.binding.mapping,
        );
        // }
        const annotation = this.options.map.get(id);

        if (annotation) {
          annotation.from = newFrom;
          annotation.to = newTo;
          annotation.data.pmFrom = relativePositionToAbsolutePosition(
            ystate.doc,
            ystate.type,
            newFrom,
            ystate.binding.mapping,
          );
          annotation.data.pmTo = relativePositionToAbsolutePosition(
            ystate.doc,
            ystate.type,
            newTo,
            ystate.binding.mapping,
          );
        }

        this.options.map.set(id, annotation);
      });
    }, CommentDecorationPluginKey);
  }

  apply(transaction, state) {
    const action = transaction.getMeta(CommentDecorationPluginKey);
    const ystate = ySyncPluginKey.getState(state);
    if (action && action.type) {
      if (action.type === 'addComment') {
        this.addComment(action, ystate);
      }
      if (action.type === 'updateComment') {
        this.updateComment(action, ystate);
      }
      if (action.type === 'deleteComment') {
        this.deleteComment(action.id, ystate);
      }
      if (action.type === 'createDecorations') {
        this.createDecorations(state);
      }
      return this;
    }

    if (ystate?.isChangeOrigin) {
      // this.updateCommentPostions(ystate);
      this.createDecorations(state);

      return this;
    }

    this.decorations = this.decorations.map(
      transaction.mapping,
      transaction.doc,
    );

    this.options.map.forEach((annotation, _) => {
      if ('from' in annotation && 'to' in annotation) {
        annotation.data.pmFrom = transaction.mapping.map(
          annotation.data.pmFrom,
        );
        annotation.data.pmTo = transaction.mapping.map(annotation.data.pmTo);
      }
    });

    if (ystate?.binding && ystate?.binding.mapping) {
      this.updateCommentPostions(ystate);
      this.createDecorations(state);
      return this;
      // eslint-disable-next-line no-else-return
    } else {
      this.options.map.forEach((annotation, _) => {
        if ('from' in annotation && 'to' in annotation) {
          annotation.from = transaction.mapping.map(annotation.from);
          annotation.to = transaction.mapping.map(annotation.to);
        }
      });
      this.createDecorations(state);
      return this;
    }
  }
}
