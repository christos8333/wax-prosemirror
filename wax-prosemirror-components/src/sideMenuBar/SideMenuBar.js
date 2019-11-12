import React from "react";
import { forEach, map } from "lodash";
import SideMenuItems from "./SideMenuItems";

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

const SideMenuBar = ({
  menuItems = [],
  children,
  view,
  className,
  fileUpload
}) => (
  <div>
    <div>
      <div>
        {
          <span>
            {map(setMenuItems(SideMenuItems, menuItems), item =>
              item.menu({ view, item, fileUpload })
            )}
          </span>
        }
      </div>
    </div>
  </div>
);

export default SideMenuBar;
