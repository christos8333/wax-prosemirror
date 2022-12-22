/* eslint-disable no-underscore-dangle */
import React, { useContext, useMemo, useEffect, useState } from 'react';
import styled from 'styled-components';
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
    border: none;
    padding: 12px 122px 8px 10px;
    &:hover {
      box-shadow: none;
    }
  }

  .Dropdown-arrow {
    top: 17px;
  }

  .Dropdown-menu {
    width: 100.4%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .Dropdown-option {
      width: 100%;
    }
  }
`;

const DropDownComponent = ({ view, tools }) => {
  const context = useContext(WaxContext);
  const {
    activeView,
    activeViewId,
    pmViews: { main },
  } = context;
  const { state } = view;

  const [label, setLabel] = useState(null);
  const isEditable = main.props.editable(editable => {
    return editable;
  });

  const dropDownOptions = [
    {
      label: 'Multiple Choice',
      value: '0',
      item: tools[0],
    },
    {
      label: 'Multiple Choice (single correct)',
      value: '1',
      item: tools[1],
    },
    {
      label: 'True/False',
      value: '2',
      item: tools[2],
    },
    {
      label: 'True/False (single correct)',
      value: '3',
      item: tools[3],
    },
    {
      label: 'Matching',
      value: '4',
      item: tools[4],
    },
    {
      label: 'Essay',
      value: '5',
      item: tools[5],
    },
    {
      label: 'Multiple DropDown',
      value: '6',
      item: tools[6],
    },
    {
      label: 'Fill The Gap',
      value: '7',
      item: tools[7],
    },
  ];

  useEffect(() => {
    setLabel('Question Type');
    dropDownOptions.forEach(option => {
      if (option.item.active(main.state)) {
        setTimeout(() => {
          setLabel(option.label);
        });
      }
    });
  }, [activeViewId]);

  let isDisabled = tools[0].select(state, activeView);
  if (!isEditable) isDisabled = false;

  const onChange = option => {
    tools[option.value].run(main, context);
  };

  const MultipleDropDown = useMemo(
    () => (
      <Wrapper key={uuidv4()}>
        <DropdownStyled
          key={uuidv4()}
          onChange={option => onChange(option)}
          options={dropDownOptions}
          placeholder="Question Type"
          select={isDisabled}
          value={label}
        />
      </Wrapper>
    ),
    [isDisabled, label],
  );

  return MultipleDropDown;
};

export default DropDownComponent;