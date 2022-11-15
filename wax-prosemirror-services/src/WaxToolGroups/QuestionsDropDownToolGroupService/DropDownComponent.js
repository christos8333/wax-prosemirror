/* eslint-disable no-underscore-dangle */
import React, { useContext, useMemo, useEffect, useState } from 'react';
import styled from 'styled-components';
import { WaxContext } from 'wax-prosemirror-core';
import { ReactDropDownStyles } from 'wax-prosemirror-components';
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
      label: '1. Multiple Choice',
      value: '0',
      item: tools[0],
    },
    {
      label: '2. Multiple Choice (single correct)',
      value: '1',
      item: tools[1],
    },
    {
      label: '3. True/False',
      value: '2',
      item: tools[2],
    },
    {
      label: '4. True/False (single correct)',
      value: '3',
      item: tools[3],
    },
    {
      label: '5. Matching',
      value: '4',
      item: tools[4],
    },
    {
      label: '6. Essay',
      value: '5',
      item: tools[5],
    },
    {
      label: '7. Multiple DropDown',
      value: '6',
      item: tools[6],
    },
    {
      label: '8. Fill The Gap',
      value: '7',
      item: tools[7],
    },
  ];

  useEffect(() => {
    setLabel('Question Types');
    dropDownOptions.forEach((option, i) => {
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
          placeholder="Question Types"
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
