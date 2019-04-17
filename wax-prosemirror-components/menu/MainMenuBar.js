import React from "react";
import map from "lodash/map";
import classes from "../../css/MenuBar.css";
import menu from "../../config/menu";

const filtered = (menu, menuItems) =>
  Object.keys(menu)
    .filter(key => menuItems.includes(key))
    .reduce((obj, key) => {
      obj[key] = menu[key];
      return obj;
    }, {});

const MainMenuBar = ({
  menuItems,
  children,
  state,
  dispatch,
  className,
  fileUpload
}) => (
  <div className={className}>
    {children && <span className={classes.group}>{children}</span>}
    {
      <span className={classes.group}>
        {map(filtered(menu, menuItems), item =>
          item.menu({ state, dispatch, item, fileUpload })
        )}
      </span>
    }
  </div>
);

export default MainMenuBar;
