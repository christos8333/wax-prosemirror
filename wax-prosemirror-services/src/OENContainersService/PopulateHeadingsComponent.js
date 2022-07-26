/* eslint-disable react/prop-types */
import React, { useContext, useLayoutEffect } from 'react';
import { WaxContext } from 'wax-prosemirror-core';
import { DOMParser } from 'prosemirror-model';
import { ReplaceStep, ReplaceAroundStep } from 'prosemirror-transform';
import { Selection } from 'prosemirror-state';
import styled from 'styled-components';
import { Icon } from 'wax-prosemirror-components';

const StyledButton = styled.span`
  cursor: pointer;
`;

const StyledIcon = styled(Icon)`
  cursor: pointer;
  position: relative;
  height: 23px;
  width: 23px;
  bottom: 5px;
`;

const elementFromString = string => {
  const wrappedValue = `<body>${string}</body>`;

  return new window.DOMParser().parseFromString(wrappedValue, 'text/html').body;
};

const selectionToInsertionEnd = (tr, startLen, bias) => {
  const last = tr.steps.length - 1;

  if (last < startLen) {
    return;
  }

  const step = tr.steps[last];

  if (!(step instanceof ReplaceStep || step instanceof ReplaceAroundStep)) {
    return;
  }

  const map = tr.mapping.maps[last];
  let end = 0;

  map.forEach((_from, _to, _newFrom, newTo) => {
    if (end === 0) {
      end = newTo;
    }
  });
  tr.setSelection(Selection.near(tr.doc.resolve(end), bias));
};

export default ({ setPosition, position }) => {
  const context = useContext(WaxContext);
  const {
    activeView,
    pmViews: { main },
  } = context;

  const isEditable = main.props.editable(editable => {
    return editable;
  });

  const readOnly = !isEditable;

  useLayoutEffect(() => {
    const outlineSection = document
      .getElementsByClassName('outline')[0]
      .getBoundingClientRect();
    const WaxSurface = activeView.dom.getBoundingClientRect();
    const left = outlineSection.width;
    const top = outlineSection.top - WaxSurface.top + 18;
    setPosition({ ...position, left, top });
  }, [position.left]);

  const generateHeadings = () => {
    const {
      tr,
      selection: { from, to },
      doc,
    } = main.state;

    const allSectionNodes = [];
    const sectionHeadings = {};

    doc.descendants((editorNode, index) => {
      if (editorNode.type.name === 'oen_section') {
        allSectionNodes.push(editorNode);
      }
    });

    allSectionNodes.forEach((node, index) => {
      node.content.content.forEach(contentNode => {
        if (contentNode.type.name === 'heading2') {
          sectionHeadings[index] = [contentNode.textContent];
        } else if (!sectionHeadings[index]) {
          sectionHeadings[index] = ['untitled'];
        }
      });
    });

    let sectionNode;
    let sectionNodePosition;

    main.state.doc.nodesBetween(from, to, (node, pos) => {
      if (node.type.name === 'oen_container') {
        sectionNode = node;
        sectionNodePosition = pos;
      }
    });

    let content = '';

    const parser = DOMParser.fromSchema(main.state.config.schema);
    const parsedContent = parser.parse(elementFromString(content));

    tr.replaceWith(
      sectionNodePosition + 1,
      sectionNodePosition + sectionNode.content.size,
      parsedContent,
    );
    selectionToInsertionEnd(tr, tr.steps.length - 1, -1);
    main.dispatch(tr);
  };

  if (!readOnly) {
    return (
      <StyledButton onClick={generateHeadings} type="button">
        <StyledIcon name="refresh" />
      </StyledButton>
    );
  }
};
