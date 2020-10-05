import React, { useContext } from 'react';
import { injectable, inject } from 'inversify';
import { isEmpty } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { WaxContext } from 'wax-prosemirror-core';

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import ToolGroup from '../../lib/ToolGroup';

@injectable()
class BlockDropDown extends ToolGroup {
  tools = [];

  constructor(
    @inject('Title') title,
    @inject('Author') author,
    @inject('SubTitle') subtitle,
    @inject('EpigraphProse') epigraphprose,
    @inject('EpigraphPoetry') epigraphpoetry,
    @inject('Heading1') heading1,
    @inject('Heading2') heading2,
    @inject('Heading3') heading3,
    @inject('Paragraph') paragraph,
    @inject('ParagraphContinued') paragraphContinued,
    @inject('ExtractProse') extractProse,
    @inject('ExtractPoetry') extractPoetry,
    @inject('SourceNote') sourceNote,
    @inject('BlockQuote') blockQuote,
  ) {
    super();
    this.tools = [
      title,
      author,
      subtitle,
      epigraphprose,
      epigraphpoetry,
      heading1,
      heading2,
      heading3,
      paragraph,
      paragraphContinued,
      extractProse,
      extractPoetry,
      sourceNote,
      blockQuote,
    ];
  }
  renderTools(view) {
    if (isEmpty(view)) return null;

    const { activeViewId } = useContext(WaxContext);

    const DropdownStyled = styled(Dropdown)`
      display: inline-flex;
      cursor: not-allowed;
      opacity: ${props => (props.select ? 1 : 0.4)};
      pointer-events: ${props => (props.select ? 'default' : 'none')};
      .Dropdown-control {
        border: none;
      }
      .Dropdown-arrow {
        right: 25px;
        top: 10px;
      }
      .Dropdown-menu {
        width: 120%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        .Dropdown-option {
          width: 100%;
        }
      }
    `;

    const { dispatch, state } = view;
    const dropDownOptions = [
      { label: 'Title', value: '0', item: this._tools[0] },
      { label: 'author', value: '1', item: this._tools[1] },
      { label: 'Subtitle', value: '2', item: this._tools[2] },
      { label: 'Epigraph Prose', value: '3', item: this._tools[3] },
      { label: 'Epigraph Poetry', value: '4', item: this._tools[4] },
      { label: 'Heading 1', value: '5', item: this._tools[5] },
      { label: 'Heading 2', value: '6', item: this._tools[6] },
      { label: 'Heading 3', value: '7', item: this._tools[7] },
      { label: 'Paragraph', value: '8', item: this._tools[8] },
      { label: 'Paragraph Continued', value: '9', item: this._tools[9] },
      { label: 'Extract Prose', value: '10', item: this._tools[10] },
      { label: 'Extract Poetry', value: '11', item: this._tools[11] },
      { label: 'Source Note', value: '12', item: this._tools[12] },
      { label: 'Block Quote', value: '13', item: this._tools[13] },
    ];

    const isDisabled =
      dropDownOptions[0].item.enable &&
      dropDownOptions[0].item.enable(state) &&
      dropDownOptions[0].item.select &&
      dropDownOptions[0].item.select(state, activeViewId);

    let found = '';
    dropDownOptions.forEach((item, i) => {
      if (item.item.active(state, activeViewId) === true) {
        found = item.item.label;
      }
    });

    if (window.innerWidth > 600) return null;

    return (
      <DropdownStyled
        value={found}
        key={uuidv4()}
        options={dropDownOptions}
        onChange={option => {
          this._tools[option.value].run(state, dispatch);
        }}
        placeholder="Block Level"
        select={isDisabled}
      />
    );
  }
}

export default BlockDropDown;
