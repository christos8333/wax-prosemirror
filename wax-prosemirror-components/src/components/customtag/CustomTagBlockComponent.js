import React, { useContext, useMemo, useRef, useState } from 'react';
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

  &:focus {
    outline: none;
  }
`;

const FlexDiv = styled.div`
  display: flex;
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

const CustomTagBlockComponent = props => {
  const { isShowTag, item } = props;
  const ref = useRef();
  const [inputValue, setInputValue] = useState('');
  const [tagName, setTagName] = useState('');
  const localTagList = JSON.parse(localStorage.getItem('tagBlockList'));

  const {
    app,
    view: { main },
    activeView,
    activeViewId,
  } = useContext(WaxContext);

  const { state, dispatch } = main;
  const { $from } = state.selection;

  const type = $from.parent.attrs.class ? $from.parent.attrs.class : '';
  const serviceConfig = app.config.get('config.CustomTagService');
  const [serviceList, setServiceList] = useState([]);
  const isActive = item.active(activeView.state, activeViewId, type);

  const onChangeTagName = e => {
    setTagName(e.target.value);
    setInputValue(e.target.value);
  };

  const onClickAdd = () => {
    if (tagName.trim() === '') return;
    let tagNameList = [];
    if (localStorage.getItem('tagBlockList') === null) {
      tagNameList.push({ label: tagName, type: 'block' });
      localStorage.setItem('tagBlockList', JSON.stringify(tagNameList));
    } else {
      tagNameList = JSON.parse(localStorage.getItem('tagBlockList'));
      tagNameList.push({ label: tagName, type: 'block' });
      localStorage.clear('tagBlockList');
      localStorage.setItem('tagBlockList', JSON.stringify(tagNameList));
    }
    setInputValue(' ');
  };

  const onSelectTag = (e, val) => {
    item.run(state, dispatch, val.replace(/ /g, '-'));
  };

  useDeepCompareEffect(() => {
    const labels = [];
    if (serviceConfig !== undefined) {
      serviceConfig.tags.forEach(tag => {
        if (tag.tagType === 'block') {
          labels.push(tag.label);
        }
      });
    }
    if (localTagList !== null) {
      localTagList.forEach(tag => {
        labels.push(tag.label);
      });
    }
    setServiceList(labels);
  }, [localTagList, serviceConfig]);

  return useMemo(
    () => (
      <Wrapper>
        {isShowTag && (
          <FlexDiv>
            <Input
              onChange={e => onChangeTagName(e)}
              ref={ref}
              type="text"
              value={inputValue}
            />
            <Add onClick={onClickAdd}>Add</Add>
          </FlexDiv>
        )}
      </Wrapper>
    ),
    [],
  );
};

export default CustomTagBlockComponent;
