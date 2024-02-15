import React, { useContext, useEffect, useMemo, useState } from 'react';
import { WaxContext, MenuButton } from 'wax-prosemirror-core';
import PropTypes from 'prop-types';

const ToggleAiComponent = ({ item }) => {
  const [checked, setChecked] = useState(false);
  const context = useContext(WaxContext);
  const {
    app,
    pmViews: { main },
  } = context;

  const enableService = app.config.get('config.AskAiContentService');

  let isDisabled = false;
  const isEditable = main.props.editable(editable => {
    return editable;
  });

  if (!isEditable) isDisabled = true;

  const onMouseDown = () => {
    context.setOption({ AiOn: !checked });
    setChecked(!checked);
    main.dispatch(main.state.tr.setMeta('addToHistory', false));
    main.focus();
  };

  useEffect(() => {
    setChecked(false);
    context.setOption({ AiOn: false });
    main.dispatch(main.state.tr.setMeta('addToHistory', false));
  }, [checked && main.state.selection.from === main.state.selection.to]);

  return useMemo(
    () =>
      enableService.AiOn ? (
        <MenuButton
          active={checked}
          disabled={!isEditable}
          iconName={item.icon}
          onMouseDown={onMouseDown}
          title={item.title}
        />
      ) : null,
    [checked, isDisabled, enableService.AiOn],
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
