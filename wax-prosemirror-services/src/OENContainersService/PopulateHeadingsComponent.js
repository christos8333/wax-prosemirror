/* eslint-disable react/prop-types */
import React, { useContext, useLayoutEffect, useEffect } from 'react';
import { WaxContext } from 'wax-prosemirror-core';
import { DOMParser } from 'prosemirror-model';
import { ReplaceStep, ReplaceAroundStep } from 'prosemirror-transform';
import { Selection } from 'prosemirror-state';
import styled from 'styled-components';
import { Icon } from 'wax-prosemirror-components';

const IconRemove = styled(Icon)`
  cursor: pointer;
  position: relative;
  top: 2px;
  left: 6px;
  height: 16px;
  width: 16px;
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
    const parser = DOMParser.fromSchema(main.state.config.schema);

    const allSections = [];

    doc.descendants((editorNode, index) => {
      if (Node.type.name === 'oen_section') {
        allSections.push(editorNode);
      }
    });

    const content =
      '<h1>heading when i click note</h1><p>some text when i click note</p>';
    const parsedContent = parser.parse(elementFromString(content));
    tr.replaceWith(from - 1, to - 1, parsedContent);
    selectionToInsertionEnd(tr, tr.steps.length - 1, -1);
    main.dispatch(tr);
  };

  if (!readOnly) {
    return (
      <button onClick={generateHeadings} type="button">
        generate
      </button>
    );
  }
};
