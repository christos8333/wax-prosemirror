import {
  toggleMark,
  wrapIn,
  setBlockType,
  exitCode,
  joinUp,
  joinDown,
  lift,
  selectParentNode
} from "prosemirror-commands";

import { goToNextCell } from "prosemirror-tables";

import {
  wrapInList,
  splitListItem,
  liftListItem,
  sinkListItem
} from "prosemirror-schema-list";

import invisibles, {
  space,
  hardBreak,
  paragraph
} from "@guardian/prosemirror-invisibles";
import { LayoutService } from "./customServices/LayoutService/LayoutService";

import { CreateSchema } from "wax-prosemirror-core";
import {
  LinkToolTipPlugin,
  FindAndReplacePlugin,
  TrackChangePlugin,
  LinkService
} from "wax-prosemirror-plugins";

// import { MainMenuBar, SideMenuBar } from "wax-prosemirror-components";

import { tableNodes, columnResizing, tableEditing } from "prosemirror-tables";
import { EditoriaSchema } from "wax-prosemirror-schema";

const extraNodes = {
  ...tableNodes({
    tableGroup: "block",
    cellContent: "block+"
  })
};

// CreateSchema
EditoriaSchema.nodes = { ...EditoriaSchema.nodes, ...extraNodes };
const schema = new CreateSchema(EditoriaSchema);

// Add Plugins
const plugins = [
  columnResizing(),
  tableEditing(),
  TrackChangePlugin({ options: {} }),
  invisibles([hardBreak()])
  // FindAndReplacePlugin,
  // MenuBarPlugin({
  //   Component: MainMenuBar,
  //   renderArea: "topBar",
  //   menuItems: ["undo", "redo"]
  // }),
  // MenuBarPlugin({
  //   Component: SideMenuBar,
  //   renderArea: "leftSideBar"
  //   //menuItems: ["plain"]
  // })
];

const services = [new LinkService()];

// Add Rules

export { schema, plugins, services };
