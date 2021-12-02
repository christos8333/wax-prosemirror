/* eslint-disable react/prop-types */

import React, { useState, useContext, useEffect } from 'react';
import { WaxContext } from 'wax-prosemirror-core';
import { DocumentHelpers } from 'wax-prosemirror-utilities';
import styled from 'styled-components';
import Switch from '../../components/Switch';

const StyledSwitch = styled(Switch)`
  display: flex;
  margin-left: auto;

  span:nth-child(1) {
    // bottom: 36px;
    // display: flex;
    // left: 4px;
    // position: relative;
    // width: 0px;
  }

  .ant-switch-checked {
    background-color: green;
  }
`;

const CustomSwitch = ({ node, getPos }) => {
  const context = useContext(WaxContext);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const allNodes = getNodes(context.view.main);
    allNodes.forEach(singNode => {
      if (singNode.node.attrs.id === node.attrs.id) {
        setChecked(singNode.node.attrs.correct);
      }
    });
  }, [getNodes(context.view.main)]);

  const handleChange = () => {
    setChecked(!checked);

    context.view.main.state.doc.descendants((editorNode, pos) => {
      if (editorNode.type.name === 'multiple_choice_single_correct_container') {
        console.log(editorNode, pos);
        editorNode.content.content.forEach(element => {
          if (element.attrs.id === node.attrs.id) {
            context.view.main.dispatch(
              context.view.main.state.tr.setNodeMarkup(getPos(), undefined, {
                ...element.attrs,
                correct: !checked,
              }),
            );
          } else if (element.attrs.correct) {
            console.log(element);
            context.view.main.dispatch(
              context.view.main.state.tr.setNodeMarkup(
                getPos() + 4,
                undefined,
                {
                  ...element.attrs,
                  correct: false,
                },
              ),
            );
          }
        });
      }
    });
  };

  return (
    <StyledSwitch
      checked={checked}
      checkedChildren="YES"
      label="Correct?"
      labelPosition="left"
      onChange={handleChange}
      unCheckedChildren="NO"
    />
  );
};

const getNodes = view => {
  const allNodes = DocumentHelpers.findBlockNodes(view.state.doc);
  const multipleChoiceNodes = [];
  allNodes.forEach(node => {
    if (node.node.type.name === 'multiple_choice_single_correct') {
      multipleChoiceNodes.push(node);
    }
  });
  return multipleChoiceNodes;
};

export default CustomSwitch;
