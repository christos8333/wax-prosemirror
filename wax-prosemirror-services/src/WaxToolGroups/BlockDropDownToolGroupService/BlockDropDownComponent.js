/* eslint-disable no-underscore-dangle */
import React, { useContext, useMemo, useState, useEffect } from 'react';
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
  const context = useContext(WaxContext);
  const {
    activeViewId,
    pmViews: { main },
  } = context;
  const [label, setLabel] = useState(null);

  const dropDownOptions = [
    // { label: 'Title (H1)', value: '0', item: tools[0] },
    // { label: 'author', value: '1', item: tools[1] },
    // { label: 'Subtitle', value: '2', item: tools[2] },
    // { label: 'Epigraph Prose', value: '3', item: tools[3] },
    // { label: 'Epigraph Poetry', value: '4', item: tools[4] },
    { label: 'Heading 2', value: '5', item: tools[5] },
    { label: 'Heading 3', value: '6', item: tools[6] },
    // { label: 'Heading 3', value: '7', item: tools[7] },
    { label: 'Paragraph', value: '8', item: tools[8] },
    // { label: 'Paragraph Continued', value: '9', item: tools[9] },
    // { label: 'Extract Prose', value: '10', item: tools[10] },
    // { label: 'Extract Poetry', value: '11', item: tools[11] },
    // { label: 'Source Note', value: '12', item: tools[12] },
    { label: 'Block Quote', value: '13', item: tools[13] },
  ];

  useEffect(() => {
    setLabel('Block Level');
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
          placeholder="Block Level"
          select
          value={label}
        />
      </Wrapper>
    ),
    [label],
  );

  return MultipleDropDown;
};

export default BlockDropDownComponent;
