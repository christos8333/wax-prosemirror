import React, { useContext, useMemo, useEffect, useState } from 'react';
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
    @inject('TrueFalseQuestion') trueFalseQuestion,
    @inject('TrueFalseSingleCorrectQuestion') trueFalseSingleCorrectQuestion,
  ) {
    super();
    this.tools = [
      multipleChoiceQuestion,
      multipleChoiceSingleCorrectQuestion,
      trueFalseQuestion,
      trueFalseSingleCorrectQuestion,
    ];
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
      activeViewId,
      view: { main },
    } = context;
    const { state } = view;

    const [label, setLabel] = useState(null);

    const dropDownOptions = [
      {
        label: 'Multiple Choice',
        value: '0',
        item: this._tools[0],
      },
      {
        label: 'Multiple Choice (single correct)',
        value: '1',
        item: this._tools[1],
      },
      {
        label: 'True/False',
        value: '2',
        item: this._tools[2],
      },
      {
        label: 'True/False (single correct)',
        value: '3',
        item: this._tools[3],
      },
    ];

    useEffect(() => {
      dropDownOptions.forEach((option, i) => {
        if (option.item.active(main.state)) {
          setLabel(option.label);
        }
      });
    }, [activeViewId]);

    const isDisabled = this._tools[0].select(state, activeView);

    const onChange = option => {
      this._tools[option.value].run(main, context);
    };

    const MultipleDropDown = useMemo(
      () => (
        <Wrapper key={uuidv4()}>
          <DropdownStyled
            value={label}
            key={uuidv4()}
            options={dropDownOptions}
            onChange={option => onChange(option)}
            placeholder="Multiple Question Types"
            select={isDisabled}
          />
        </Wrapper>
      ),
      [isDisabled, label],
    );

    return MultipleDropDown;
  }
}

export default MultipleDropDown;
