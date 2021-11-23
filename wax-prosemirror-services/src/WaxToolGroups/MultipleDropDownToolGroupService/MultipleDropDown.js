import React, { useContext } from 'react';
import { injectable, inject } from 'inversify';
import { isEmpty } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { WaxContext } from 'wax-prosemirror-core';
import { ReactDropDownStyles } from 'wax-prosemirror-components';
import Dropdown from 'react-dropdown';
import ToolGroup from '../../lib/ToolGroup';

@injectable()
class MultipleDropDown extends ToolGroup {
  tools = [];
  constructor(
    @inject('MultipleChoiceQuestion') multipleChoiceQuestion,
    @inject('MultipleChoiceSingleCorrectQuestion')
    multipleChoiceSingleCorrectQuestion,
  ) {
    super();
    this.tools = [multipleChoiceQuestion, multipleChoiceSingleCorrectQuestion];
  }

  renderTools(view) {
    if (isEmpty(view)) return null;

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
        padding-top: 12px;

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

    const context = useContext(WaxContext);

    const {
      activeView,
      view: { main },
    } = context;
    const { state } = view;

    const dropDownOptions = [
      {
        label: 'Multiple Choice',
        value: '0',
        item: this._tools[0],
        type: 'multiple',
      },
      {
        label: 'Multiple Choice (single correct)',
        value: '1',
        item: this._tools[1],
        type: 'multipleSingle',
      },
      {
        label: 'True/False',
        value: '2',
        item: this._tools[0],
        type: 'trueFalse',
      },
      {
        label: 'True/False (single correct)',
        value: '3',
        item: this._tools[0],
        type: 'trueFalseSingle',
      },
    ];

    const isDisabled = this._tools[0].select(state, activeView);
    let found = '';
    dropDownOptions.forEach((option, i) => {
      if (option.item.active(main.state) === option.type) {
        found = option.label;
      }
    });

    return (
      <Wrapper key={uuidv4()}>
        <DropdownStyled
          value={found}
          key={uuidv4()}
          options={dropDownOptions}
          onChange={option => {
            this._tools[option.value].run(view, main, context);
          }}
          placeholder="Multiple Question Types"
          select={isDisabled}
        />
      </Wrapper>
    );
  }
}

export default MultipleDropDown;
