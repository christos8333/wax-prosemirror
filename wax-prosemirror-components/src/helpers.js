const filtered = (menu, menuItems) =>
  Object.keys(menu)
    .filter(key => menuItems.includes(key))
    .reduce((obj, key) => {
      obj[key] = menu[key];
      return obj;
    }, {});

const setMenuItems = (allMenuItems, menuItems) => {
  if (menuItems.length === 0) return allMenuItems;
  return filtered(allMenuItems, menuItems);
};

export { setMenuItems };
