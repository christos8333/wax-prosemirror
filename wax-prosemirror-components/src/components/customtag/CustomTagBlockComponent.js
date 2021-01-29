import React, { useContext, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { WaxContext } from 'wax-prosemirror-core';
import { Commands } from 'wax-prosemirror-utilities';

const Wrapper = styled.div``;


const Input = styled.input`
  font-size: 14px;
  font-weight: 400;
  border: none;
  border-bottom: 1px solid grey;
  &:focus {
    outline: none;
  }
`;

const FlexDiv = styled.div`
  display: flex;
`;

const Add = styled.button`
  align-self: flex-end;
  border: none;
  background: none;
  color: #0042c7;
  cursor: pointer;
`;

const ListStyle = styled.div`
  padding: 2px 3px;
  margin: 5px 7px 7px 0px;
  cursor: pointer;
`;

const Box = styled.div`
  width: 22px;
  height: 22px;
  position: relative;
  top: 3px;
  right: 3px;
  border-radius: 4px;
  background: #bfc4cd;
  z-index: 999;
`;

const StyledButton = styled.div``;



const CustomTagBlockComponent = (isIconClicked) => {

  const ref = useRef();
  const [inputValue, setInputValue] = useState('');
  const [tagName, setTagName] = useState('');
  const localTagList = JSON.parse(localStorage.getItem('tagBlockList'));
  const { view: { main }, activeView } = useContext(WaxContext);
  const { state, dispatch } = main;
  const { selection: { $from, $to } } = state;

  const onChangeTagName = (e) => {
    setTagName(e.target.value)
    setInputValue(e.target.value)
  }

  const onClickAdd = () => {
    if (tagName === '') return;
    let tagNameList = [];
    if (localStorage.getItem('tagBlockList') === null) {
      tagNameList.push(tagName);
      localStorage.setItem('tagBlockList', JSON.stringify(tagNameList));
    } else {
      tagNameList = JSON.parse(localStorage.getItem('tagBlockList'));
      tagNameList.push(tagName);
      localStorage.clear('tagBlockList');
      localStorage.setItem('tagBlockList', JSON.stringify(tagNameList));
    }
    setInputValue(' ')
  }

  const onSelectTag = (e, item) => {
    item = item.replace(/ /g, "-");
    Commands.setBlockType(state.config.schema.nodes.customTagBlock, {
      class: 'custom-tag-block ' + item
    })(state, dispatch);
  }

  return useMemo(
    () => (
      <Wrapper>
        {isIconClicked.isShowTag === true && <FlexDiv>
          <Input
            ref={ref}
            type="text"
            onChange={e => onChangeTagName(e)} value={inputValue}
          />
          <Add onClick={onClickAdd}>Add</Add>
        </FlexDiv>}

        {localTagList !== null && localTagList.map((item, pos) => <ListStyle key={pos}>
          <FlexDiv onClick={e => onSelectTag(e, item)} >
            <Box />
            <StyledButton>{item}</StyledButton>
          </FlexDiv>
        </ListStyle>)}
      </Wrapper>
    )
  );
};

export default CustomTagBlockComponent;
