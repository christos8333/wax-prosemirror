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
  const storedTextareaRef = useRef(null);
  const storedTextareaSelectionRef = useRef({ start: null, end: null });
  const { app } = useContext(ApplicationContext);
  const { activeView } = useContext(WaxContext);
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

  // Monitor ProseMirror selection - if from === null, user clicked on textarea
  useEffect(() => {
    if (!activeView) return;

    let lastFrom = null;
    let lastActiveElement = null;

    const checkSelection = () => {
      try {
        const { state } = activeView;
        const { from } = state.selection;
        const activeEl = document.activeElement;

        // Only log/check if something changed
        if (from === lastFrom && activeEl === lastActiveElement) {
          return;
        }

        lastFrom = from;
        lastActiveElement = activeEl;

        // Check if active element is a textarea (regardless of from value)
        // This catches when user clicks on textarea
        const isTextarea =
          activeEl &&
          activeEl !== searchRef.current &&
          (activeEl.tagName === 'TEXTAREA' ||
            (activeEl.tagName === 'INPUT' &&
              (activeEl.type === 'text' ||
                activeEl.type === 'textarea' ||
                !activeEl.type)));

        if (isTextarea) {
          // Store the textarea and its selection
          storedTextareaRef.current = activeEl;
          storedTextareaSelectionRef.current = {
            start:
              activeEl.selectionStart !== null
                ? activeEl.selectionStart
                : activeEl.value.length,
            end:
              activeEl.selectionEnd !== null
                ? activeEl.selectionEnd
                : activeEl.value.length,
          };
        }
        // Note: We don't clear stored textarea when from !== null because
        // clicking the toolbar button will give focus to the editor, but we still
        // want to use the textarea if the user was typing there
      } catch (error) {
        // Ignore errors if view is not ready
      }
    };

    // Check on focus changes and mouse clicks
    const handleFocus = () => {
      setTimeout(checkSelection, 0);
    };

    document.addEventListener('focusin', handleFocus, true);
    document.addEventListener('mousedown', handleFocus, true);

    return () => {
      document.removeEventListener('focusin', handleFocus, true);
      document.removeEventListener('mousedown', handleFocus, true);
    };
  }, [activeView]);

  const insertCharacter = character => {
    const { state, dispatch } = activeView;
    const { from, to } = state.selection;

    // If from === null and we don't have a stored textarea, check if there's a currently focused textarea
    let targetTextarea = storedTextareaRef.current;
    let targetSelection = storedTextareaSelectionRef.current;

    if (
      from === null &&
      (!targetTextarea || !document.body.contains(targetTextarea))
    ) {
      const activeEl = document.activeElement;
      if (
        activeEl &&
        activeEl !== searchRef.current &&
        (activeEl.tagName === 'TEXTAREA' ||
          (activeEl.tagName === 'INPUT' &&
            (activeEl.type === 'text' ||
              activeEl.type === 'textarea' ||
              !activeEl.type)))
      ) {
        targetTextarea = activeEl;
        targetSelection = {
          start:
            activeEl.selectionStart !== null
              ? activeEl.selectionStart
              : activeEl.value.length,
          end:
            activeEl.selectionEnd !== null
              ? activeEl.selectionEnd
              : activeEl.value.length,
        };
      } else {
        // Fallback: query all textareas and find one with a valid selection
        const allTextareas = document.querySelectorAll(
          'textarea, input[type="text"]',
        );
        for (let i = 0; i < allTextareas.length; i++) {
          const el = allTextareas[i];
          if (el !== searchRef.current && document.body.contains(el)) {
            // Check if it has a selection position (indicates it was recently used)
            if (el.selectionStart !== null) {
              targetTextarea = el;
              targetSelection = {
                start: el.selectionStart,
                end: el.selectionEnd,
              };
              break;
            }
          }
        }
      }
    }

    // Check if we have a textarea to use (prioritize this)
    if (
      targetTextarea &&
      document.body.contains(targetTextarea) &&
      targetSelection.start !== null
    ) {
      // Insert into textarea
      const targetElement = targetTextarea;
      const { start, end } = targetSelection;
      const value = targetElement.value || '';
      const newValue =
        value.substring(0, start) + character.unicode + value.substring(end);
      targetElement.value = newValue;

      // Update cursor position
      const newCursorPos = start + character.unicode.length;
      targetElement.focus();
      targetElement.setSelectionRange(newCursorPos, newCursorPos);

      // Update stored selection and reference
      storedTextareaRef.current = targetElement;
      storedTextareaSelectionRef.current = {
        start: newCursorPos,
        end: newCursorPos,
      };

      // Trigger input event to notify React
      const event = new Event('input', { bubbles: true });
      targetElement.dispatchEvent(event);
    } else {
      // Insert into ProseMirror editor
      // Note: if from was null, we need to get a valid selection
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
    }
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
