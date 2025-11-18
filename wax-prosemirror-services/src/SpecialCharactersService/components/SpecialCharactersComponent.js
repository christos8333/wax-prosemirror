/* eslint-disable consistent-return */
/* eslint react/prop-types: 0 */
import React, {
  useRef,
  useState,
  useContext,
  useCallback,
  useEffect,
} from 'react';
import styled from 'styled-components';
import { filter, groupBy, debounce, isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
import { grid, th, override } from '@pubsweet/ui-toolkit';
import { v4 as uuidv4 } from 'uuid';
import { WaxContext, ApplicationContext } from 'wax-prosemirror-core';

const Wrapper = styled.div`
  width: 400px;
  height: 250px;
  overflow: hidden;
  background: #fff;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px 0px,
    rgba(9, 30, 66, 0.31) 0px 0px 1px 0px;
  transform-origin: 50% 50% 0px;
  padding-bottom: ${grid(2)};
`;
const SearchInputContainer = styled.div`
  padding: ${grid(2)} ${grid(2)} ${grid(2)} ${grid(2)};
`;

const SearchInput = styled.input`
  font-size: 15px;
  font-weight: 400;
  border-radius: 2px;
  border: none;
  padding: ${grid(1)} ${grid(10)} ${grid(1)} ${grid(1)};
  width: 88%;
  box-shadow: inset 0 0 0 1px rgba(27, 43, 75, 0.28);
  ::placeholder {
    color: #d8dae0;
  }
  &:focus {
    outline: none;
  }
`;

const CharactersListComponent = styled.div`
  height: 200px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: hidden;
  padding-top: ${grid(2)};

  ${override('Wax.CharactersListComponent')}
`;

const SpecialCharactersGroup = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: ${grid(2)};

  ${override('Wax.SpecialCharactersGroup')}
`;

const GroupTitle = styled.div`
  font-size: 17px;
  color: ${th('colorPrimary')};
  padding: 0 ${grid(2)} ${grid(2)} ${grid(2)};

  ${override('Wax.GroupTitle')}
`;

const GroupCharacters = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  ${override('Wax.GroupCharacters')}
`;

const SpecialCharacter = styled.div`
  margin: ${grid(1)};
  min-width: 25px;
  height: 25px;
  display: inline-grid;
  background: white;
  cursor: pointer;
  border: 1px solid ${th('colorPrimary')};
  border-radius: 50%;
  &:hover {
    background: ${th('colorPrimary')};
  }
  span {
    font-size: 16px;
    text-align: center;
    padding-top: 3px;
    color: ${th('colorPrimary')};

    &:hover {
      color: #fff;
    }
  }
  ${override('Wax.SpecialCharacterButton')}
`;

const SpecialCharactersComponent = () => {
  const { t, i18n } = useTranslation();

  const searchRef = useRef(null);
  const { app } = useContext(ApplicationContext);
  const { activeView, options, setOption } = useContext(WaxContext);
  const [searchValue, setSearchValue] = useState('');
  const [isFirstRun, setFirstRun] = useState(true);

  const CharactersList = app.config.get('config.SpecialCharactersService');

  const [specialCharactersList, setSpecialCharactersList] = useState(
    CharactersList,
  );
  const onChange = () => {
    setSearchValue(searchRef.current.value);
  };

  const delayedSearch = useCallback(
    debounce(() => searchCharacters(), 300),
    [searchValue],
  );

  const searchCharacters = () => {
    const filtertedSpecialCharacters = filter(CharactersList, value => {
      if (value.name.toLowerCase().includes(searchValue.toLowerCase()))
        return value.name;
      return false;
    });
    setSpecialCharactersList(filtertedSpecialCharacters);
  };

  useEffect(() => {
    delayedSearch();
    if (isFirstRun) {
      setTimeout(() => {
        // searchRef.current.focus();
        setFirstRun(false);
      });
    }
  }, [searchValue, delayedSearch]);

  // Clear activeTextareaId when ProseMirror is focused
  useEffect(() => {
    if (!activeView || !setOption) return;

    const checkProseMirrorFocus = () => {
      try {
        const { state } = activeView;
        const { from } = state.selection;
        const activeEl = document.activeElement;

        // If ProseMirror has focus (from !== null) and activeElement is ProseMirror, clear textarea ID
        if (
          from !== null &&
          activeEl &&
          activeEl.classList &&
          activeEl.classList.contains('ProseMirror') &&
          activeEl !== searchRef.current
        ) {
          setOption({ activeTextareaId: null });
        }
      } catch (error) {
        // Ignore errors if view is not ready
      }
    };

    const handleFocus = () => {
      setTimeout(checkProseMirrorFocus, 10);
    };

    const handleClick = () => {
      setTimeout(checkProseMirrorFocus, 10);
    };

    document.addEventListener('focusin', handleFocus, true);
    document.addEventListener('mousedown', handleClick, true);

    return () => {
      document.removeEventListener('focusin', handleFocus, true);
      document.removeEventListener('mousedown', handleClick, true);
    };
  }, [activeView, setOption]);

  const insertCharacter = character => {
    const { state, dispatch } = activeView;
    const { from, to } = state.selection;
    const activeEl = document.activeElement;

    // Priority 1: If ProseMirror has focus (from !== null), insert into ProseMirror
    // Also check if activeElement is ProseMirror to be sure
    const isProseMirrorFocused =
      from !== null &&
      activeEl &&
      activeEl.classList &&
      activeEl.classList.contains('ProseMirror');

    if (isProseMirrorFocused) {
      // Insert into ProseMirror editor
      dispatch(state.tr.insertText(character.unicode, from, to));
      setTimeout(() => {
        activeView.focus();
      });
      return;
    }

    // Priority 2: If ProseMirror doesn't have focus, check for textarea
    const activeTextareaId = options?.activeTextareaId;

    if (activeTextareaId && from === null) {
      // Find textarea by ID
      const targetTextarea = document.querySelector(
        `[data-textarea-id="${activeTextareaId}"]`,
      );

      if (targetTextarea && document.body.contains(targetTextarea)) {
        // Use current selection if available, otherwise use end of value
        const start =
          targetTextarea.selectionStart !== null
            ? targetTextarea.selectionStart
            : targetTextarea.value.length;
        const end =
          targetTextarea.selectionEnd !== null
            ? targetTextarea.selectionEnd
            : targetTextarea.value.length;

        // Insert into textarea
        const value = targetTextarea.value || '';
        const newValue =
          value.substring(0, start) + character.unicode + value.substring(end);

        // Update cursor position
        const newCursorPos = start + character.unicode.length;

        // Update the value using native setter to bypass React's control temporarily
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLTextAreaElement.prototype,
          'value',
        )?.set;
        if (nativeInputValueSetter) {
          nativeInputValueSetter.call(targetTextarea, newValue);
        } else {
          targetTextarea.value = newValue;
        }

        // Set cursor immediately
        targetTextarea.setSelectionRange(newCursorPos, newCursorPos);

        // Create and dispatch input event to trigger React's onChange
        // Use InputEvent constructor for better compatibility
        let inputEvent;
        try {
          inputEvent = new InputEvent('input', {
            bubbles: true,
            cancelable: true,
            data: character.unicode,
            inputType: 'insertText',
          });
        } catch (e) {
          // Fallback to Event if InputEvent not supported
          inputEvent = new Event('input', { bubbles: true, cancelable: true });
        }
        targetTextarea.dispatchEvent(inputEvent);

        // Ensure focus stays on textarea
        targetTextarea.focus();
        return;
      }
    }

    // Fallback: Insert into ProseMirror editor (if from is null, insert at end)
    if (from === null) {
      // Try to get a valid selection - use the end of the document
      const docSize = state.doc.content.size;
      dispatch(state.tr.insertText(character.unicode, docSize));
    } else {
      dispatch(state.tr.insertText(character.unicode, from, to));
    }
    setTimeout(() => {
      activeView.focus();
    });
  };

  const renderList = () => {
    const lists = [];

    Object.keys(groupBy(specialCharactersList, 'group')).forEach(key => {
      lists.push(
        <SpecialCharactersGroup key={key}>
          <GroupTitle> {key} </GroupTitle>
          <GroupCharacters>
            {groupBy(specialCharactersList, 'group')[key].map(character => {
              return (
                <SpecialCharacter
                  key={uuidv4()}
                  onMouseDown={() => insertCharacter(character)}
                  title={character.name}
                >
                  <span>{character.unicode}</span>
                </SpecialCharacter>
              );
            })}
          </GroupCharacters>
        </SpecialCharactersGroup>,
      );
    });
    return <div>{lists}</div>;
  };

  return (
    <Wrapper>
      <SearchInputContainer>
        <SearchInput
          onChange={onChange}
          placeholder={
            !isEmpty(i18n) && i18n.exists('Wax.SpecialCharacters.Search')
              ? t('Wax.SpecialCharacters.Search')
              : 'Search'
          }
          ref={searchRef}
          type="text"
          value={searchValue}
        />
      </SearchInputContainer>
      <CharactersListComponent>{renderList()}</CharactersListComponent>
    </Wrapper>
  );
};

export default SpecialCharactersComponent;
