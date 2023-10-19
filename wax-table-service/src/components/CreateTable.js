/* eslint react/prop-types: 0 */
import React, { useState, useContext, useMemo, useRef } from 'react';
import styled from 'styled-components';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
import {
  WaxContext,
  useOnClickOutside,
  MenuButton,
} from 'wax-prosemirror-core';
import { grid, override } from '@pubsweet/ui-toolkit';
import InsertTableTool from './InsertTableTool';

const Wrapper = styled.div`
  font-size: 0;
  position: relative;
  z-index: 2;
`;

const DropWrapper = styled.div`
  background: white;
  margin-top: ${grid(1)};
  position: absolute;

  ${override('Wax.CreateTableWrapper')}
`;

const CreateTable = ({ item }) => {
  const { t, i18n } = useTranslation();
  const {
    pmViews: { main },
    activeView,
  } = useContext(WaxContext);

  const { icon, run, select, title } = item;
  const ref = useRef();
  const [isOpen, setIsOpen] = useState(false);

  const dropComponent = (
    <InsertTableTool
      onGridSelect={colRows =>
        handleSelect(colRows, activeView.state, activeView.dispatch)
      }
    />
  );

  const handleSelect = (colRows, editorState, editorDispatch) => {
    run(colRows, editorState, editorDispatch);
    setIsOpen(!isOpen);
  };

  let isDisabled = !select(activeView);

  const isEditable = main.props.editable(editable => {
    return editable;
  });
  if (!isEditable) isDisabled = true;

  useOnClickOutside(ref, () => setIsOpen(false));

  const MemorizedDropdown = useMemo(
    () => (
      <Wrapper ref={ref}>
        <MenuButton
          active={isOpen}
          disabled={isDisabled}
          iconName={icon}
          onMouseDown={() => {
            setIsOpen(!isOpen);
          }}
          title={
            !isEmpty(i18n) && i18n.exists(`Wax.Tables.${title}`)
              ? t(`Wax.Tables.${title}`)
              : title
          }
        />

        {isOpen && <DropWrapper>{dropComponent}</DropWrapper>}
      </Wrapper>
    ),
    [isDisabled, isOpen, t(`Wax.Tables.${title}`)],
  );

  return MemorizedDropdown;
};

export default CreateTable;
