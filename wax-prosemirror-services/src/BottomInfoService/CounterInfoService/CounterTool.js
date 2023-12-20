import React, { useMemo, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { grid, override } from '@pubsweet/ui-toolkit';
import { MenuButton, useOnClickOutside } from 'wax-prosemirror-core';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';

const Wrapper = styled.div`
  font-size: 0;
  position: relative;
  z-index: 2;

  button {
    background: ${props => (props.active ? `#535E76` : '#fff')};
    border: ${props =>
      props.active ? `1px solid #535E76` : `1px solid #D8DAE0`};

    &:hover {
      background: ${props => (props.active ? `#535E76` : '#D8DAE0')};
    }
    box-shadow: 0px -2px 6px 1px rgba(204, 204, 204, 0.41);
  }

  &:before {
    border-bottom: ${props =>
      props.active ? `8px solid #535E76` : `8px solid #D8DAE0`};

    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    bottom: 26px;
    content: '';
    height: 0;
    left: 48%;
    position: relative;
    width: 0;
  }

  /* stylelint-disable-next-line order/properties-alphabetical-order */
  ${override('Wax.CounterWrapper')}
`;

const DropWrapper = styled.div`
  background: white;
  margin-top: ${grid(1)};
  position: absolute;
  top: 32px;
  width: max-content;

  /* stylelint-disable-next-line order/properties-alphabetical-order */
  ${override('Wax.CounterDropWrapper')}
`;

const CounterInfoComponent = styled.div`
  background: #fff;
  border-radius: 1.03093% / 8%;
  bottom: 45px;
  box-shadow: rgb(9 30 66 / 25%) 0px 4px 8px 0px,
    rgb(9 30 66 / 31%) 0px 0px 1px 0px;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  padding: calc(4px * 2);
  position: fixed;
  right: 31px;
  transform-origin: 50% 50% 0px;

  /* stylelint-disable-next-line order/properties-alphabetical-order */
  ${override('Wax.CounterInfoComponent')}
`;

const Counter = styled.div`
  color: black;
  display: block;
  font-size: 14px;
  height: 25px;
  margin: 5px;
  min-width: 150px;

  /* stylelint-disable-next-line order/properties-alphabetical-order */
  ${override('Wax.Counters')}
`;

const CounterTool = ({ view: { state }, item }) => {
  const { t, i18n } = useTranslation();

  const [wordCount, setWordCount] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const [charactersNoSpaceCount, setCharactersNoSpace] = useState(0);
  const [paragraphCount, setParagraphCount] = useState(0);
  const [imageCount, setImageCount] = useState(0);
  const [footnoteCount, setFootnoteCount] = useState(0);
  const [tableCount, setTableCount] = useState(0);

  const ref = useRef();
  const [isOpen, setIsOpen] = useState(false);
  useOnClickOutside(ref, () => setIsOpen(false));

  useEffect(() => {
    if (!isOpen) return;

    const docText = state.doc.textBetween(
      0,
      state.doc.content.size,
      undefined,
      ' ',
    );

    const wordCounter = docText.split(' ').filter(word => word !== '').length;
    const chars = docText.split('');

    const charactersNoSpace = chars.filter(char => char !== ' ').length;

    setWordCount(wordCounter);
    setCharacterCount(charactersNoSpace);
    setCharactersNoSpace(chars.length);

    state.doc.descendants(node => {
      if (node.type.name === 'paragraph') {
        setParagraphCount(prevState => prevState + 1);
      }
      if (node.type.name === 'image') {
        setImageCount(prevState => prevState + 1);
      }
      if (node.type.groups.includes('notes')) {
        setFootnoteCount(prevState => prevState + 1);
      }
      if (node.type.name === 'table') {
        setTableCount(prevState => prevState + 1);
      }
    });
  }, [isOpen]);

  const infoDropDownOptions = [
    {
      name: `${wordCount} ${
        !isEmpty(i18n) && i18n.exists(`Wax.Counters.Words`)
          ? t(`Wax.Counters.Words`)
          : 'Words'
      }`,
    },
    {
      name: `${characterCount} ${
        !isEmpty(i18n) && i18n.exists(`Wax.Counters.Characters`)
          ? t(`Wax.Counters.Characters`)
          : 'Characters'
      }`,
    },
    {
      name: `${charactersNoSpaceCount} ${
        !isEmpty(i18n) && i18n.exists(`Wax.Counters.Characters Without Space`)
          ? t(`Wax.Counters.Characters Without Space`)
          : 'Characters Without Space'
      }`,
    },
    {
      name: `${paragraphCount} ${
        !isEmpty(i18n) && i18n.exists(`Wax.Counters.Paragraph`)
          ? t(`Wax.Counters.Paragraph`)
          : 'Paragraph'
      }`,
    },
    {
      name: `${imageCount} ${
        !isEmpty(i18n) && i18n.exists(`Wax.Counters.Images`)
          ? t(`Wax.Counters.Images`)
          : 'Images'
      }`,
    },
    {
      name: `${tableCount} ${
        !isEmpty(i18n) && i18n.exists(`Wax.Counters.Tables`)
          ? t(`Wax.Counters.Tables`)
          : 'Tables'
      }`,
    },
    {
      name: `${footnoteCount} ${
        !isEmpty(i18n) && i18n.exists(`Wax.Counters.Footnotes`)
          ? t(`Wax.Counters.Footnotes`)
          : 'Footnotes'
      }`,
    },
  ];

  const MenuButtonComponent = useMemo(
    () => (
      <Wrapper active={isOpen} ref={ref}>
        <MenuButton
          active={isOpen}
          disabled={false}
          label="Words"
          onMouseDown={() => {
            setIsOpen(!isOpen);
          }}
          title={item.title}
        />

        {isOpen && (
          <DropWrapper>
            <CounterInfoComponent
              close={() => setIsOpen(false)}
              item={item}
              view={state}
            >
              {infoDropDownOptions.map(option => (
                <Counter key={option.name} title={option.name}>
                  <span>{option.name}</span>
                </Counter>
              ))}
            </CounterInfoComponent>
          </DropWrapper>
        )}
      </Wrapper>
    ),
    [isOpen, infoDropDownOptions],
  );

  return MenuButtonComponent;
};

export default CounterTool;
