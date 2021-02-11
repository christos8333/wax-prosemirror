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

const InlineHeader = styled.div`
  color: #4b5871;
  display: block;
  font-size: 16px;
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

const ItemWrapper = styled.div`
  width: 100%;
`;

const initialArr = [];

const CustomTagInlineOverlayComponent = ({ mark, setPosition, position }) => {
  const ref = useRef(null);

  const [inputValue, setInputValue] = useState('');
  const [selectedTagNames, setSelectedTagNames] = useState([]);

  const [isCustomTagInline, setCustomTag] = useState(
    JSON.parse(localStorage.getItem('isInline')),
  );

  const {
    app,
    view: { main },
  } = useContext(WaxContext);
  const { state, dispatch } = main;
  const {
    selection: { $from, $to },
  } = state;

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

  const onChangeTagName = () => {
    setInputValue(ref.current.value);
  };

  const handleKeyDown = event => {
    if (event.key === 'Enter' || event.which === 13) {
      onClickAdd();
    }
  };

  const onClickAdd = () => {
    if (inputValue.trim() === '') return;

    configTags.push({ label: inputValue, tagType: 'inline' });
    setAllTags(configTags);
    saveTags(configTags);
    setInputValue('');
    if (ref.current) ref.current.focus();
    setInputValue('');
  };

  const addToSelection = item => {
    const tagNames = mark ? mark.attrs.tagNames : [];
    tagNames.push(item);

    dispatch(
      state.tr.addMark(
        $from.pos,
        $to.pos,
        state.schema.marks.customTagInline.create({
          ...((mark && mark.attrs) || {}),
          tagNames,
          class: tagNames.toString(),
        }),
      ),
    );
  };

  const removeFromSelection = tagName => {
    // if (finalTag.length === 0) {
    //   dispatch(
    //     state.tr.removeMark(
    //       $from.pos,
    //       $to.pos,
    //       state.schema.marks.customTagInline,
    //     ),
    //   );
    // } else {
    //   dispatch(
    //     state.tr.addMark(
    //       $from.pos,
    //       $to.pos,
    //       state.schema.marks.customTagInline.create({
    //         tagNames: JSON.stringify(finalTag),
    //         class: classNames,
    //       }),
    //     ),
    //   );
    // }
  };

  useEffect(() => {
    setCustomTag(JSON.parse(localStorage.getItem('isInline')));
  }, []);

  const inlineTags = allTags.filter(tag => {
    return tag.tagType === 'inline';
  });

  return isCustomTagInline === true ? (
    <Wrapper>
      <InlineHeader>Custom Inline</InlineHeader>
      {inlineTags.map(item => (
        <ListStyle key={uuidv4()}>
          <Flex>
            <ItemWrapper onMouseDown={() => addToSelection(item.label)}>
              {item.label}
            </ItemWrapper>
            {/* {console.log(mark)} */}
            {/* {selectedTagNames.map(value => {
              return (
                <Fragment key={uuidv4()}>
                  {value === item.label ? (
                    <span
                      aria-hidden="true"
                      onClick={() => removeFromSelection(item.label)}
                      role="button"
                    >
                      <IconRemove name="removeTag" />
                    </span>
                  ) : (
                    ''
                  )}
                </Fragment>
              );
            })} */}
          </Flex>
        </ListStyle>
      ))}
      <CustomWrapper>
        <Input
          onChange={onChangeTagName}
          onKeyPress={handleKeyDown}
          ref={ref}
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
