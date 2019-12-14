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

import { LayoutService } from "./customServices/LayoutService/LayoutService";

import { CreateSchema } from "wax-prosemirror-core";
import {
  LinkToolTipPlugin,
  FindAndReplacePlugin,
  TrackChangePlugin,
  LinkService
} from "wax-prosemirror-plugins";

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

const services = [new LinkService()];

// Add Rules

export { schema, services };
