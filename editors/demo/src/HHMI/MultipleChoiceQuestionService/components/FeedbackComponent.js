/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useRef, useState } from 'react';
import styled from 'styled-components';
import { TextSelection } from 'prosemirror-state';
import { WaxContext } from 'wax-prosemirror-core';
import EditorComponent from './EditorComponent';

export default ({ node, view, getPos }) => {
  console.log(node, 'feedback');
  return <EditorComponent node={node} view={view} getPos={getPos} />;
};
