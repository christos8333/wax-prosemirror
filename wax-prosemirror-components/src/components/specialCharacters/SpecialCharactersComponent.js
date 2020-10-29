/* eslint react/prop-types: 0 */
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { grid } from '@pubsweet/ui-toolkit';
import { WaxContext } from 'wax-prosemirror-core';
import { each, groupBy, map } from 'lodash';
import Icon from '../../helpers/Icon';
import CharactersList from './CharactersList';

const Wrapper = styled.div`
  width: 400px;
  height: 200px;
  overflow: hidden;
  background: #fff;
  font-size: 14px;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px 0px,
    rgba(9, 30, 66, 0.31) 0px 0px 1px 0px;
  transform-origin: 50% 50% 0px;
  padding: ${grid(2)};
`;

const SearchInput = styled.input`
  font-size: 15px;
  font-weight: 400;
  border-radius: 2px;
  border: none;
  padding: ${grid(1)} ${grid(10)} ${grid(1)} ${grid(1)};
  width: 85%;
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
  overflow-y: sroll;
`;

const LastUsedComponent = styled.div``;

const SpecialCharactersComponent = ({ close }) => {
  const searchRef = useRef(null);
  const [searchValue, setSearchValue] = useState('');
  const GroupedCharacters = groupBy(CharactersList, 'group');
  const onChange = () => {
    setSearchValue(searchRef.current.value);
    console.log(GroupedCharacters);
  };

  return (
    <Wrapper>
      <SearchInput
        ref={searchRef}
        type="text"
        placeholder="Search"
        value={searchValue}
        onChange={onChange}
      />
      <CharactersListComponent>Characters List</CharactersListComponent>
      <LastUsedComponent>Characters Last Used</LastUsedComponent>
    </Wrapper>
  );
};

export default SpecialCharactersComponent;
