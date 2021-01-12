/* eslint react/prop-types: 0 */
import React, { useRef, useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { grid, th } from '@pubsweet/ui-toolkit';
import { WaxContext } from 'wax-prosemirror-core';

const IconSVG = props => {
  const { className } = props;
  return (
    <svg version="1.1" viewBox="0 0 512.001 512.001" className={className}>
      <path d="M284.286,256.002L506.143,34.144c7.811-7.811,7.811-20.475,0-28.285c-7.811-7.81-20.475-7.811-28.285,0L256,227.717
       L34.143,5.859c-7.811-7.811-20.475-7.811-28.285,0c-7.81,7.811-7.811,20.475,0,28.285l221.857,221.857L5.858,477.859
       c-7.811,7.811-7.811,20.475,0,28.285c3.905,3.905,9.024,5.857,14.143,5.857c5.119,0,10.237-1.952,14.143-5.857L256,284.287
       l221.857,221.857c3.905,3.905,9.024,5.857,14.143,5.857s10.237-1.952,14.143-5.857c7.811-7.811,7.811-20.475,0-28.285
       L284.286,256.002z"/>
    </svg>
  );
};

const Icon = styled(IconSVG)`
  height: 10px;
  width: 10px;
  fill: ${th('colorPrimary')};
`;

const Wrapper = styled.div`
  background: #fff;
  background: #fff;
  border-radius: 1.03093% / 8%;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px 0px,
    rgba(9, 30, 66, 0.31) 0px 0px 1px 0px;
  transform-origin: 50% 50% 0px;
  padding: ${grid(2)} ${grid(1)} ${grid(2)} ${grid(2)};
`;

const CustomWrapper = styled.div`
  display: inline-block;
  width: 200px;
  margin-right: 12px;
`;

const Input = styled.input`
  width: calc(100% - 8px);
  outline: none;
  :focus {
    outline: none;
  }
`;

const ButtonGroup = styled.div`
  display: inline-block;
`;

const StyledButton = styled.button`
  margin-right: 10px;
  background: ${th('colorPrimary')};
  cursor: pointer;
  color: #fff;
`;

const ListStyle = styled.div`
  padding: 2px 3px;
  margin: 5px 7px 7px 0px;
  cursor: pointer;
`;

const CustomTagInlineOverlayComponent = ({ mark, setPosition, position }) => {

  const ref = useRef(null);
  const [tagName, setTagName] = useState();
  const [inputValue, setInputValue] = useState('');
  const [selectedTagName, setSelectedTagName] = useState('');
  const localTagList = JSON.parse(localStorage.getItem('tagList'));
  const [isCustomTagInline, setCustomTag] = useState(JSON.parse(localStorage.getItem('isInline')));
  const { view: { main } } = useContext(WaxContext);
  const { state, dispatch } = main;
  const { selection: { $from, $to } } = state;

  const onChangeTagName = (e) => {
    setTagName(e.target.value)
    setInputValue(e.target.value)
  }

  const onClickAdd = () => {
    let tagNameList = [];
    if (localStorage.getItem('tagList') === null) {
      tagNameList.push(tagName);
      localStorage.setItem('tagList', JSON.stringify(tagNameList));
    } else {
      tagNameList = JSON.parse(localStorage.getItem('tagList'));
      tagNameList.push(tagName);
      localStorage.clear('tagList');
      localStorage.setItem('tagList', JSON.stringify(tagNameList));
    }
    setInputValue(' ')
  }

  const onListClicked = (e, item) => {

    setSelectedTagName(item);
    dispatch(
      state.tr.addMark(
        $from.pos,
        $to.pos,
        state.schema.marks.customTagInline.create({
          tagName: item,
          class: 'custom-tag-inline',
        }),
      ),
    );
  }

  const onClickCancel = () => {
    dispatch(state.tr.removeMark($from.pos, $to.pos, state.schema.marks.customTagInline));
    setSelectedTagName('');
  }

  useEffect(() => {
    state.doc.nodesBetween(
      $from.pos, $to.pos,
      (node, from) => {
        node.marks.forEach(item => {
          setSelectedTagName(item.attrs.tagName !== undefined ? item.attrs.tagName : '' );
        });
      },
    );
    setCustomTag(JSON.parse(localStorage.getItem('isInline')));
  });

  return isCustomTagInline === true ? (
    <Wrapper>
      {localTagList !== null && localTagList.map((item, pos) => <ListStyle key={pos}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div onClick={e => onListClicked(e, item)}> {item} </div>
          {selectedTagName === item &&
            <div onClick={onClickCancel}>
              <Icon />
            </div>
          }

        </div>
      </ListStyle>)}
      <CustomWrapper ref={ref}>
        <Input type="text" onChange={e => onChangeTagName(e)} value={inputValue} />
      </CustomWrapper>

      <ButtonGroup>
        <StyledButton type="button" onClick={onClickAdd}>
          Add
        </StyledButton>
      </ButtonGroup>
    </Wrapper>
  ) : null;
};
export default CustomTagInlineOverlayComponent;
