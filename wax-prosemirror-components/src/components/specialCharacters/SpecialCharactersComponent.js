/* eslint react/prop-types: 0 */
import React, { useRef, useState, useContext } from 'react';
import styled from 'styled-components';
import { grid } from '@pubsweet/ui-toolkit';
import { v4 as uuidv4 } from 'uuid';
import { WaxContext } from 'wax-prosemirror-core';
import { filter, groupBy } from 'lodash';
import Icon from '../../helpers/Icon';
import CharactersList from './CharactersList';

const Wrapper = styled.div`
  width: 400px;
  height: 220px;
  overflow: hidden;
  background: #fff;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px 0px,
    rgba(9, 30, 66, 0.31) 0px 0px 1px 0px;
  transform-origin: 50% 50% 0px;
`;
const SearchInputContainer = styled.div`
  padding: ${grid(2)};
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
  height: 150px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: hidden;
  padding-top: ${grid(2)};
`;

const SpecialCharactersGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const GroupTitle = styled.div`
  font-size: 16px;
  padding: 0 ${grid(2)} ${grid(2)} ${grid(2)};
`;

const GroupCharacters = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const SpecialCharacter = styled.div`
  margin: ${grid(1)};
  min-width: 25px;
  height: 25px;
  display: inline-grid;
  cursor: pointer;
  border: 1px solid black;
  border-radius: 50%;
  span {
    text-align: center;
    padding-top: 3px;
  }
`;

const LastUsedComponent = styled.div``;

const SpecialCharactersComponent = ({ close }) => {
  const searchRef = useRef(null);
  const { app, view } = useContext(WaxContext);
  const [searchValue, setSearchValue] = useState('');
  const groupedCharacters = groupBy(CharactersList, 'group');
  const [specialCharactersList, setSpecialCharactersList] = useState(
    CharactersList,
  );
  const onChange = () => {
    setSearchValue(searchRef.current.value);
    const filtertedSpecialCharacters = filter(CharactersList, value => {
      console.log(value);
      if (value.name.toLowerCase().includes(searchValue.toLowerCase()))
        return value.name;
      return false;
    });
    setSpecialCharactersList(filtertedSpecialCharacters);
  };

  const insertCharacter = () => {};

  const renderList = () => {
    const lists = [];

    Object.keys(groupBy(specialCharactersList, 'group')).forEach(key => {
      lists.push(
        <SpecialCharactersGroup key={key}>
          <GroupTitle> {key} </GroupTitle>
          <GroupCharacters>
            {groupedCharacters[key].map((item, index) => {
              return (
                <SpecialCharacter key={uuidv4()} onMouseDown={insertCharacter}>
                  <span>{item.unicode}</span>
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
          ref={searchRef}
          type="text"
          placeholder="Search"
          value={searchValue}
          onChange={onChange}
        />
      </SearchInputContainer>
      <CharactersListComponent>{renderList()}</CharactersListComponent>
      <LastUsedComponent>Characters Last Used</LastUsedComponent>
    </Wrapper>
  );
};

export default SpecialCharactersComponent;
