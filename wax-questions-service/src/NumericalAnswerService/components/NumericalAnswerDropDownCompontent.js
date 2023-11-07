/* eslint-disable react/prop-types */
import React, {
  useMemo,
  useContext,
  useState,
  useEffect,
  useRef,
  createRef,
} from 'react';
import styled from 'styled-components';
import {
  WaxContext,
  DocumentHelpers,
  Icon,
  useOnClickOutside,
} from 'wax-prosemirror-core';

const Wrapper = styled.div`
  opacity: ${props => (props.disabled ? '0.4' : '1')};
`;

const DropDownButton = styled.button`
  background: #fff;
  border: none;
  color: #000;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  display: flex;
  position: relative;
  width: 160px;

  span {
    position: relative;
    top: 2px;
  }
`;

const NumericalAnswerDropDownCompontent = ({ view = {}, item }) => {
  const dropDownOptions = [
    {
      label: 'Exact answer with margin of error',
      value: 'exactAnswer',
    },
    {
      label: 'Answer within a range',
      value: 'rangeAnswer',
    },
    {
      label: 'Precise answer',
      value: 'preciseAnswer',
    },
  ];

  const { activeView } = useContext(WaxContext);
  const itemRefs = useRef([]);
  const wrapperRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const isDisabled = false;

  useOnClickOutside(wrapperRef, () => setIsOpen(false));

  useEffect(() => {
    if (isDisabled) setIsOpen(false);
  }, [isDisabled]);

  return <>dropDown</>;
};

export default NumericalAnswerDropDownCompontent;
