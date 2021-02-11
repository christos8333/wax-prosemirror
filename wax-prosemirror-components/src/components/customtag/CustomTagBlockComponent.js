import React, { useContext, useMemo, useRef, useState, useEffect } from 'react';
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
    border-radius: 4px;
    left: -33px;
    margin-left: 4px;
    padding-left: 25px;
    position: relative;
  }
`;

const TagBoxWrapper = styled.div`
  display: flex;
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

const initialArr = [];

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
  const customTagsConfig = app.config.get('config.CustomTagService');
  const configTags =
    customTagsConfig && customTagsConfig.tags
      ? customTagsConfig.tags
      : initialArr;

  const saveTags =
    customTagsConfig && customTagsConfig.tags
      ? customTagsConfig.updateTags
      : () => true;

  const [allTags, setAllTags] = useState(configTags);
  const tagStatus = item.active(
    activeView.state,
    activeViewId,
    className,
    allTags,
  );

  const isEditable = main.props.editable(editable => {
    return editable;
  });

  let isDisabled = !item.select(state, activeViewId, activeView);
  if (!isEditable) isDisabled = true;

  useEffect(() => {
    if (ref.current) ref.current.focus();
  }, [isShowTag]);

  const onChangeTagName = () => {
    setInputValue(ref.current.value);
  };

  const onClickAdd = () => {
    if (inputValue.trim() === '') return;
    configTags.push({ label: inputValue, tagType: 'block' });
    setAllTags(configTags);
    saveTags(configTags);
    setInputValue('');
    if (ref.current) ref.current.focus();
  };

  const handleKeyDown = event => {
    if (event.key === 'Enter' || event.which === 13) {
      onClickAdd();
    }
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
        <TagBoxWrapper key={uuidv4()}>
          <Box key={uuidv4()} />
          <MenuButton
            active={tagStatus[blockTag.label]}
            disabled={isDisabled}
            key={uuidv4()}
            label={blockTag.label}
            onMouseDown={() => onSelectTag(blockTag.label)}
            title={blockTag.label}
          />
        </TagBoxWrapper>,
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
              onKeyPress={handleKeyDown}
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
    [isShowTag, inputValue, tagStatus, isDisabled],
  );
};

export default CustomTagBlockComponent;
