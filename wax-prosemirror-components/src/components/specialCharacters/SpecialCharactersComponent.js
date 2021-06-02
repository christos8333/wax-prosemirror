/* eslint react/prop-types: 0 */
import React, {
  useRef,
  useState,
  useContext,
  useCallback,
  useEffect,
} from 'react';
import styled from 'styled-components';
import { grid, th, override } from '@pubsweet/ui-toolkit';
import { v4 as uuidv4 } from 'uuid';
import { WaxContext } from 'wax-prosemirror-core';
import { filter, groupBy, debounce } from 'lodash';
import CharactersList from './CharactersList';

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
  background: ${th('colorPrimary')}
  cursor: pointer;
  border: 1px solid ${th('colorPrimary')};
  border-radius: 50%;
  &:hover {
    background: white;
  }
  span {
    font-size: 16px;
    text-align: center;
    padding-top: 3px;
    color: white;

    &:hover {
      color: ${th('colorPrimary')};
    }
  }
    ${override('Wax.SpecialCharacterButton')}

`;

// const LastUsedComponent = styled.div`
//   display: flex;
//   flex-direction: row;
//   height: 30px;
// `;

const SpecialCharactersComponent = ({ close }) => {
  const searchRef = useRef(null);
  const { activeView } = useContext(WaxContext);
  const [searchValue, setSearchValue] = useState('');
  const [isFirstRun, setFirstRun] = useState(true);

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
        searchRef.current.focus();
        setFirstRun(false);
      });
    }
  }, [searchValue, delayedSearch]);

  const insertCharacter = character => {
    const { state, dispatch } = activeView;
    const { from, to } = state.selection;
    dispatch(state.tr.insertText(character.unicode, from, to));
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
            {groupBy(specialCharactersList, 'group')[key].map(
              (character, index) => {
                return (
                  <SpecialCharacter
                    key={uuidv4()}
                    onMouseDown={() => insertCharacter(character)}
                    title={character.name}
                  >
                    <span>{character.unicode}</span>
                  </SpecialCharacter>
                );
              },
            )}
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
          ref={searchRef}
          type="text"
          placeholder="Search"
          value={searchValue}
          onChange={onChange}
        />
      </SearchInputContainer>
      <CharactersListComponent>{renderList()}</CharactersListComponent>
    </Wrapper>
  );
};

export default SpecialCharactersComponent;
