import React, {
  useContext,
  useRef,
  useMemo,
  useState,
  useLayoutEffect,
  useEffect,
} from 'react';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { grid, override } from '@pubsweet/ui-toolkit';
import { WaxContext, MenuButton } from 'wax-prosemirror-core';
import FindAndReplaceComponent from './FindAndReplaceComponent';
import epigraphPoetry from '../../TrackChangeService/schema/trackChangesNodes/epigraphPoetryTrackNode';

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
  ${override('Wax.FindReplaceWrapper')}
`;

const FindAndReplaceTool = ({ item }) => {
  const { t, i18n } = useTranslation();
  const {
    activeView,
    pmViews: { main },
  } = useContext(WaxContext);

  const { icon, title } = item;
  const dropElement = useRef();
  const [isOpen, setIsOpen] = useState(false);

  let styles = { right: '-190px' };
  const [style, setStyle] = useState(styles);

  const isEditable = main.props.editable(editable => {
    return editable;
  });

  const triggerFind = e => {
    if ((e.key === 70 || e.keyCode === 70) && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      setIsOpen(true);
      return false;
    }
    return true;
  };

  useEffect(() => {
    document.addEventListener('keydown', triggerFind);

    return () => document.removeEventListener('keydown', triggerFind);
  }, []);

  useLayoutEffect(() => {
    setStyle(styles);
    if (!dropElement.current) return;
    const { right } = dropElement.current.getBoundingClientRect();
    if (right > window.window.innerWidth) {
      const newRight = -175 + (right - window.window.innerWidth);
      styles = { right: `${newRight}px` };
      setStyle(styles);
    }
  }, [isOpen]);

  const MemorizedDropdown = useMemo(
    () => (
      <Wrapper>
        <MenuButton
          active={isOpen}
          disabled={false}
          iconName={icon}
          onMouseDown={e => {
            e.preventDefault();
            setIsOpen(!isOpen);
            activeView.focus();
          }}
          title={
            !isEmpty(i18n) && i18n.exists(`Wax.FindAndReplace.${title}`)
              ? t(`Wax.FindAndReplace.${title}`)
              : title
          }
        />

        {isOpen && (
          <DropWrapper ref={dropElement} style={style}>
            <FindAndReplaceComponent
              close={() => {
                setIsOpen(false);
                activeView.focus();
              }}
            />
          </DropWrapper>
        )}
      </Wrapper>
    ),
    [isOpen, style, isEditable, t(`Wax.FindAndReplace.${title}`)],
  );

  return MemorizedDropdown;
};

export default FindAndReplaceTool;
