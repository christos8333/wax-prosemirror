import React, { useContext } from 'react';
import { WaxContext, MenuButton } from 'wax-prosemirror-core';
import PropTypes from 'prop-types';

const ToggleAiComponent = ({ item }) => {
  const context = useContext(WaxContext);
  const {
    options: { AiOn },
  } = context;

  return AiOn ? (
    <MenuButton
      active={false}
      disabled={false}
      iconName={item.icon}
      title={item.title}
    />
  ) : null;
};

ToggleAiComponent.propTypes = {
  item: PropTypes.shape({
    icon: PropTypes.string,
    title: PropTypes.string,
  }),
};

ToggleAiComponent.defaultProps = {
  item: {
    icon: '',
    title: '',
  },
};

export default ToggleAiComponent;
