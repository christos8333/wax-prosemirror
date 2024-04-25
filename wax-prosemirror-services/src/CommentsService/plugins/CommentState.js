/* eslint-disable no-param-reassign */
import { v4 as uuidv4 } from 'uuid';
import { Decoration, DecorationSet } from 'prosemirror-view';
import {
  ySyncPluginKey,
  relativePositionToAbsolutePosition,
  absolutePositionToRelativePosition,
} from 'y-prosemirror';
import CommentDecoration from './CommentDecoration';
import { CommentDecorationPluginKey } from './CommentDecorationPlugin';

const randomId = () => {
  return uuidv4();
};

export default class CommentState {
  constructor(options) {
    this.decorations = DecorationSet.empty;
    this.options = options;
  }

  addComment(action, ystate) {
    const { map, commentsDataMap } = this.options;
    const { from, to, data } = action;
    const id = randomId();
    map.set(id, { id, from, to, data });
    if (ystate?.binding && ystate?.binding.mapping)
      commentsDataMap.set(id, { id, from, to, data });
  }

  updateComment(action, ystate) {
    const { map, commentsDataMap } = this.options;
    const annotationToUpdate = map.get(action.id);
    if (annotationToUpdate) {
      if (ystate?.binding && ystate?.binding.mapping) {
        commentsDataMap.set(action.id, {
          ...annotationToUpdate,
          data: action.data,
        });
      }
    } else {
      map.set(action.id, {
        ...annotationToUpdate,
        data: action.data,
      });
    }
  }

  deleteComment(id, ystate) {
    const { map, commentsDataMap } = this.options;
    map.delete(id);
    if (ystate?.binding && ystate?.binding.mapping) commentsDataMap.delete(id);
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
        annotation.data.yjsFrom = absolutePositionToRelativePosition(
          annotation.data.pmFrom,
          type,
          binding.mapping,
        );

        annotation.data.yjsTo = absolutePositionToRelativePosition(
          annotation.data.pmTo,
          type,
          binding.mapping,
        );

        const from = relativePositionToAbsolutePosition(
          doc,
          type,
          annotation.data.yjsFrom,
          binding.mapping,
        );
        const to = relativePositionToAbsolutePosition(
          doc,
          type,
          annotation.data.yjsTo,
          binding.mapping,
        );

        if (!from || !to) {
          return;
        }

        decorations.push(
          Decoration.inline(
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
          ),
        );
      });
    } else {
      this.allCommentsList().forEach(annotation => {
        const {
          data: { pmFrom, pmTo },
        } = annotation;

        decorations.push(
          Decoration.inline(
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
          ),
        );
      });
    }

    this.decorations = DecorationSet.create(state.doc, decorations);
  }

  updateCommentPostions(ystate) {
    this.options.map.doc.transact(() => {
      this.decorations.find().forEach(deco => {
        const { id } = deco.spec;
        const newFrom = absolutePositionToRelativePosition(
          deco.from,
          ystate.type,
          ystate.binding.mapping,
        );
        const newTo = absolutePositionToRelativePosition(
          deco.to,
          ystate.type,
          ystate.binding.mapping,
        );

        const annotation = this.options.map.get(id);

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

        this.options.map.set(id, annotation);
      });
    }, CommentDecorationPluginKey);
  }

  apply(transaction, state) {
    const { map } = this.options;
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

    this.decorations = this.decorations.map(
      transaction.mapping,
      transaction.doc,
    );

    if (ystate?.isChangeOrigin) {
      this.updateCommentPostions(ystate);
      this.createDecorations(state);

      return this;
    }

    map.forEach((annotation, _) => {
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
