import React from 'react';
import { TransformCaseComponent } from 'wax-prosemirror-components';
import { isEmpty } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { DocumentHelpers } from 'wax-prosemirror-utilities';
// eslint-disable-next-line import/no-named-as-default,import/no-named-as-default-member
import Tools from '../lib/Tools';
// eslint-disable-next-line no-unused-vars
import titleCase from './titleCase';

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
      const selectionTr = state.tr.selection;
      const marksAdd = [
        {
          name: '',
          pos: [],
          attrs: {},
        },
      ];
      let isAddMark = false;

      switch (textCase) {
        case 'upperCase':
          dispatch(
            state.tr.addMark(
              $from.pos,
              $to.pos,
              state.schema.marks.transform.create({
                style: 'text-transform: uppercase',
              }),
            ),
          );
          break;
        case 'lowerCase':
          dispatch(
            state.tr.addMark(
              $from.pos,
              $to.pos,
              state.schema.marks.transform.create({
                style: 'text-transform: lowercase',
              }),
            ),
          );
          break;
        case 'sentenceCase':
          dispatch(
            state.tr.addMark(
              $from.pos,
              $to.pos,
              state.schema.marks.transform.create({
                style: 'text-transform: capitalize',
              }),
            ),
          );
          break;
        case 'titleCase':
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
                selectionTr.to,
              );
              const substringFrom = Math.max(0, $from.pos - position - 1);
              const substringTo = Math.max(0, selectionTr.to - position - 1);

              const updatedText = node.textContent.substring(
                substringFrom,
                substringTo,
              );
              if (updatedText.length > 0) {
                const textNode = state.schema.text(updatedText.toTitleCase());
                tr.replaceWith(startPosition, endPosition, textNode);
              }
            }
            isAddMark = true;
          });

          if (isAddMark) {
            marksAdd.forEach(item => {
              if (item.name !== 'transform') {
                item.pos.forEach(markPos => {
                  tr.addMark(
                    markPos.from,
                    markPos.to,
                    item.type.create(item.attrs),
                  );
                });
              }
            });
          }
          dispatch(tr);

          break;
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
