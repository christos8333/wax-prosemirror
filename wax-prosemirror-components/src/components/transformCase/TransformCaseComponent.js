import React, { useContext, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { grid } from '@pubsweet/ui-toolkit';
import { v4 as uuid } from 'uuid';
import { WaxContext } from 'wax-prosemirror-core';
import MenuButton from '../../ui/buttons/MenuButton';
import useOnClickOutside from '../../helpers/useOnClickOutside';
import Icon from '../../helpers/Icon';

const Wrapper = styled.div`
  font-size: 0;
  position: relative;
  z-index: 2;
`;

const DropWrapper = styled.div`
  background: white;
  margin-top: ${grid(1)};
  position: absolute;
  top: 32px;
  width: max-content;
`;
const TextTransformCaseComponent = styled.div`
  background: white;
  border: 1px solid gray;
  display: flex;
  flex-direction: column;
`;
const Transformer = styled.div`
  cursor: pointer;
  display: inline-grid;
  height: 25px;
  margin: 5px 10px;
  min-width: 25px;
`;

const StyledIcon = styled(Icon)`
  height: 24px;
  width: 24px;
`;

const TransformCaseComponent = ({ view: { state }, item }) => {
  const { icon, title, select } = item;
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();
  const { activeViewId, activeView, pmViews } = useContext(WaxContext);

  const isEditable = pmViews.main.props.editable(editable => {
    return editable;
  });
  let isDisabled = !select(state, activeViewId, activeView);
  if (!isEditable) isDisabled = true;

  useOnClickOutside(ref, () => setIsOpen(false));

  const transformCaseDropDown = [
    { id: 1, name: 'Upper Case', iconName: 'transformCase' },
    { id: 2, name: 'Lower Case', iconName: 'lowerCaseTransform' },
    { id: 3, name: 'Sentence Case', iconName: 'transformCase' },
    { id: 4, name: 'Title Case', iconName: 'transformCase' },
  ];

  const onClickTransform = (e, id) => {
    switch (id) {
      case 1:
        item.run(activeView.state, activeView.dispatch, 'upperCase');
        break;
      case 2:
        item.run(activeView.state, activeView.dispatch, 'lowerCase');
        break;
      case 3:
        item.run(activeView.state, activeView.dispatch, 'sentenceCase');
        break;
      case 4:
        item.run(activeView.state, activeView.dispatch, 'titleCase');
        break;
      default:
        break;
    }
    setIsOpen(false);
  };

  const renderList = () => {
    return (
      <div>
        {transformCaseDropDown.map(data => (
          <Transformer
            key={uuid()}
            onClick={e => onClickTransform(e, data.id)}
            title={data.name}
          >
            <StyledIcon name={data.iconName} />
          </Transformer>
        ))}
      </div>
    );
  };

  return useMemo(
    () => (
      <Wrapper ref={ref}>
        <MenuButton
          active={isOpen}
          disabled={isDisabled}
          iconName={icon}
          onMouseDown={() => {
            setIsOpen(!isOpen);
          }}
          title={title}
        />

        {isOpen && (
          <DropWrapper>
            <TextTransformCaseComponent
              close={() => {
                setIsOpen(false);
              }}
              item={item}
              key={uuid()}
              view={state}
            >
              {renderList()}
            </TextTransformCaseComponent>
          </DropWrapper>
        )}
      </Wrapper>
    ),
    [isOpen, isDisabled],
  );
};

export default TransformCaseComponent;
