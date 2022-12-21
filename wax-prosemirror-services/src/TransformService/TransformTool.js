import React from 'react';
import { isEmpty } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { DocumentHelpers, Tools } from 'wax-prosemirror-core';
import TransformCaseComponent from './components/TransformCaseComponent';

const upperLowerCase = (state, dispatch, casing) => {
  // grab the current transaction and selection
  let { tr } = state;
  const { selection } = tr;
  const marksAdd = [];

  state.doc.nodesBetween(selection.from, selection.to, (node, position) => {
    if (node.marks.length > 0) {
      node.marks.forEach(item => {
        marksAdd.push({
          name: item.type.name,
          type: item.type,
          pos: DocumentHelpers.findMark(state, item.type, true),
          attrs: item.attrs,
        });
      });
    }

    // we only processing text, must be a selection
    if (!node.isTextblock || selection.from === selection.to) return;

    // calculate the section to replace
    const startPosition = Math.max(position + 1, selection.from);
    const endPosition = Math.min(position + node.nodeSize, selection.to);

    // grab the content
    const substringFrom = Math.max(0, selection.from - position - 1);
    const substringTo = Math.max(0, selection.to - position - 1);
    const updatedText = node.textBetween(substringFrom, substringTo);
    // set the casing
    const textNode =
      casing === 'upperCase'
        ? state.schema.text(updatedText.toUpperCase())
        : state.schema.text(updatedText.toLocaleLowerCase());

    // replace
    tr = tr.replaceWith(startPosition, endPosition, textNode);
  });

  marksAdd.forEach(item => {
    item.pos.forEach(markPos => {
      tr.addMark(markPos.from, markPos.to, item.type.create(item.attrs));
    });
  });

  dispatch(tr.scrollIntoView());
};

class TransformTool extends Tools {
  title = 'Transform';
  icon = 'transformCase';
  name = 'TransformTool';

  select = (state, activeViewId, activeView) => {
    return !activeView.state.selection.empty;
  };

  get run() {
    return (state, dispatch, textCase) => {
      const {
        selection: { $from, $to },
      } = state;

      const { tr } = state;
      const { selection } = state.tr;
      const marksAdd = [];

      switch (textCase) {
        case 'upperCase':
          upperLowerCase(state, dispatch, 'upperCase');
          break;
        case 'lowerCase':
          upperLowerCase(state, dispatch, 'lowerCase');
          break;
        case 'sentenceCase': {
          state.doc.nodesBetween($from.pos, $to.pos, (node, position) => {
            if (node.marks.length > 0) {
              node.marks.forEach(item => {
                marksAdd.push({
                  name: item.type.name,
                  type: item.type,
                  pos: DocumentHelpers.findMark(state, item.type, true),
                  attrs: item.attrs,
                });
              });
            }

            if (node.type.name !== 'code_block') {
              if (!node.isTextblock || $from.pos === $to.pos) return;
              const startPosition = Math.max(position + 1, $from.pos);
              const endPosition = Math.min(
                position + node.nodeSize,
                selection.to,
              );
              const substringFrom = Math.max(0, $from.pos - position - 1);
              const substringTo = Math.max(0, selection.to - position - 1);

              const updatedText = node.textBetween(substringFrom, substringTo);

              if (updatedText.length > 0) {
                const rg = /(^\w{1}|\.\s*\w{1})/gi;

                const textNode = state.schema.text(
                  updatedText.replace(rg, toReplace => {
                    return toReplace.toUpperCase();
                  }),
                );
                tr.replaceWith(startPosition, endPosition, textNode);
              }
            }
          });

          marksAdd.forEach(item => {
            item.pos.forEach(markPos => {
              tr.addMark(
                markPos.from,
                markPos.to,
                item.type.create(item.attrs),
              );
            });
          });
          dispatch(tr);
          break;
        }
        // case 'titleCase':
        //   state.doc.nodesBetween($from.pos, $to.pos, (node, position) => {
        //     if (node.marks.length > 0) {
        //       node.marks.forEach(item => {
        //         marksAdd.push({
        //           name: item.type.name,
        //           type: item.type,
        //           pos: DocumentHelpers.findMark(state, item.type, true),
        //           attrs: item.attrs,
        //         });
        //       });
        //     }

        //     if (node.type.name !== 'code_block') {
        //       if (!node.isTextblock || $from.pos === $to.pos) return;
        //       const startPosition = Math.max(position + 1, $from.pos);
        //       const endPosition = Math.min(
        //         position + node.nodeSize,
        //         selection.to,
        //       );
        //       const substringFrom = Math.max(0, $from.pos - position - 1);
        //       const substringTo = Math.max(0, selection.to - position - 1);

        //       const updatedText = node.textBetween(substringFrom, substringTo);

        //       if (updatedText.length > 0) {
        //         const textNode = state.schema.text(updatedText.toTitleCase());
        //         tr.replaceWith(startPosition, endPosition, textNode);
        //       }
        //     }
        //   });

        //   marksAdd.forEach(item => {
        //     if (item.name !== 'transform') {
        //       item.pos.forEach(markPos => {
        //         tr.addMark(
        //           markPos.from,
        //           markPos.to,
        //           item.type.create(item.attrs),
        //         );
        //       });
        //     }
        //   });

        //   dispatch(tr);

        //   break;
        default:
          break;
      }
    };
  }

  renderTool(view) {
    if (isEmpty(view)) return null;

    return this.isDisplayed() ? (
      <TransformCaseComponent item={this.toJSON()} key={uuidv4()} view={view} />
    ) : null;
  }
}

export default TransformTool;
