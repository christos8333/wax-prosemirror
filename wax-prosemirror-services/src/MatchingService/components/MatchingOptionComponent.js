/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TextSelection } from 'prosemirror-state';
import { Fragment } from 'prosemirror-model';
import styled from 'styled-components';
import { Icon } from 'wax-prosemirror-components';
import { WaxContext } from 'wax-prosemirror-core';
import EditorComponent from './EditorComponent';

const ActionButton = styled.button`
  height: 24px;
  border: none;
  background: transparent;
  cursor: pointer;
  padding-left: 0;
`;

const StyledIconAction = styled(Icon)`
  height: 24px;
  width: 24px;
`;

export default ({ node, view, getPos }) => {
  const context = useContext(WaxContext);
  const {
    pmViews: { main },
  } = context;

  const isEditable = main.props.editable(editable => {
    return editable;
  });

  const readOnly = !isEditable;

  const addAnswer = () => {
    console.log(node);
    const nodeId = node.attrs.id;
    const newAnswerId = uuidv4();
    main.state.doc.descendants((editorNode, index) => {
      if (editorNode.type.name === 'matching_option') {
        if (editorNode.attrs.id === nodeId) {
          main.dispatch(
            main.state.tr.setSelection(
              new TextSelection(
                main.state.tr.doc.resolve(editorNode.nodeSize + index),
              ),
            ),
          );

          const newOption = main.state.config.schema.nodes.matching_option.create(
            { id: newAnswerId },
            Fragment.empty,
          );
          main.dispatch(main.state.tr.replaceSelectionWith(newOption));
        }
      }
    });
  };

  return (
    <>
      {!readOnly && (
        <ActionButton onClick={addAnswer} type="button">
          <StyledIconAction name="plusSquare" />
        </ActionButton>
      )}
      <EditorComponent getPos={getPos} node={node} view={view} />
    </>
  );
};
