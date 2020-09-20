import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import MenuButton from './MenuButton';

const Wrapper = styled.div`
  position: relative;
`;

const DropWrapper = styled.div`
  margin-top: 4px;
  position: absolute;
`;

const Dropdown = props => {
  const { className, dropComponent, iconName, label } = props;

  const [isOpen, setIsOpen] = useState(false);

  // const dropElementRef = useRef(null);

  return (
    <Wrapper className={className}>
      <MenuButton
        active={isOpen}
        iconName={iconName}
        label={label}
        onClick={() => setIsOpen(!isOpen)}
      />

      {isOpen && <DropWrapper>{dropComponent}</DropWrapper>}
    </Wrapper>
  );
};

Dropdown.propTypes = {
  dropComponent: PropTypes.node.isRequired,
  iconName: PropTypes.string,
  label: PropTypes.string,
};

Dropdown.defaultProps = {
  iconName: null,
  label: null,
};

export default Dropdown;
