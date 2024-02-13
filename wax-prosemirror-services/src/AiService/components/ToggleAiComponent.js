import React, { useContext, useMemo } from 'react';
import { WaxContext, MenuButton } from 'wax-prosemirror-core';
import PropTypes from 'prop-types';

const ToggleAiComponent = ({ item }) => {
  const { app, pmViews } = useContext(WaxContext);
  const enableService = app.config.get('config.AskAiContentService');

  let isDisabled = false;
  const { main } = pmViews;
  const isEditable = main.props.editable(editable => {
    return editable;
  });

  if (!isEditable) isDisabled = true;

  return useMemo(
    () =>
      enableService.AiOn ? (
        <MenuButton
          active={false}
          disabled={!isEditable}
          iconName={item.icon}
          title={item.title}
        />
      ) : null,
    [enableService.AiOn, isDisabled],
  );
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
