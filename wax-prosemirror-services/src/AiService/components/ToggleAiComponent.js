import React, { useContext, useMemo, useState } from 'react';
import { WaxContext, MenuButton } from 'wax-prosemirror-core';
import PropTypes from 'prop-types';

const ToggleAiComponent = ({ item }) => {
  const [checked, setChecked] = useState(false);
  const context = useContext(WaxContext);
  const {
    pmViews: { main },
  } = context;

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

  return useMemo(
    () => (
      <MenuButton
        active={checked}
        disabled={!isEditable}
        iconName={item.icon}
        onMouseDown={onMouseDown}
        title={item.title}
      />
    ),
    [checked, isDisabled],
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
