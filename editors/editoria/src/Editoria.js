import React, { Component } from "react";
import styled, { createGlobalStyle } from "styled-components";
import {
  orderedList,
  bulletList,
  listItem,
  wrapInList,
  splitListItem,
  liftListItem,
  sinkListItem
} from "prosemirror-schema-list";

import {
  tableNodes,
  columnResizing,
  tableEditing,
  goToNextCell
} from "prosemirror-tables";

import { Wax, CreateSchema, CreateShortCuts } from "wax-prosemirror-core";
import { EditoriaSchema } from "wax-prosemirror-schema";
import { MainMenuBar, SideMenuBar } from "wax-prosemirror-components";
import "wax-prosemirror-layouts/layouts/editoria-layout.css";
import "wax-prosemirror-themes/themes/editoria-theme.css";

const extraNodes = {
  ordered_list: {
    ...orderedList,
    content: "list_item+",
    group: "block"
  },
  bullet_list: {
    ...bulletList,
    content: "list_item+",
    group: "block"
  },
  list_item: {
    ...listItem,
    content: "paragraph block*",
    group: "block"
  },
  ...tableNodes({
    tableGroup: "block",
    cellContent: "block+"
  })
};

EditoriaSchema.nodes = { ...EditoriaSchema.nodes, ...extraNodes };
const schema = new CreateSchema(EditoriaSchema);

const plugins = [columnResizing(), tableEditing()];

const shortCuts = {
  Tab: goToNextCell(1),
  "Shift-Tab": goToNextCell(-1),
  Enter: splitListItem(schema.nodes.list_item),
  "Mod-[": liftListItem(schema.nodes.list_item),
  "Mod-]": sinkListItem(schema.nodes.list_item),
  "Shift-Ctrl-8": wrapInList(schema.nodes.bullet_list),
  "Shift-Ctrl-9": wrapInList(schema.nodes.ordered_list)
};

const keys = new CreateShortCuts({ schema: schema, shortCuts: shortCuts });

const options = {
  schema,
  plugins,
  keys
};

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    overflow-y: hidden;
  #root {
    height:100vh;
    width:100vw;
  }
  }
`;
const StyledWax = styled(Wax)`
  .wax-surface-scroll {
    height: ${props => (props.debug ? "50vh" : "100%")};
  }
`;

class Editoria extends Component {
  render() {
    return (
      <React.Fragment>
        <GlobalStyle />
        <StyledWax
          options={options}
          autoFocus
          placeholder="Type Something..."
          theme="editoria"
          layout="editoria"
          debug
          value="<p>hello</p>
          <ul><li>listItem 1</li><li>listItem 2</li><li>listItem 3</li></ul>
          <table>
            <tr> <th>Firstname</th> <th>Lastname</th> <th>Age</th></tr>
           <tr><td>Jill</td><td>Smith</td><td>50</td></tr>
           <tr><td>Eve</td><td>Jackson</td><td>94</td></tr>
         </table>"
          renderLayout={({ editor, ...props }) => (
            <React.Fragment>
              <MainMenuBar {...props} />
              <div className="wax-surface-container">
                <SideMenuBar {...props} />
                {editor}
              </div>
            </React.Fragment>
          )}
        />
      </React.Fragment>
    );
  }
}

export default Editoria;
