/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import styled from 'styled-components';
import { TextSelection, NodeSelection } from 'prosemirror-state';
import { WaxContext } from 'wax-prosemirror-core';
import { DocumentHelpers } from 'wax-prosemirror-utilities';
import { Fragment } from 'prosemirror-model';
import { v4 as uuidv4 } from 'uuid';
import { Icon } from 'wax-prosemirror-components';
import EditorComponent from './EditorComponent';
import SwitchComponent from './SwitchComponent';
import FeedbackComponent from './FeedbackComponent';
import helpers from '../helpers/helpers';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const InfoRow = styled.div`
  color: black;
  display: flex;
  flex-direction: row;
  padding: 10px 0px 4px 0px;
`;

const QuestionNunber = styled.span`
  &:before {
    content: 'Answer ' counter(question-item-multiple);
    counter-increment: question-item-multiple;
  }
`;

const QuestionControlsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const QuestionWrapper = styled.div`
  border: 1px solid #a5a1a2;
  border-radius: 4px;
  color: black;
  display: flex;
  flex: 2 1 auto;
  flex-direction: column;
  padding: 10px;
`;

const IconsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  button {
    border: none;
    box-shadow: none;
  }

  span {
    cursor: pointer;
  }
`;

const QuestionData = styled.div`
  align-items: normal;
  display: flex;
  flex-direction: row;
`;

const ActionButton = styled.button`
  background: transparent;
  cursor: pointer;
  margin-top: 16px;
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

  const customProps = main.props.customValues;

  const isEditable = main.props.editable(editable => {
    return editable;
  });

  const removeOption = () => {
    const answersCount = findAnswerCount();
    if (answersCount.count >= 1) {
      main.state.doc.nodesBetween(getPos(), getPos() + 1, (sinlgeNode, pos) => {
        if (sinlgeNode.attrs.id === node.attrs.id) {
          main.dispatch(
            main.state.tr.deleteRange(getPos(), getPos() + sinlgeNode.nodeSize),
          );
        }
      });
    } else {
      main.dispatch(
        main.state.tr.setSelection(
          NodeSelection.create(main.state.doc, answersCount.parentPosition),
        ),
      );
      main.dispatch(main.state.tr.deleteSelection());
    }
  };

  const addOption = nodeId => {
    const newAnswerId = uuidv4();
    main.state.doc.descendants((editorNode, index) => {
      if (editorNode.type.name === 'multiple_choice') {
        if (editorNode.attrs.id === nodeId) {
          main.dispatch(
            main.state.tr.setSelection(
              new TextSelection(
                main.state.tr.doc.resolve(editorNode.nodeSize + index),
              ),
            ),
          );

          const answerOption = main.state.config.schema.nodes.multiple_choice.create(
            { id: newAnswerId },
            Fragment.empty,
          );
          main.dispatch(main.state.tr.replaceSelectionWith(answerOption));
          // create Empty Paragraph
          setTimeout(() => {
            helpers.createEmptyParagraph(context, newAnswerId);
          }, 120);
        }
      }
    });
  };

  const findAnswerCount = () => {
    main.dispatch(
      main.state.tr.setSelection(
        NodeSelection.create(main.state.doc, getPos()),
      ),
    );
    const parentContainer = DocumentHelpers.findParentOfType(
      main.state,
      main.state.config.schema.nodes.multiple_choice_container,
    );

    let parentPosition = 0;

    main.state.doc.descendants((parentNode, parentPos) => {
      if (
        parentNode.type.name === 'multiple_choice_container' &&
        parentNode.attrs.id === parentContainer.attrs.id
      ) {
        parentPosition = parentPos;
      }
    });

    let count = -1;
    parentContainer.descendants((element, position) => {
      if (element.type.name === 'multiple_choice') {
        count += 1;
      }
    });

    return { count, parentPosition, parentContainer };
  };

  const readOnly = !isEditable;

  return (
    <Wrapper>
      <QuestionControlsWrapper>
        <InfoRow>
          <QuestionNunber />
          <SwitchComponent getPos={getPos} node={node} />
        </InfoRow>
        <QuestionWrapper>
          <QuestionData>
            <EditorComponent getPos={getPos} node={node} view={view} />
          </QuestionData>
          {!(readOnly && customProps && !customProps.showFeedBack) && (
            <FeedbackComponent
              getPos={getPos}
              node={node}
              readOnly={readOnly}
              view={view}
            />
          )}
        </QuestionWrapper>
      </QuestionControlsWrapper>
      <IconsWrapper>
        {!readOnly && (
          <ActionButton onClick={() => addOption(node.attrs.id)} type="button">
            <StyledIconAction name="plusSquare" />
          </ActionButton>
        )}
        {!readOnly && (
          <ActionButton onClick={removeOption} type="button">
            <StyledIconAction name="deleteOutlined" />
          </ActionButton>
        )}
      </IconsWrapper>
    </Wrapper>
  );
};
