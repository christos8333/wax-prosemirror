import React from "react";
import { forEach, map } from "lodash";
import MainMenuBarItems from "./MainMenuBarItems";

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
  view,
  className,
  fileUpload
}) => (
  <div className={`${className} main-menu-container`}>
    <div className="main-menu-inner">
      <div className="main-menu">
        {
          <span>
            {map(setMenuItems(MainMenuBarItems, menuItems), item =>
              item.menu({ view, item, fileUpload })
            )}
          </span>
        }
      </div>
    </div>
  </div>
);

export default MainMenuBar;
