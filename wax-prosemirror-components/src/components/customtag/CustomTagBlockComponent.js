import React, { useContext, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { WaxContext } from 'wax-prosemirror-core';
import { v4 as uuidv4 } from 'uuid';
import MenuButton from '../../ui/buttons/MenuButton';

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

const CustomTagList = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;

  button {
    margin-top: 5px;
  }
`;

const CustomTagBlockComponent = ({ isShowTag, item }) => {
  const ref = useRef();
  const [inputValue, setInputValue] = useState('');

  const {
    app,
    view: { main },
    activeView,
    activeViewId,
  } = useContext(WaxContext);

  const { state, dispatch } = main;
  const { $from } = state.selection;

  const className = $from.parent.attrs.class ? $from.parent.attrs.class : '';
  const configTags = app.config.get('config.CustomTagService').tags;
  const [allTags, setAllTags] = useState(configTags);
  const tagStatus = item.active(
    activeView.state,
    activeViewId,
    className,
    allTags,
  );

  const onChangeTagName = () => {
    setInputValue(ref.current.value);
  };

  const onClickAdd = () => {
    if (inputValue.trim() === '') return;

    configTags.push({ label: inputValue, tagType: 'block' });
    setAllTags(configTags);
    setInputValue(' ');
  };

  const onSelectTag = val => {
    item.run(state, dispatch, val.replace(/ /g, '-'));
  };

  const renderTagList = () => {
    const tagList = [];
    const blockTags = allTags.filter(tag => {
      return tag.tagType === 'block';
    });

    blockTags.forEach(blockTag => {
      tagList.push(
        <MenuButton
          active={tagStatus[blockTag.label]}
          disabled={false}
          key={uuidv4()}
          label={blockTag.label}
          onMouseDown={() => onSelectTag(blockTag.label)}
          title={blockTag.label}
        />,
      );
    });
    return <CustomTagList>{tagList}</CustomTagList>;
  };

  return useMemo(
    () => (
      <>
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
      </>
    ),
    [isShowTag, inputValue, tagStatus],
  );
};

export default CustomTagBlockComponent;
