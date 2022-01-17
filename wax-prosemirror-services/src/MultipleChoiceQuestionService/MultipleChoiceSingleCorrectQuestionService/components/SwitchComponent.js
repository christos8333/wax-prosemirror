/* eslint-disable react/prop-types */

import React, { useState, useContext, useEffect } from 'react';
import { WaxContext } from 'wax-prosemirror-core';
import { DocumentHelpers } from 'wax-prosemirror-utilities';
import { NodeSelection } from 'prosemirror-state';
import styled from 'styled-components';
import Switch from '../../components/Switch';

const StyledSwitch = styled(Switch)`
  display: flex;
  margin-left: auto;

  .ant-switch-checked {
    background-color: green;
  }
`;

const CustomSwitch = ({ node, getPos }) => {
  const context = useContext(WaxContext);
  const [checked, setChecked] = useState(false);
  const {
    view: { main },
  } = context;

  useEffect(() => {
    const allNodes = getNodes(main);
    allNodes.forEach(singNode => {
      if (singNode.node.attrs.id === node.attrs.id) {
        setChecked(singNode.node.attrs.correct);
      }
    });
  }, [getNodes(main)]);

  const handleChange = () => {
    setChecked(!checked);
    main.dispatch(
      main.state.tr.setSelection(
        NodeSelection.create(main.state.doc, getPos()),
      ),
    );
    const parentContainer = DocumentHelpers.findParentOfType(
      main.state,
      main.state.config.schema.nodes.multiple_choice_single_correct_container,
    );
    let parentPosition = 0;

    main.state.doc.descendants((parentNode, parentPos) => {
      if (
        parentNode.type.name === 'multiple_choice_single_correct_container' &&
        parentNode.attrs.id === parentContainer.attrs.id
      ) {
        parentPosition = parentPos;
      }
    });

    const { tr } = main.state;

    parentContainer.descendants((element, position) => {
      if (
        element.type.name === 'multiple_choice_single_correct' &&
        element.attrs.id === node.attrs.id
      ) {
        tr.setNodeMarkup(getPos(), undefined, {
          ...element.attrs,
          correct: !checked,
        });
      } else if (
        element.type.name === 'multiple_choice_single_correct' &&
        element.attrs.correct
      ) {
        tr.setNodeMarkup(parentPosition + position + 1, undefined, {
          ...element.attrs,
          correct: false,
        });
      }
    });

    main.dispatch(tr);
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
