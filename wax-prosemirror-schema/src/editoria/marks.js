const emDOM = ["em", 0],
  strongDOM = ["strong", 0],
  codeDOM = ["code", 0];

const marks = {
  small_caps: {
    attrs: {
      class: { default: "small-caps" }
    },
    // inclusive: false,
    parseDOM: [
      {
        tag: "span.small-caps",
        getAttrs(dom) {
          return { class: dom.getAttribute("class") };
        }
      }
    ],
    toDOM(node) {
      return ["span", node.attrs, 0];
    }
  },
  source: {
    parseDOM: [{ tag: "cite" }],
    toDOM() {
      return ["cite", 0];
    }
  },
  insertion: {
    attrs: {
      user: {
        default: 0
      },
      username: {
        default: ""
      },
      date: {
        default: 0
      },
      approved: {
        default: true
      }
    },
    inclusive: false,
    group: "track",
    parseDOM: [
      {
        tag: "span.insertion",
        getAttrs(dom) {
          return {
            user: parseInt(dom.dataset.user),
            username: dom.dataset.username,
            date: parseInt(dom.dataset.date),
            inline: true,
            approved: false
          };
        }
      },
      {
        tag: "span.approved-insertion",
        getAttrs(dom) {
          return {
            user: parseInt(dom.dataset.user),
            username: dom.dataset.username,
            date: parseInt(dom.dataset.date),
            inline: true,
            approved: true
          };
        }
      }
    ],
    toDOM(node) {
      return [
        "span",
        {
          class: node.attrs.approved
            ? "approved-insertion"
            : `insertion user-${node.attrs.user}`,
          "data-user": node.attrs.user,
          "data-username": node.attrs.username,
          "data-date": node.attrs.date
        }
      ];
    }
  },
  deletion: {
    attrs: {
      user: {
        default: 0
      },
      username: {
        default: ""
      },
      date: {
        default: 0
      }
    },
    inclusive: false,
    group: "track",
    parseDOM: [
      {
        tag: "span.deletion",
        getAttrs(dom) {
          return {
            user: parseInt(dom.dataset.user),
            username: dom.dataset.username,
            date: parseInt(dom.dataset.date)
          };
        }
      }
    ],
    toDOM(node) {
      return [
        "span",
        {
          class: `deletion user-${node.attrs.user}`,
          "data-user": node.attrs.user,
          "data-username": node.attrs.username,
          "data-date": node.attrs.date
        }
      ];
    }
  },
  format_change: {
    attrs: {
      user: {
        default: 0
      },
      username: {
        default: ""
      },
      date: {
        default: 0
      },
      before: {
        default: []
      },
      after: {
        default: []
      }
    },
    inclusive: false,
    group: "track",
    parseDOM: [
      {
        tag: "span.format-change",
        getAttrs(dom) {
          return {
            user: parseInt(dom.dataset.user),
            username: dom.dataset.username,
            date: parseInt(dom.dataset.date),
            before: parseFormatList(dom.dataset.before),
            after: parseFormatList(dom.dataset.after)
          };
        }
      }
    ],
    toDOM(node) {
      return [
        "span",
        {
          class: `format-change user-${node.attrs.user}`,
          "data-user": node.attrs.user,
          "data-username": node.attrs.username,
          "data-date": node.attrs.date,
          "data-before": JSON.stringify(node.attrs.before),
          "data-after": JSON.stringify(node.attrs.after)
        }
      ];
    }
  }
};
export default marks;
