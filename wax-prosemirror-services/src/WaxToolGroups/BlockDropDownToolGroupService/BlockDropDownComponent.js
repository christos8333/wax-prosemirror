/* eslint-disable no-underscore-dangle */
import React, { useContext, useMemo, useState, useEffect } from 'react';
import { isEmpty } from 'lodash';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { WaxContext, ReactDropDownStyles } from 'wax-prosemirror-core';
import Dropdown from 'react-dropdown';
import { v4 as uuidv4 } from 'uuid';

const Wrapper = styled.div`
  ${ReactDropDownStyles};
`;
const DropdownStyled = styled(Dropdown)`
  display: inline-flex;
  cursor: not-allowed;
  opacity: ${props => (props.select ? 1 : 0.4)};
  pointer-events: ${props => (props.select ? 'default' : 'none')};
  .Dropdown-control {
    width: 170px;
    border: none;
    padding: 12px 26px 8px 10px;
    &:hover {
      box-shadow: none;
    }
  }

  .Dropdown-arrow {
    top: 17px;
  }

  .Dropdown-menu {
    width: 102%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .Dropdown-option {
      width: 100%;
    }
  }
`;

// eslint-disable-next-line react/prop-types
const BlockDropDownComponent = ({ view, tools }) => {
  const { t, i18n } = useTranslation();
  const context = useContext(WaxContext);
  const {
    activeViewId,
    pmViews: { main },
  } = context;
  const [label, setLabel] = useState(null);

  const isEditable = main.props.editable(editable => {
    return editable;
  });

  const dropDownOptions = [
    {
      label:
        !isEmpty(i18n) && i18n.exists(`Wax.BlockLevel.Heading 2`)
          ? t(`Wax.BlockLevel.Heading 2`)
          : 'Heading 2',
      value: '5',
      item: tools[5],
    },
    {
      label:
        !isEmpty(i18n) && i18n.exists(`Wax.BlockLevel.Heading 3`)
          ? t(`Wax.BlockLevel.Heading 3`)
          : 'Heading 3',
      value: '6',
      item: tools[6],
    },
    {
      label:
        !isEmpty(i18n) && i18n.exists(`Wax.BlockLevel.Paragraph`)
          ? t(`Wax.BlockLevel.Paragraph`)
          : 'Paragraph',
      value: '8',
      item: tools[8],
    },
    {
      label:
        !isEmpty(i18n) && i18n.exists(`Wax.BlockLevel.Block Quote`)
          ? t(`Wax.BlockLevel.Block Quote`)
          : 'Block Quote',
      value: '13',
      item: tools[13],
    },
  ];

  const dropDownLabel =
    !isEmpty(i18n) && i18n.exists(`Wax.BlockLevel.Block Level`)
      ? t(`Wax.BlockLevel.Block Level`)
      : 'Heading styles';

  useEffect(() => {
    setLabel(dropDownLabel);
    dropDownOptions.forEach(option => {
      if (option.item.active(main.state, activeViewId)) {
        setTimeout(() => {
          setLabel(option.item.label);
        });
      }
    });
  }, [main.state.selection.$from.parent.type.name]);

  const MultipleDropDown = useMemo(
    () => (
      <Wrapper key={uuidv4()}>
        <DropdownStyled
          key={uuidv4()}
          onChange={option => {
            tools[option.value].run(main.state, main.dispatch);
          }}
          options={dropDownOptions}
          placeholder={dropDownLabel}
          select={isEditable}
          value={label}
        />
      </Wrapper>
    ),
    [label, isEditable],
  );

  return MultipleDropDown;
};

export default BlockDropDownComponent;
