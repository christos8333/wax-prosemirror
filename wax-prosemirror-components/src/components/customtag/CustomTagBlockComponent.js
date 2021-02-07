import React, { useContext, useMemo, useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { WaxContext } from 'wax-prosemirror-core';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { v4 as uuidv4 } from 'uuid';

const Wrapper = styled.div``;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid grey;
  font-size: 14px;
  font-weight: 400;
  width: 150px;

  &:focus {
    outline: none;
  }
`;

const FlexDiv = styled.div`
  display: flex;
  width: 150px;
`;

const Add = styled.button`
  align-self: flex-end;
  background: none;
  border: none;
  color: #0042c7;
  cursor: pointer;
`;

const ListStyle = styled.div`
  cursor: pointer;
  margin: 5px 7px 7px 0px;
  padding: 2px 3px;
`;

const Box = styled.div`
  background: #bfc4cd;
  border-radius: 4px;
  height: 22px;
  position: relative;
  right: 3px;
  top: 3px;
  width: 22px;
  z-index: 999;
`;

const StyledButton = styled.div``;

const CustomTagBlockComponent = ({ isShowTag, item }) => {
  const ref = useRef();
  const [inputValue, setInputValue] = useState('');
  const [tagName, setTagName] = useState('');

  const {
    app,
    view: { main },
    activeView,
    activeViewId,
  } = useContext(WaxContext);

  const { state, dispatch } = main;
  const { $from } = state.selection;

  const type = $from.parent.attrs.class ? $from.parent.attrs.class : '';
  const configTags = app.config.get('config.CustomTagService').tags;
  const [allTags, setAllTags] = useState(configTags);
  const isActive = item.active(activeView.state, activeViewId, type);

  const onChangeTagName = () => {
    setTagName(ref.current.value);
    setInputValue(ref.current.value);
  };

  const onClickAdd = () => {
    if (tagName.trim() === '') return;

    configTags.push({ label: tagName, tagType: 'block' });
    setAllTags(configTags);
    setInputValue(' ');
  };

  const onSelectTag = (e, val) => {
    item.run(state, dispatch, val.replace(/ /g, '-'));
  };

  const renderTagList = () => {
    const tagList = [];
    const blockTags = allTags.filter(tag => {
      return tag.tagType === 'block';
    });
    blockTags.forEach(blockTag => {
      tagList.push(<span key={uuidv4()}>{blockTag.label}</span>);
    });
    return <div>{tagList}</div>;
  };

  return useMemo(
    () => (
      <Wrapper>
        {isShowTag && (
          <FlexDiv>
            <Input
              onChange={onChangeTagName}
              ref={ref}
              type="text"
              value={inputValue}
            />
            <Add onClick={onClickAdd}>Add</Add>
          </FlexDiv>
        )}
        {renderTagList()}
      </Wrapper>
    ),
    [isShowTag, inputValue],
  );
};

export default CustomTagBlockComponent;
