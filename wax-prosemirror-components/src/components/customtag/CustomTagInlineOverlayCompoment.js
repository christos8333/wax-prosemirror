/* eslint react/prop-types: 0 */
import React, { useRef, useEffect, useState, useContext, Fragment } from 'react';
import styled from 'styled-components';
import { grid, th } from '@pubsweet/ui-toolkit';
import { WaxContext } from 'wax-prosemirror-core';
import { DocumentHelpers } from 'wax-prosemirror-utilities';
import { v4 as uuidv4 } from 'uuid';

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

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DivWidth = styled.div`
  width: 100%;
`;


const CustomTagInlineOverlayComponent = ({ mark, setPosition, position }) => {

  const ref = useRef(null);
  const [tagName, setTagName] = useState();
  const [inputValue, setInputValue] = useState('');
  const [selectedTagName, setSelectedTagName] = useState([]);
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
    const localItem = localStorage.getItem('isInline');
    let tagNameList = [];
    if (localStorage.getItem('tagList') === null) {
      tagNameList.push({ label: tagName, type: 'inline' });
      localStorage.setItem('tagList', JSON.stringify(tagNameList));
    } else {
      tagNameList = JSON.parse(localStorage.getItem('tagList'));
      tagNameList.push({ label: tagName, type: 'inline' });
      localStorage.clear('tagList');
      localStorage.setItem('tagList', JSON.stringify(tagNameList));
      localStorage.setItem('isInline', localItem);
    }
    setInputValue('');
  }

  const onListClicked = (item) => {
    let tagNames = [];
    let finalTag = [];
    let isExist = false;
    let classNames = 'custom-tag-inline ';
    const mark = DocumentHelpers.findMark(state, state.schema.marks.customTagInline, true);

    tagNames.push(item);
    if (mark.length > 0) {
      mark.forEach(itemArtt => {
        const classArray = itemArtt.attrs.class.split(' ');
        classArray.forEach(classData => {
          item.replace(/ /g, "-");
          if (classData === item.replace(/ /g, "-")) {
            isExist = true;
          }
        })
        const parseArray = JSON.parse(itemArtt.attrs.tagNames)
        classNames = itemArtt.attrs.class + ' '
        finalTag = tagNames.concat(parseArray);
      });
    } else {
      finalTag.push(item);
    }

    if (isExist) return;

    setSelectedTagName(oldArray => [...oldArray, item]);
    item = classNames + item.replace(/ /g, "-");

    dispatch(
      state.tr.addMark(
        $from.pos,
        $to.pos,
        state.schema.marks.customTagInline.create({
          tagNames: JSON.stringify(finalTag),
          class: item
        }),
      ),
    );

  }

  const onClickCancel = (tagName) => {
    let classNames = '';
    let classArray = [];
    let tagArray = [];
    let finalTag = [];
    const mark = DocumentHelpers.findMark(state, state.schema.marks.customTagInline, true);

    setSelectedTagName(finalTag)
    tagName = tagName.replace(/ /g, "-");
    if (mark.length > 0) {
      mark.forEach(itemArtt => {
        classNames = ''
        classArray = itemArtt.attrs.class.split(' ');
        tagArray = JSON.parse(itemArtt.attrs.tagNames);
        classArray.forEach(classData => {
          if (classData !== tagName) {
            classNames = classNames + ' ' + classData
          }
        })
        tagArray.forEach(tag => {
          if (tag.replace(/ /g, "-") !== tagName) {
            finalTag.push(tag);
          }
        });
      });
      setSelectedTagName(finalTag.filter((item, index) => finalTag.indexOf(item) === index));
      if (finalTag.length === 0) {
        dispatch(state.tr.removeMark($from.pos, $to.pos, state.schema.marks.customTagInline));
      } else {
        dispatch(
          state.tr.addMark(
            $from.pos,
            $to.pos,
            state.schema.marks.customTagInline.create({
              tagNames: JSON.stringify(finalTag),
              class: classNames
            }),
          ),
        );
      }
    }

  }

  useEffect(() => {
    setCustomTag(JSON.parse(localStorage.getItem('isInline')));
  });

  return isCustomTagInline === true ? (
    <Wrapper>
      {localTagList !== null && localTagList.map((item) => <ListStyle key={uuidv4()}>
        <Flex>
          <DivWidth onClick={e => onListClicked(item.label)}> {item.label} </DivWidth>

          {selectedTagName.map(value => <Fragment key={uuidv4()}>
            {value === item.label ? <span onClick={e => onClickCancel(item.label)}>
              <Icon />
            </span> : ''}
          </Fragment>)}
        </Flex>
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
