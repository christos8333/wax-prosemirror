import React from "react";
import { forEach, map } from "lodash";
import classes from "./MenuBar.css";
import menu from "./menu";

const filtered = (menu, menuItems) =>
  Object.keys(menu)
    .filter(key => menuItems.includes(key))
    .reduce((obj, key) => {
      obj[key] = menu[key];
      return obj;
    }, {});

const setMenuItems = (menu, menuItems) => {
  let items = menuItems;
  if (menuItems.length === 0) {
    forEach(menu, (key, index) => {
      items.push(index);
    });
  }
  return filtered(menu, items);
};

const MainMenuBar = ({
  menuItems = [],
  children,
  state,
  dispatch,
  className,
  fileUpload
}) => (
  <div className={className}>
    {
      <span className={classes.group}>
        {map(setMenuItems(menu, menuItems), item =>
          item.menu({ state, dispatch, item, fileUpload })
        )}
      </span>
    }
  </div>
);

export default MainMenuBar;
