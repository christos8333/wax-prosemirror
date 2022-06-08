import React, { useContext, useMemo, useRef, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { WaxContext } from 'wax-prosemirror-core';
import { v4 as uuidv4 } from 'uuid';
import MenuButton from '../../ui/buttons/MenuButton';

const OENToolGroup = ({ item }) => {
  return useMemo(
    () => (
      <>
        <span>Tools</span>
      </>
    ),
    [],
  );
};

export default OENToolGroup;
