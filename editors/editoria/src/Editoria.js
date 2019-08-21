import React, { Component } from "react";
import styled, { createGlobalStyle } from "styled-components";
import {
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

import { emDash, ellipsis } from "prosemirror-inputrules";
import invisibles, {
  space,
  hardBreak,
  paragraph
} from "@guardian/prosemirror-invisibles";

import { Wax, CreateSchema, CreateShortCuts } from "wax-prosemirror-core";
import { EditoriaSchema } from "wax-prosemirror-schema";
import { LinkToolTipPlugin, TrackChangePlugin } from "wax-prosemirror-plugins";
import { MainMenuBar, SideMenuBar } from "wax-prosemirror-components";
import "wax-prosemirror-layouts/layouts/editoria-layout.css";
import "wax-prosemirror-layouts/vars/wax-editoria-vars.css";
import "wax-prosemirror-themes/themes/editoria-theme.css";

const extraNodes = {
  ...tableNodes({
    tableGroup: "block",
    cellContent: "block+"
  })
};

EditoriaSchema.nodes = { ...EditoriaSchema.nodes, ...extraNodes };
const schema = new CreateSchema(EditoriaSchema);

const plugins = [
  columnResizing(),
  tableEditing(),
  // LinkToolTipPlugin,
  TrackChangePlugin({ options: {} }),
  invisibles([hardBreak()])
];

const shortCuts = {
  Tab: goToNextCell(1),
  "Shift-Tab": goToNextCell(-1),
  Enter: splitListItem(schema.nodes.list_item),
  "Mod-[": liftListItem(schema.nodes.list_item),
  "Mod-]": sinkListItem(schema.nodes.list_item),
  "Shift-Ctrl-8": wrapInList(schema.nodes.bullet_list),
  "Shift-Ctrl-9": wrapInList(schema.nodes.ordered_list)
};

const keys = new CreateShortCuts({ schema, shortCuts });

const rules = [emDash, ellipsis];
const options = {
  schema,
  plugins,
  keys,
  rules
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

const renderImage = file => {
  const reader = new FileReader();
  return new Promise((accept, fail) => {
    reader.onload = () => accept(reader.result);
    reader.onerror = () => fail(reader.error);
    // Some extra delay to make the asynchronicity visible
    setTimeout(() => reader.readAsDataURL(file), 150);
  });
};

const user = {
  userId: "1234",
  username: "demo"
};

const text = `<ul><li>sl jlkf jlfkjdf</li><li>sl jlkf jlfkjdf</li></ul><h1>this is a title</h1><p class="paragraph" data-track="[{&quot;type&quot;:&quot;block_change&quot;,&quot;user&quot;:&quot;editor.user.id&quot;,&quot;username&quot;:&quot;editor.user.username&quot;,&quot;date&quot;:26069447,&quot;before&quot;:{&quot;type&quot;:&quot;author&quot;,&quot;attrs&quot;:{&quot;class&quot;:&quot;author&quot;}}}]">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p><p class="author">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>`;

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
          fileUpload={file => renderImage(file)}
          debug
          TrackChange
          value={text}
          user={user}
        >
          {({ editor, view, ...props }) => (
            <React.Fragment>
              <MainMenuBar view={view} {...props} />
              <div className="wax-surface-container">
                <SideMenuBar view={view} {...props} />
                {editor}
              </div>
            </React.Fragment>
          )}
        </StyledWax>
      </React.Fragment>
    );
  }
}

export default Editoria;
