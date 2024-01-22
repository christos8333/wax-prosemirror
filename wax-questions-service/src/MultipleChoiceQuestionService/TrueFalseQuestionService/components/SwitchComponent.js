import React, { useState, useContext, useEffect } from 'react';
import { WaxContext, DocumentHelpers } from 'wax-prosemirror-core';
import TrueFalseSwitch from './TrueFalseSwitch';

const CustomSwitch = ({ node, getPos }) => {
  const context = useContext(WaxContext);
  const [checked, setChecked] = useState(false);
  const [checkedAnswerMode, setCheckedAnswerMode] = useState(false);

  const {
    pmViews: { main },
  } = context;

  const customProps = main.props.customValues;

  const isEditable = main.props.editable(editable => {
    return editable;
  });

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
    const allNodes = getNodes(main);

    allNodes.forEach(singleNode => {
      if (singleNode.node.attrs.id === node.attrs.id) {
        main.dispatch(
          main.state.tr.setNodeMarkup(getPos(), undefined, {
            ...singleNode.node.attrs,
            [key]: value,
          }),
        );
      }
    });
  };

  const getUpdatedNode = () => {
    let nodeFound = node;
    const allNodes = getNodes(main);
    allNodes.forEach(singNode => {
      if (singNode.node.attrs.id === node.attrs.id) {
        nodeFound = singNode;
      }
    });
    return nodeFound;
  };

  return (
    <TrueFalseSwitch
      checked={checked}
      checkedAnswerMode={checkedAnswerMode}
      customProps={customProps}
      handleChange={handleChange}
      isEditable={isEditable}
      node={getUpdatedNode()}
    />
  );
};

const getNodes = view => {
  const allNodes = DocumentHelpers.findBlockNodes(view.state.doc);
  const multipleChoiceNodes = [];
  allNodes.forEach(node => {
    if (node.node.type.name === 'true_false') {
      multipleChoiceNodes.push(node);
    }
  });
  return multipleChoiceNodes;
};

export default CustomSwitch;
