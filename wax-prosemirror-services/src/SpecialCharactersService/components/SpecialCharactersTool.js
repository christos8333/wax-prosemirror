import React, { useContext, useMemo, useState, useRef } from 'react';
import styled from 'styled-components';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
import { grid, override } from '@pubsweet/ui-toolkit';
import {
  WaxContext,
  useOnClickOutside,
  MenuButton,
} from 'wax-prosemirror-core';
import SpecialCharactersComponent from './SpecialCharactersComponent';

const Wrapper = styled.div`
  font-size: 0;
  position: relative;
  z-index: 2;
`;

const DropWrapper = styled.div`
  background: white;
  margin-top: ${grid(1)};
  position: absolute;
  top: 32px;

  ${override('Wax.SpecialCharacterToolWrapper')}
`;

const SpecialCharactersTool = ({ item }) => {
  const { t, i18n } = useTranslation();
  const {
    activeView,
    pmViews: { main },
  } = useContext(WaxContext);

  const { icon, title } = item;
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  useOnClickOutside(ref, () => setIsOpen(false));

  let isDisabled = false;
  const isEditable = main.props.editable(editable => {
    return editable;
  });
  if (!isEditable) isDisabled = true;

  const MemorizedDropdown = useMemo(
    () => (
      <Wrapper ref={ref}>
        <MenuButton
          active={isOpen}
          disabled={isDisabled}
          iconName={icon}
          onMouseDown={e => {
            e.preventDefault();
            setIsOpen(!isOpen);
            activeView.focus();
          }}
          title={
            !isEmpty(i18n) && i18n.exists(`Wax.SpecialCharacters.${title}`)
              ? t(`Wax.SpecialCharacters.${title}`)
              : title
          }
        />

        {isOpen && (
          <DropWrapper>
            <SpecialCharactersComponent
              close={() => {
                setIsOpen(false);
              }}
            />
          </DropWrapper>
        )}
      </Wrapper>
    ),
    [isOpen, isDisabled, t(`Wax.SpecialCharacters.${title}`)],
  );

  return MemorizedDropdown;
};

export default SpecialCharactersTool;
