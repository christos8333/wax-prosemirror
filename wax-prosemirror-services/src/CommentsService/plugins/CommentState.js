/* eslint-disable no-restricted-syntax */
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
    // Keep a backup of last known good positions for each comment
    this.lastKnownPositions = new Map();
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
    // Clean up backup position data
    this.lastKnownPositions.delete(id);
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

  // Store backup positions for failed decorations
  storeBackupPosition(id, from, to) {
    this.lastKnownPositions.set(id, { from, to, timestamp: Date.now() });
  }

  // Try multiple fallback strategies to recreate a decoration
  tryRecreateDecoration(annotation, mappedDecos, state) {
    if (!this.options.map.has(annotation.id)) {
      return null;
    }

    // Check if this comment is managed by Yjs
    const ystate = ySyncPluginKey.getState(state);

    if (ystate?.binding) {
      const existingComment = this.options.commentsDataMap.get(annotation.id);

      if (!existingComment) {
        console.log(
          `[CommentPlugin] Comment ${annotation.id} is managed by Yjs, skipping recreation`,
        );
        return null;
      }
    }

    const strategies = [
      // Strategy 1: Try mappedDecos fallback
      () => {
        const fallback = mappedDecos.find(
          undefined,
          undefined,
          spec => spec.id === annotation.id,
        )[0];

        if (fallback && fallback.from < fallback.to) {
          console.log(
            `[CommentPlugin] Using mappedDecos fallback for ${annotation.id}`,
          );
          return {
            from: fallback.from,
            to: fallback.to,
            attrs: fallback.type.attrs,
            spec: fallback.spec,
          };
        }
        return null;
      },

      // Strategy 2: Use stored pmFrom/pmTo from annotation data
      () => {
        const { pmFrom, pmTo } = annotation.data || {};
        if (
          pmFrom != null &&
          pmTo != null &&
          pmFrom < pmTo &&
          pmTo <= state.doc.content.size
        ) {
          console.log(
            `[CommentPlugin] Using stored pmFrom/pmTo for ${annotation.id}`,
          );
          return {
            from: pmFrom,
            to: pmTo,
          };
        }
        return null;
      },

      // Strategy 3: Use last known good positions
      () => {
        const backup = this.lastKnownPositions.get(annotation.id);
        if (
          backup &&
          backup.from < backup.to &&
          backup.to <= state.doc.content.size
        ) {
          console.log(
            `[CommentPlugin] Using backup positions for ${annotation.id}`,
          );
          return {
            from: backup.from,
            to: backup.to,
          };
        }
        return null;
      },

      // Strategy 4: Try to find the comment content in the document
      () => {
        if (annotation.data?.originalText) {
          const docText = state.doc.textContent;
          const index = docText.indexOf(annotation.data.originalText);
          if (index !== -1) {
            const from = index;
            const to = index + annotation.data.originalText.length;
            console.log(
              `[CommentPlugin] Found comment by text search for ${annotation.id}`,
            );
            return { from, to };
          }
        }
        return null;
      },
    ];

    // Try each strategy in order
    for (const strategy of strategies) {
      try {
        const result = strategy();
        if (result) {
          return result;
        }
      } catch (error) {
        console.warn(
          `[CommentPlugin] Fallback strategy failed for ${annotation.id}:`,
          error,
        );
      }
    }

    return null;
  }

  createDecorations(state, mappedDecos = DecorationSet.empty, skip = true) {
    const decorations = [];
    const ystate = ySyncPluginKey.getState(state);
    const failedDecorations = [];

    if (ystate?.binding) {
      const { doc, type, binding } = ystate;

      this.allCommentsList().forEach(annotation => {
        if (ystate?.binding) {
          const existingComment = this.options.commentsDataMap.get(
            annotation.id,
          );

          if (!existingComment) {
            console.log(
              `[CommentPlugin] Comment ${annotation.id} is managed by Yjs, skipping recreation`,
            );
            return;
          }
        }

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
            `[CommentPlugin] Invalid Yjs pos for ${annotation.id}, trying fallback strategies`,
          );

          // Try multiple fallback strategies
          const fallbackResult = this.tryRecreateDecoration(
            annotation,
            mappedDecos,
            state,
          );

          if (fallbackResult) {
            from = fallbackResult.from;
            to = fallbackResult.to;

            // Store as backup for future use
            this.storeBackupPosition(annotation.id, from, to);

            const decoration = Decoration.inline(
              from,
              to,
              fallbackResult.attrs || {
                class: 'comment',
                'data-id': annotation.id,
              },
              fallbackResult.spec || {
                id: annotation.id,
                data: annotation,
                inclusiveEnd: true,
              },
            );
            decorations.push(decoration);

            // Update the annotation with recovered positions
            annotation.data.pmFrom = from;
            annotation.data.pmTo = to;
          } else {
            console.warn(
              `[CommentPlugin] All fallback strategies failed for ${annotation.id}`,
            );
            failedDecorations.push(annotation.id);
          }
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

        // Store backup positions and update pmFrom/pmTo
        this.storeBackupPosition(annotation.id, from, to);
        annotation.data.pmFrom = from;
        annotation.data.pmTo = to;
      });
    } else {
      // Fallback mode — use pmFrom / pmTo stored in comment data
      this.allCommentsList().forEach(annotation => {
        const { pmFrom, pmTo } = annotation.data;

        if (
          pmFrom != null &&
          pmTo != null &&
          pmFrom < pmTo &&
          pmTo <= state.doc.content.size
        ) {
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
          this.storeBackupPosition(annotation.id, pmFrom, pmTo);
        } else {
          console.warn(
            `[CommentPlugin] Skipping fallback decoration for id ${annotation.id}: invalid pmFrom/pmTo`,
            {
              pmFrom,
              pmTo,
              annotation,
            },
          );
          failedDecorations.push(annotation.id);
        }
      });
    }

    this.decorations = DecorationSet.create(state.doc, decorations);

    // Notify about failed decorations if needed
    if (failedDecorations.length > 0) {
      console.warn(
        `[CommentPlugin] Failed to recreate ${failedDecorations.length} decorations:`,
        failedDecorations,
      );

      // Optional: trigger a callback to handle failed decorations
      if (this.options.onDecorationsFailed) {
        this.options.onDecorationsFailed(failedDecorations);
      }
    }
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

        // Store the absolute positions for reference and backup
        annotation.data.pmFrom = deco.from;
        annotation.data.pmTo = deco.to;
        this.storeBackupPosition(id, deco.from, deco.to);

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
        const skip = false;
        this.addComment(action, ystate);
        this.createDecorations(state, mappedDecos, skip);
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
        this.decorations = DecorationSet.empty;
        this.createDecorations(state, mappedDecos);
      }, CommentDecorationPluginKey);

      return this;
    }

    if (ystate?.binding && ystate?.binding.mapping) {
      this.options.map.doc.transact(() => {
        this.updateCommentPositions(ystate);
        this.createDecorations(state, mappedDecos);
      }, CommentDecorationPluginKey);
    }

    // Use mapped decorations for normal typing operations
    this.decorations = mappedDecos;

    // Only recreate decorations if we're not in Yjs mode or if decorations are missing
    if (!ystate?.binding) {
      this.options.map.forEach((annotation, _) => {
        if ('from' in annotation && 'to' in annotation) {
          const newFrom = transaction.mapping.map(annotation.from);
          const newTo = transaction.mapping.map(annotation.to);
          annotation.from = newFrom;
          annotation.to = newTo;
          // Update backup positions
          this.storeBackupPosition(annotation.id, newFrom, newTo);
        }
      });
      this.createDecorations(state);
      return this;
    }

    return this;
  }
}
