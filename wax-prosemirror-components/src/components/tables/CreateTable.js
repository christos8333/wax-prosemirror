import React, { useState, useContext } from 'react';
import { WaxContext } from 'wax-prosemirror-core';

import Dropdown from '../../ui/buttons/Dropdown';
import InsertTableTool from '../../ui/tables/InsertTableTool';

const CreateTable = ({ view = {}, item }) => {
  const {
    view: { main },
    activeViewId,
  } = useContext(WaxContext);
  if (item.onlyOnMain) {
    view = main;
  }

  const [showTool, setShowTool] = useState(false);
  const toggleShowTool = () => setShowTool(!showTool);

  const { state, dispatch } = view;
  const { enable, icon, run, select, title } = item;

  const dropComponent = (
    <InsertTableTool
      onGridSelect={colRows => {
        run(colRows, state, dispatch);
      }}
    />
  );

  const isDisabled =
    enable && !enable(state) && !(select && select(state, activeViewId));

  return (
    <Dropdown
      active={showTool}
      dropComponent={dropComponent}
      iconName={icon}
      disabled={isDisabled}
      onClick={toggleShowTool}
      title={title}
    />
  );
};

export default CreateTable;
