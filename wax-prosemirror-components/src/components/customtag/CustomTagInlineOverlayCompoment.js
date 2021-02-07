/* eslint react/prop-types: 0 */
import React, {
  useRef,
  useEffect,
  useState,
  useContext,
  Fragment,
} from 'react';
import styled from 'styled-components';
import { grid, th } from '@pubsweet/ui-toolkit';
import { WaxContext } from 'wax-prosemirror-core';
import { DocumentHelpers } from 'wax-prosemirror-utilities';
import { v4 as uuidv4 } from 'uuid';

import Icon from '../../helpers/Icon';

const IconRemove = styled(Icon)`
  height: 10px;
  width: 10px;
`;

const Wrapper = styled.div`
  background: #fff;
  border-radius: 1.03093% / 8%;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px 0px,
    rgba(9, 30, 66, 0.31) 0px 0px 1px 0px;
  padding: ${grid(2)} ${grid(1)} ${grid(2)} ${grid(2)};
  transform-origin: 50% 50% 0px;
`;

const CustomWrapper = styled.div`
  display: inline-block;
  margin-right: 12px;
  width: 200px;
`;

const Input = styled.input`
  outline: none;
  width: calc(100% - 8px);

  :focus {
    outline: none;
  }
`;

const ButtonGroup = styled.div`
  display: inline-block;
`;

const StyledButton = styled.button`
  background: ${th('colorPrimary')};
  color: #fff;
  cursor: pointer;
  margin-right: 10px;
`;

const ListStyle = styled.div`
  cursor: pointer;
  margin: 5px 7px 7px 0px;
  padding: 2px 3px;
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
  const [inputValue, setInputValue] = useState('');
  const [selectedTagName, setSelectedTagName] = useState([]);
  const localTagList = JSON.parse(localStorage.getItem('tagList'));
  const [isCustomTagInline, setCustomTag] = useState(
    JSON.parse(localStorage.getItem('isInline')),
  );
  const {
    view: { main },
  } = useContext(WaxContext);
  const { state, dispatch } = main;
  const {
    selection: { $from, $to },
  } = state;

  const onChangeTagName = e => {
    setInputValue(ref.current.value);
  };

  const onClickAdd = () => {
    const localItem = localStorage.getItem('isInline');
    let tagNameList = [];
    if (localStorage.getItem('tagList') === null) {
      tagNameList.push({ label: inputValue, type: 'inline' });
      localStorage.setItem('tagList', JSON.stringify(tagNameList));
    } else {
      tagNameList = JSON.parse(localStorage.getItem('tagList'));
      tagNameList.push({ label: inputValue, type: 'inline' });
      localStorage.clear('tagList');
      localStorage.setItem('tagList', JSON.stringify(tagNameList));
      localStorage.setItem('isInline', localItem);
    }
    setInputValue('');
  };

  const onListClicked = item => {
    const tagNames = [];
    let finalTag = [];
    let isExist = false;
    let classNames = 'custom-tag-inline ';
    const mark = DocumentHelpers.findMark(
      state,
      state.schema.marks.customTagInline,
      true,
    );

    tagNames.push(item);
    if (mark.length > 0) {
      mark.forEach(itemArtt => {
        const classArray = itemArtt.attrs.class.split(' ');
        classArray.forEach(classData => {
          item.replace(/ /g, '-');
          if (classData === item.replace(/ /g, '-')) {
            isExist = true;
          }
        });
        const parseArray = JSON.parse(itemArtt.attrs.tagNames);
        classNames = `${itemArtt.attrs.class} `;
        finalTag = tagNames.concat(parseArray);
      });
    } else {
      finalTag.push(item);
    }

    if (isExist) return;

    setSelectedTagName(oldArray => [...oldArray, item]);
    item = classNames + item.replace(/ /g, '-');

    dispatch(
      state.tr.addMark(
        $from.pos,
        $to.pos,
        state.schema.marks.customTagInline.create({
          tagNames: JSON.stringify(finalTag),
          class: item,
        }),
      ),
    );
  };

  const onClickCancel = tagName => {
    let classNames = '';
    let classArray = [];
    let tagArray = [];
    let finalTag = [];
    const mark = DocumentHelpers.findMark(
      state,
      state.schema.marks.customTagInline,
      true,
    );

    setSelectedTagName(finalTag);
    tagName = tagName.replace(/ /g, '-');
    if (mark.length > 0) {
      mark.forEach(itemArtt => {
        classNames = '';
        classArray = itemArtt.attrs.class.split(' ');
        tagArray = JSON.parse(itemArtt.attrs.tagNames);
        classArray.forEach(classData => {
          if (classData !== tagName) {
            classNames = classNames + ' ' + classData;
          }
        });
        tagArray.forEach(tag => {
          if (tag.replace(/ /g, '-') !== tagName) {
            finalTag.push(tag);
          }
        });
      });
      setSelectedTagName(
        finalTag.filter((item, index) => finalTag.indexOf(item) === index),
      );
      if (finalTag.length === 0) {
        dispatch(
          state.tr.removeMark(
            $from.pos,
            $to.pos,
            state.schema.marks.customTagInline,
          ),
        );
      } else {
        dispatch(
          state.tr.addMark(
            $from.pos,
            $to.pos,
            state.schema.marks.customTagInline.create({
              tagNames: JSON.stringify(finalTag),
              class: classNames,
            }),
          ),
        );
      }
    }
  };

  useEffect(() => {
    setCustomTag(JSON.parse(localStorage.getItem('isInline')));
  });

  return isCustomTagInline === true ? (
    <Wrapper>
      {localTagList !== null &&
        localTagList.map(item => (
          <ListStyle key={uuidv4()}>
            <Flex>
              <DivWidth onClick={e => onListClicked(item.label)}>
                {item.label}
              </DivWidth>

              {selectedTagName.map(value => (
                <Fragment key={uuidv4()}>
                  {value === item.label ? (
                    <span
                      aria-hidden="true"
                      onClick={() => onClickCancel(item.label)}
                      role="button"
                    >
                      <IconRemove name="removeTag" />
                    </span>
                  ) : (
                    ''
                  )}
                </Fragment>
              ))}
            </Flex>
          </ListStyle>
        ))}
      <CustomWrapper ref={ref}>
        <Input
          onChange={() => onChangeTagName()}
          type="text"
          value={inputValue}
        />
      </CustomWrapper>

      <ButtonGroup>
        <StyledButton onClick={onClickAdd} type="button">
          Add
        </StyledButton>
      </ButtonGroup>
    </Wrapper>
  ) : null;
};
export default CustomTagInlineOverlayComponent;
