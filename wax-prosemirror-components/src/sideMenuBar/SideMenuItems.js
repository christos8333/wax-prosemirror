import React from "react";
import { v4 as uuid } from "uuid";
import { setBlockType } from "prosemirror-commands";

import Button from "../components/button/Button";

export default {
  plain: {
    title: "Change to General Text",
    // content: icons.paragraph,
    content: "General Text",
    // active: blockActive(schema.nodes.paragraph),
    // enable: setBlockType(schema.nodes.paragraph),
    run(state, dispatch) {
      setBlockType(state.config.schema.nodes.paragraph)(state, dispatch);
    },

    select: state => true,
    menu: props => <Button key={uuid()} {...props} />
  }
};
