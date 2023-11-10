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
  DocumentHelpers,
  WaxContext,
  Icon,
  useOnClickOutside,
} from 'wax-prosemirror-core';

const Wrapper = styled.div`
  opacity: ${props => (props.disabled ? '0.4' : '1')};
`;

const DropDownButton = styled.button`
  background: #fff;
  border: 1px solid #f4f4f4;
  color: #000;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  display: flex;
  position: relative;
  top: 2px;
  left: 3px;
  width: 235px;
  height: 26px;

  span {
    position: relative;
    top: 12px;
  }
`;

const DropDownMenu = styled.div`
  visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
  background: #fff;
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  box-shadow: 0 0.2rem 0.4rem rgb(0 0 0 / 10%);
  margin: 2px auto auto;
  position: absolute;
  width: 235px;
  max-height: 150px;
  overflow-y: auto;
  z-index: 2;

  span {
    cursor: pointer;
    border-bottom: 1px solid #f4f4f4;
    font-size: 11px;
    padding: 8px 10px;
  }

  span:focus,
  span:hover {
    background: #f2f9fc;
    outline: 2px solid #f2f9fc;
  }
`;

const StyledIcon = styled(Icon)`
  height: 18px;
  width: 18px;
  margin-left: auto;
  position: relative;
  top: 1px;
`;

const NumericalAnswerDropDownCompontent = ({ nodeId }) => {
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

  const context = useContext(WaxContext);
  const {
    activeView,
    pmViews: { main },
  } = context;

  const itemRefs = useRef([]);
  const wrapperRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  useOnClickOutside(wrapperRef, () => setIsOpen(false));

  const [label, setLabel] = useState('Select Type');

  const isEditable = main.props.editable(editable => {
    return editable;
  });

  useEffect(() => {
    setLabel('Select Type');
    dropDownOptions.forEach(option => {
      if (context.options?.numericalAnswer === option.value) {
        setLabel(option.label);
      }
    });
  }, []);

  let isDisabled = false;

  useEffect(() => {
    if (isDisabled) setIsOpen(false);
  }, [isDisabled]);

  const openCloseMenu = () => {
    if (!isDisabled) setIsOpen(!isOpen);
    if (isOpen)
      setTimeout(() => {
        activeView.focus();
      });
  };

  const onKeyDown = (e, index) => {
    e.preventDefault();
    // arrow down
    if (e.keyCode === 40) {
      if (index === itemRefs.current.length - 1) {
        itemRefs.current[0].current.focus();
      } else {
        itemRefs.current[index + 1].current.focus();
      }
    }

    // arrow up
    if (e.keyCode === 38) {
      if (index === 0) {
        itemRefs.current[itemRefs.current.length - 1].current.focus();
      } else {
        itemRefs.current[index - 1].current.focus();
      }
    }

    // enter
    if (e.keyCode === 13) {
      itemRefs.current[index].current.click();
    }

    // ESC
    if (e.keyCode === 27) {
      setIsOpen(false);
    }
  };

  const SaveTypeToNode = option => {
    const allNodes = getNodes(context.pmViews.main);
    allNodes.forEach(singleNode => {
      if (singleNode.node.attrs.id === nodeId) {
        context.pmViews.main.dispatch(
          context.pmViews.main.state.tr.setNodeMarkup(
            singleNode.pos,
            undefined,
            {
              ...singleNode.node.attrs,
              answerType: option,
              answersExact: [],
              answersRange: [],
              answersPrecise: [],
            },
          ),
        );
      }
    });
  };

  const onChange = option => {
    context.setOption({ [nodeId]: { numericalAnswer: option.value } });
    setLabel(option.label);
    openCloseMenu();
    SaveTypeToNode(option.value);
    activeView.focus();
  };

  const NumericalAnswerDropDown = useMemo(
    () => (
      <Wrapper disabled={isDisabled} ref={wrapperRef}>
        <DropDownButton
          aria-controls="numerical-answer-list"
          aria-expanded={isOpen}
          aria-haspopup
          disabled={isDisabled}
          onKeyDown={e => {
            if (e.keyCode === 40) {
              itemRefs.current[0].current.focus();
            }
            if (e.keyCode === 27) {
              setIsOpen(false);
            }
            if (e.keyCode === 13 || e.keyCode === 32) {
              setIsOpen(true);
            }
          }}
          onMouseDown={openCloseMenu}
          type="button"
        >
          <span>{label}</span> <StyledIcon name="expand" />
        </DropDownButton>
        <DropDownMenu
          aria-label="Choose an item type"
          id="numerical-list"
          isOpen={isOpen}
          role="menu"
        >
          {dropDownOptions.map((option, index) => {
            itemRefs.current[index] = itemRefs.current[index] || createRef();
            return (
              <span
                key={option.value}
                onClick={() => onChange(option)}
                onKeyDown={e => onKeyDown(e, index)}
                ref={itemRefs.current[index]}
                role="menuitem"
                tabIndex="-1"
              >
                {option.label}
              </span>
            );
          })}
        </DropDownMenu>
      </Wrapper>
    ),
    [isDisabled, isOpen, label],
  );

  return NumericalAnswerDropDown;
};

const getNodes = view => {
  const allNodes = DocumentHelpers.findBlockNodes(view.state.doc);
  const numericalAnswerpContainerNodes = [];
  allNodes.forEach(node => {
    if (node.node.type.name === 'numerical_answer_container') {
      numericalAnswerpContainerNodes.push(node);
    }
  });
  return numericalAnswerpContainerNodes;
};

export default NumericalAnswerDropDownCompontent;
