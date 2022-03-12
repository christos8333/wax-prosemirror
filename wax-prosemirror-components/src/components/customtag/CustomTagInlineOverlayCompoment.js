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
import { v4 as uuidv4 } from 'uuid';
import Icon from '../../helpers/Icon';

const IconRemove = styled(Icon)`
  cursor: pointer;
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
  margin: 5px 7px 7px 0px;
  padding: 2px 3px;
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ItemActive = styled.div`
  color: #006f19;
  width: 90%;
`;

const Item = styled.div`
  cursor: pointer;
  width: 100%;
`;

const initialArr = [];

const CustomTagInlineOverlayComponent = ({ mark, setPosition, position }) => {
  const ref = useRef(null);

  const [inputValue, setInputValue] = useState('');

  const [isCustomTagInline, setCustomTag] = useState(
    JSON.parse(localStorage.getItem('isInline')),
  );

  const {
    app,
    pmViews: { main },
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
    customTagsConfig && customTagsConfig.updateTags
      ? customTagsConfig.updateTags
      : () => true;
  const [allTags, setAllTags] = useState(configTags);

  let image = false;
  state.doc.nodesBetween($from.pos, $to.pos, (node, pos) => {
    if (node.type.name === 'image') {
      image = true;
    }
  });

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
    saveTags({ label: inputValue, tagType: 'inline' });
    setInputValue('');
    if (ref.current) ref.current.focus();
    setInputValue('');
  };

  const addToSelection = item => {
    const tags = mark ? mark.attrs.tags : [];
    tags.push(item);

    dispatch(
      state.tr.addMark(
        $from.pos,
        $to.pos,
        state.schema.marks.customTagInline.create({
          ...((mark && mark.attrs) || {}),
          tags,
          class: tags.toString().replace(/ /g, '-').toLowerCase(),
        }),
      ),
    );
  };

  const removeFromSelection = tagName => {
    const { tags } = mark.attrs;
    if (tags.length === 1) {
      dispatch(
        state.tr.removeMark(
          mark.from,
          mark.to,
          state.schema.marks.customTagInline,
        ),
      );
    } else {
      const index = tags.indexOf(tagName);
      if (index > -1) {
        tags.splice(index, 1);
        dispatch(
          state.tr.addMark(
            mark.from,
            mark.to,
            state.schema.marks.customTagInline.create({
              ...((mark && mark.attrs) || {}),
              tags,
              class: tags.toString().replace(/ /g, '-').toLowerCase(),
            }),
          ),
        );
      }
    }
  };

  useEffect(() => {
    setCustomTag(JSON.parse(localStorage.getItem('isInline')));
  }, []);

  const inlineTags = allTags.filter(tag => {
    return tag.tagType === 'inline';
  });

  const disabledStyles = {
    cursor: 'default',
    opacity: '0.4',
    pointerEvents: 'none',
  };

  const styles = $from.pos === $to.pos ? disabledStyles : {};

  return isCustomTagInline === true && !image ? (
    <Wrapper>
      <InlineHeader>Custom Inline</InlineHeader>
      {inlineTags.map(item => {
        return (
          <ListStyle key={uuidv4()}>
            <Flex>
              {mark && mark.attrs.tags.includes(item.label) ? (
                <ItemActive>{item.label}</ItemActive>
              ) : (
                <Item
                  onMouseDown={() => addToSelection(item.label)}
                  style={styles}
                >
                  {item.label}
                </Item>
              )}

              {mark &&
                mark.attrs.tags.map(value => {
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
                      ) : null}
                    </Fragment>
                  );
                })}
            </Flex>
          </ListStyle>
        );
      })}
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
