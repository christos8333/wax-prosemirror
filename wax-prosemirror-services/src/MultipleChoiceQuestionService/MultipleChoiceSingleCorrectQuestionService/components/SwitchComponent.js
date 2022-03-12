/* eslint-disable react/prop-types */

import React, { useState, useContext, useEffect } from 'react';
import { WaxContext } from 'wax-prosemirror-core';
import { DocumentHelpers } from 'wax-prosemirror-utilities';
import { NodeSelection } from 'prosemirror-state';
import YesNoSwitch from '../../components/YesNoSwitch';

const CustomSwitch = ({ node, getPos }) => {
  const context = useContext(WaxContext);
  const [checked, setChecked] = useState(false);
  const [checkedAnswerMode, setCheckedAnswerMode] = useState(false);
  const {
    pmViews: { main },
  } = context;

  const isEditable = main.props.editable(editable => {
    return editable;
  });

  const customProps = main.props.customValues;

  useEffect(() => {
    const allNodes = getNodes(main);
    allNodes.forEach(singNode => {
      if (singNode.node.attrs.id === node.attrs.id) {
        setChecked(singNode.node.attrs.correct);
        setCheckedAnswerMode(singNode.node.attrs.answer);
      }
    });
  }, [getNodes(main)]);

  const handleChange = () => {
    setChecked(!checked);
    setCheckedAnswerMode(!checkedAnswerMode);

    const key = isEditable ? 'correct' : 'answer';
    const value = isEditable ? !checked : !checkedAnswerMode;

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
          [key]: value,
        });
      } else if (
        element.type.name === 'multiple_choice_single_correct' &&
        element.attrs.correct
      ) {
        tr.setNodeMarkup(parentPosition + position + 1, undefined, {
          ...element.attrs,
          [key]: false,
        });
      }
    });

    main.dispatch(tr);
  };

  return (
    <YesNoSwitch
      checked={checked}
      checkedAnswerMode={checkedAnswerMode}
      customProps={customProps}
      handleChange={handleChange}
      isEditable={isEditable}
      node={node}
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
