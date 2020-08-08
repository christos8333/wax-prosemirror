'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var waxProsemirrorUtilities = require('wax-prosemirror-utilities');

const code = {
  parseDOM: {
    tag: "code"
  },

  toDOM(hook, next) {
    hook.value = ["code", 0];
    next();
  }

};

const strong = {
  parseDOM: [{
    tag: "strong"
  }, {
    tag: "b",
    getAttrs: node => node.style.fontWeight != "normal" && null
  } // {
  //   style: "font-weight",
  //   getAttrs: value => /^(bold(er)?|[5-9]\d{2,})$/.test(value) && null
  // }
  ],

  toDOM(hook, next) {
    hook.value = ["strong", 0];
    next();
  }

};

const link = {
  attrs: {
    href: {
      default: null
    },
    rel: {
      default: ""
    },
    target: {
      default: "blank"
    },
    title: {
      default: null
    }
  },
  inclusive: false,
  parseDOM: [{
    tag: "a[href]",

    getAttrs(hook, next) {
      const href = hook.dom.getAttribute("href");
      const target = href && href.indexOf("#") === 0 ? "" : "blank";
      Object.assign(hook, {
        href: hook.dom.getAttribute("href"),
        title: hook.dom.getAttribute("title"),
        target
      });
      next();
    }

  }],

  toDOM(hook, next) {
    hook.value = ["a", hook.node.attrs, 0];
    next();
  }

};

const em = {
  parseDOM: [{
    tag: "i"
  }, {
    tag: "em"
  }, {
    style: "font-style=italic"
  }],

  toDOM(hook, next) {
    hook.value = ["em", 0];
    next();
  }

};

const subscript = {
  excludes: "superscript",
  parseDOM: [{
    tag: "sub"
  }, {
    style: "vertical-align=sub"
  }],

  toDOM(hook, next) {
    hook.value = ["sub"];
    next();
  }

};

const superscript = {
  excludes: "subscript",
  parseDOM: [{
    tag: "sup"
  }, {
    style: "vertical-align=super"
  }],
  toDOM: (hook, next) => {
    hook.value = ["sup"];
    next();
  }
};

const strikethrough = {
  parseDOM: [{
    tag: "strike"
  }, {
    style: "text-decoration:line-through"
  }, {
    style: "text-decoration-line:line-through"
  }],
  toDOM: (hook, next) => {
    hook.value = ["span", {
      style: "text-decoration-line:line-through"
    }];
    next();
  }
};

const underline = {
  parseDOM: [{
    tag: "u"
  }, {
    style: "text-decoration:underline"
  }],
  toDOM: (hook, next) => {
    hook.value = ["span", {
      style: "text-decoration:underline"
    }];
    next();
  }
};

const smallcaps = {
  attrs: {
    class: {
      default: "small-caps"
    }
  },
  // inclusive: false,
  parseDOM: [{
    tag: "span.small-caps",

    getAttrs(dom) {
      return {
        class: dom.getAttribute("class")
      };
    }

  }],

  toDOM(hook, next) {
    hook.value = ["span", hook.node.attrs, 0];
    next();
  }

};

const source = {
  parseDOM: [{
    tag: "cite"
  }],

  toDOM() {
    return ["cite", 0];
  }

};

const comment = {
  attrs: {
    class: {
      default: 'comment'
    },
    id: {
      default: ''
    },
    group: {
      default: ''
    },
    viewid: {
      default: ''
    },
    conversation: []
  },
  inclusive: false,
  excludes: '',
  parseDOM: [{
    tag: 'span.comment',

    getAttrs(hook, next) {
      Object.assign(hook, {
        class: hook.dom.getAttribute('class'),
        id: hook.dom.dataset.id,
        group: hook.dom.dataset.group,
        viewid: hook.dom.dataset.viewid,
        conversation: JSON.parse(hook.dom.dataset.conversation)
      });
      next();
    }

  }],

  toDOM(hook, next) {
    hook.value = ['span', {
      class: hook.node.attrs.class,
      'data-id': hook.node.attrs.id,
      'data-conversation': JSON.stringify(hook.node.attrs.conversation),
      'data-viewid': hook.node.attrs.viewid,
      'data-group': hook.node.attrs.group
    }];
    next();
  }

};

const insertion = {
  attrs: {
    class: {
      default: "insertion"
    },
    id: {
      default: ""
    },
    user: {
      default: 0
    },
    username: {
      default: ""
    },
    date: {
      default: 0
    },
    group: {
      default: ""
    }
  },
  inclusive: false,
  group: "track",
  parseDOM: [{
    tag: "span.insertion",

    getAttrs(hook, next) {
      Object.assign(hook, {
        class: hook.dom.getAttribute("class"),
        id: hook.dom.dataset.id,
        user: parseInt(hook.dom.dataset.user),
        username: hook.dom.dataset.username,
        date: parseInt(hook.dom.dataset.date),
        group: hook.dom.dataset.group
      });
      next();
    }

  }],

  toDOM(hook, next) {
    hook.value = ["span", {
      class: hook.node.attrs.class,
      "data-id": hook.node.attrs.id,
      "data-user": hook.node.attrs.user,
      "data-username": hook.node.attrs.username,
      "data-date": hook.node.attrs.date,
      "data-group": hook.node.attrs.group
    }];
    next();
  }

};

const deletion = {
  attrs: {
    class: {
      default: "deletion"
    },
    id: {
      default: ""
    },
    user: {
      default: 0
    },
    username: {
      default: ""
    },
    date: {
      default: 0
    },
    group: {
      default: ""
    }
  },
  inclusive: false,
  group: "track",
  parseDOM: [{
    tag: "span.deletion",

    getAttrs(hook, next) {
      Object.assign(hook, {
        class: hook.dom.getAttribute("class"),
        id: hook.dom.dataset.id,
        user: parseInt(hook.dom.dataset.user),
        username: hook.dom.dataset.username,
        date: parseInt(hook.dom.dataset.date),
        group: hook.dom.dataset.group
      });
      next();
    }

  }],

  toDOM(hook, next) {
    hook.value = ["span", {
      class: hook.node.attrs.class,
      "data-id": hook.node.attrs.id,
      "data-user": hook.node.attrs.user,
      "data-username": hook.node.attrs.username,
      "data-date": hook.node.attrs.date,
      "data-group": hook.node.attrs.group
    }];
    next();
  }

};

const format_change = {
  attrs: {
    class: {
      default: "format-change"
    },
    id: {
      default: ""
    },
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
    },
    group: {
      default: ""
    }
  },
  inclusive: false,
  group: "track",
  parseDOM: [{
    tag: "span.format-change",

    getAttrs(hook, next) {
      Object.assign(hook, {
        class: hook.dom.getAttribute("class"),
        id: hook.dom.dataset.id,
        user: parseInt(hook.dom.dataset.user),
        username: hook.dom.dataset.username,
        date: parseInt(hook.dom.dataset.date),
        before: waxProsemirrorUtilities.SchemaHelpers.parseFormatList(hook.dom.dataset.before),
        after: waxProsemirrorUtilities.SchemaHelpers.parseFormatList(hook.dom.dataset.after),
        group: hook.dom.dataset.group
      });
      next();
    }

  }],

  toDOM(hook, next) {
    hook.value = ["span", {
      class: hook.node.attrs.class,
      "data-id": hook.node.attrs.id,
      "data-user": hook.node.attrs.user,
      "data-username": hook.node.attrs.username,
      "data-date": hook.node.attrs.date,
      "data-before": JSON.stringify(hook.node.attrs.before),
      "data-after": JSON.stringify(hook.node.attrs.after),
      "data-group": hook.node.attrs.group
    }];
    next();
  }

};

var index = {
  format_change: format_change,
  insertion: insertion,
  deletion: deletion
};

const author = {
  content: "inline*",
  group: "block",
  priority: 0,
  defining: true,
  attrs: {
    class: {
      default: "author"
    }
  },
  parseDOM: [{
    tag: "p.author",

    getAttrs(hook, next) {
      Object.assign(hook, {
        class: hook.dom.getAttribute("class")
      });
      next();
    }

  }],

  toDOM(hook, next) {
    const attrs = {
      class: hook.node.attrs.class
    };
    hook.value = ["p", attrs, 0];
    next();
  }

};

const epigraphPoetry = {
  content: "inline*",
  group: "block",
  priority: 0,
  defining: true,
  attrs: {
    class: {
      default: "epigraph-poetry"
    }
  },
  parseDOM: [{
    tag: "p.epigraph-poetry",

    getAttrs(hook, next) {
      Object.assign(hook, {
        class: hook.dom.getAttribute("class")
      });
      next();
    }

  }],

  toDOM(hook, next) {
    const attrs = {
      class: hook.node.attrs.class
    };
    hook.value = ["p", attrs, 0];
    next();
  }

};

const epigraphProse = {
  content: "inline*",
  group: "block",
  priority: 0,
  defining: true,
  attrs: {
    class: {
      default: "epigraph-prose"
    }
  },
  parseDOM: [{
    tag: "p.epigraph-prose",

    getAttrs(hook, next) {
      Object.assign(hook, {
        class: hook.dom.getAttribute("class")
      });
      next();
    }

  }],

  toDOM(hook, next) {
    const attrs = {
      class: hook.node.attrs.class
    };
    hook.value = ["p", attrs, 0];
    next();
  }

};

const sourceNote = {
  content: "inline*",
  group: "block",
  priority: 0,
  defining: true,
  attrs: {
    class: {
      default: "source-note"
    }
  },
  parseDOM: [{
    tag: "p.source-note",

    getAttrs(hook, next) {
      Object.assign(hook, {
        class: hook.dom.getAttribute("class")
      });
      next();
    }

  }],

  toDOM(hook, next) {
    const attrs = {
      class: hook.node.attrs.class
    };
    hook.value = ["p", attrs, 0];
    next();
  }

};

const paragraphCont = {
  content: "inline*",
  group: "block",
  priority: 0,
  defining: true,
  attrs: {
    class: {
      default: "paragraph-cont"
    }
  },
  parseDOM: [{
    tag: "p.paragraph-cont",

    getAttrs(hook, next) {
      Object.assign(hook, {
        class: hook.dom.getAttribute("class")
      });
      next();
    }

  }],

  toDOM(hook, next) {
    const attrs = {
      class: hook.node.attrs.class
    };
    hook.value = ["p", attrs, 0];
    next();
  }

};

const extractProse = {
  content: "inline*",
  group: "block",
  priority: 0,
  defining: true,
  attrs: {
    class: {
      default: "extract-prose"
    }
  },
  parseDOM: [{
    tag: "p.extract-prose",

    getAttrs(hook, next) {
      Object.assign(hook, {
        class: hook.dom.getAttribute("class")
      });
      next();
    }

  }],

  toDOM(hook, next) {
    const attrs = {
      class: hook.node.attrs.class
    };
    hook.value = ["p", attrs, 0];
    next();
  }

};

const extractPoetry = {
  content: "inline*",
  group: "block",
  priority: 0,
  defining: true,
  attrs: {
    class: {
      default: "extract-poetry"
    }
  },
  parseDOM: [{
    tag: "p.extract-poetry",

    getAttrs(hook, next) {
      Object.assign(hook, {
        class: hook.dom.getAttribute("class")
      });
      next();
    }

  }],

  toDOM(hook, next) {
    const attrs = {
      class: hook.node.attrs.class
    };
    hook.value = ["p", attrs, 0];
    next();
  }

};

const title = {
  content: "inline*",
  group: "block",
  priority: 0,
  defining: true,
  attrs: {
    class: {
      default: "title"
    }
  },
  parseDOM: [{
    tag: "p.title",

    getAttrs(hook, next) {
      Object.assign(hook, {
        class: dom.getAttribute("class")
      });
      next();
    }

  }],

  toDOM(hook, next) {
    const attrs = {
      class: hook.node.attrs.class
    };
    hook.value = ["p", attrs, 0];
    next();
  }

};

const orderedlist = {
  group: "block",
  content: "list_item+",
  attrs: {
    order: {
      default: 1
    }
  },
  parseDOM: [{
    tag: "ol",

    getAttrs(hook, next) {
      Object.assign(hook, {
        order: hook.dom.hasAttribute("start") ? +hook.dom.getAttribute("start") : 1
      });
      next();
    }

  }],

  toDOM(hook, next) {
    const attrs = {};

    if (hook.node.attrs.order !== 1) {
      attrs.start = hook.node.attrs.order;
    }

    hook.value = ["ol", attrs, 0];
    next();
  }

};

const bulletlist = {
  group: "block",
  content: "list_item+",
  attrs: {
    track: {
      default: []
    }
  },
  parseDOM: [{
    tag: "ul",

    getAttrs(hook, next) {
      Object.assign(hook, {
        track: waxProsemirrorUtilities.SchemaHelpers.parseTracks(hook.dom.dataset.track)
      });
      next();
    }

  }],

  toDOM(hook, next) {
    const attrs = {};

    if (hook.node.attrs.track.length) {
      attrs["data-track"] = JSON.stringify(hook.node.attrs.track);
    }

    hook.value = ["ul", attrs, 0];
    next();
  }

};

const list_item = {
  content: "paragraph block*",
  attrs: {
    track: {
      default: []
    }
  },
  parseDOM: [{
    tag: "li",

    getAttrs(hook, next) {
      Object.assign(hook, {
        track: waxProsemirrorUtilities.SchemaHelpers.parseTracks(hook.dom.dataset.track)
      });
      next();
    }

  }],

  toDOM(hook, next) {
    const attrs = {};

    if (hook.node.attrs.track.length) {
      attrs["data-track"] = JSON.stringify(hook.node.attrs.track);
    }

    hook.value = ["li", attrs, 0];
    next();
  },

  defining: true
};

const subtitle = {
  content: "inline*",
  group: "block",
  priority: 0,
  defining: true,
  attrs: {
    class: {
      default: "cst"
    }
  },
  parseDOM: [{
    tag: "p.cst",

    getAttrs(hook, next) {
      Object.assign(hook, {
        class: dom.getAttribute("class")
      });
      next();
    }

  }],

  toDOM(hook, next) {
    const attrs = {
      class: hook.node.attrs.class
    };
    hook.value = ["p", attrs, 0];
    next();
  }

};

const image = {
  inline: true,
  attrs: {
    src: {},
    alt: {
      default: null
    },
    title: {
      default: null
    },
    track: {
      default: []
    }
  },
  group: 'inline',
  draggable: true,
  parseDOM: [{
    tag: 'img[src]',

    getAttrs(hook, next) {
      Object.assign(hook, {
        src: hook.dom.getAttribute('src'),
        title: hook.dom.getAttribute('title'),
        // track: parseTracks(hook.dom.dataset.track),
        alt: hook.dom.getAttribute('alt')
      });
      next();
    }

  }],

  toDOM(hook, next) {
    //   // attrs["data-track"] = JSON.stringify(hook.node.attrs.track);
    // }

    const {
      src,
      alt,
      title
    } = hook.node.attrs;
    hook.value = ['img', {
      src,
      alt,
      title
    }];
    next();
  }

};

const heading = {
  attrs: {
    level: {
      default: 1
    }
  },
  content: "inline*",
  group: "block",
  defining: true,
  parseDOM: [{
    tag: "h1",
    attrs: {
      level: 1
    }
  }, {
    tag: "h2",
    attrs: {
      level: 2
    }
  }, {
    tag: "h3",
    attrs: {
      level: 3
    }
  }],

  toDOM(hook, next) {
    const attrs = {};
    hook.value = [`h${hook.node.attrs.level}`, attrs, 0];
    next();
  }

};

const blockquote = {
  content: "block+",
  group: "block",
  defining: true,
  parseDOM: [{
    tag: "blockquote"
  }],

  toDOM() {
    return ["blockquote", 0];
  }

};

// TODO Write the node in WaxSchema
const footnote = {
  group: 'inline',
  content: 'block*',
  inline: true,
  atom: true,
  attrs: {
    id: {
      default: ''
    }
  },
  toDOM: node => {
    return ['footnote', node.attrs, 0];
  },
  parseDOM: [{
    tag: 'footnote',

    getAttrs(dom) {
      return {
        id: dom.getAttribute('id')
      };
    }

  }]
};

const codeBlock = {
  content: 'text*',
  group: 'block',
  code: true,
  defining: true,
  marks: 'comment insertion deletion',
  attrs: {
    params: {
      default: ''
    }
  },
  parseDOM: [{
    tag: 'pre',
    preserveWhitespace: 'full',

    getAttrs(dom) {
      return {
        params: dom.dataset.params
      };
    }

  }],

  toDOM(node) {
    return ['pre', {
      'data-params': node.attrs.params
    }, ['code', 0]];
  }

};

const author$1 = {
  content: "inline*",
  group: "block",
  priority: 0,
  defining: true,
  attrs: {
    id: {
      default: ""
    },
    track: {
      default: []
    },
    group: {
      default: ""
    }
  },
  parseDOM: [{
    tag: "p.author",

    getAttrs(hook, next) {
      Object.assign(hook, {
        id: hook.dom.dataset.id,
        track: waxProsemirrorUtilities.SchemaHelpers.parseTracks(hook.dom.dataset.track),
        group: hook.dom.dataset.group
      });
      next();
    }

  }],

  toDOM(hook, next) {
    if (hook.node.attrs.track.length) {
      Object.assign(hook.value[1], {
        "data-id": hook.node.attrs.id,
        "data-track": JSON.stringify(hook.node.attrs.track),
        "data-group": hook.node.attrs.group
      });
    }

    next();
  }

};

const title$1 = {
  content: "inline*",
  group: "block",
  priority: 0,
  defining: true,
  attrs: {
    id: {
      default: ""
    },
    track: {
      default: []
    },
    group: {
      default: ""
    }
  },
  parseDOM: [{
    tag: "p.title",

    getAttrs(hook, next) {
      Object.assign(hook, {
        id: hook.dom.dataset.id,
        track: waxProsemirrorUtilities.SchemaHelpers.parseTracks(hook.dom.dataset.track),
        group: hook.dom.dataset.group
      });
      next();
    }

  }],

  toDOM(hook, next) {
    if (hook.node.attrs.track.length) {
      Object.assign(hook.value[1], {
        "data-id": hook.node.attrs.id,
        "data-track": JSON.stringify(hook.node.attrs.track),
        "data-group": hook.node.attrs.group
      });
    }

    next();
  }

};

const subtitle$1 = {
  content: "inline*",
  group: "block",
  priority: 0,
  defining: true,
  attrs: {
    id: {
      default: ""
    },
    track: {
      default: []
    },
    group: {
      default: ""
    }
  },
  parseDOM: [{
    tag: "p.cst",

    getAttrs(hook, next) {
      Object.assign(hook, {
        id: hook.dom.dataset.id,
        track: waxProsemirrorUtilities.SchemaHelpers.parseTracks(hook.dom.dataset.track),
        group: hook.dom.dataset.group
      });
      next();
    }

  }],

  toDOM(hook, next) {
    if (hook.node.attrs.track.length) {
      Object.assign(hook.value[1], {
        "data-id": hook.node.attrs.id,
        "data-track": JSON.stringify(hook.node.attrs.track),
        "data-group": hook.node.attrs.group
      });
    }

    next();
  }

};

const epigraphProse$1 = {
  content: "inline*",
  group: "block",
  priority: 0,
  defining: true,
  attrs: {
    id: {
      default: ""
    },
    track: {
      default: []
    },
    group: {
      default: ""
    }
  },
  parseDOM: [{
    tag: "p.epigraph-prose",

    getAttrs(hook, next) {
      Object.assign(hook, {
        id: hook.dom.dataset.id,
        track: waxProsemirrorUtilities.SchemaHelpers.parseTracks(hook.dom.dataset.track),
        group: hook.dom.dataset.group
      });
      next();
    }

  }],

  toDOM(hook, next) {
    if (hook.node.attrs.track.length) {
      Object.assign(hook.value[1], {
        "data-id": hook.node.attrs.id,
        "data-track": JSON.stringify(hook.node.attrs.track),
        "data-group": hook.node.attrs.group
      });
    }

    next();
  }

};

const epigraphPoetry$1 = {
  content: "inline*",
  group: "block",
  priority: 0,
  defining: true,
  attrs: {
    id: {
      default: ""
    },
    track: {
      default: []
    },
    group: {
      default: ""
    }
  },
  parseDOM: [{
    tag: "p.epigraph-poetry",

    getAttrs(hook, next) {
      Object.assign(hook, {
        id: hook.dom.dataset.id,
        track: waxProsemirrorUtilities.SchemaHelpers.parseTracks(hook.dom.dataset.track),
        group: hook.dom.dataset.group
      });
      next();
    }

  }],

  toDOM(hook, next) {
    if (hook.node.attrs.track.length) {
      Object.assign(hook.value[1], {
        "data-id": hook.node.attrs.id,
        "data-track": JSON.stringify(hook.node.attrs.track),
        "data-group": hook.node.attrs.group
      });
    }

    next();
  }

};

const heading$1 = {
  attrs: {
    id: {
      default: ""
    },
    track: {
      default: []
    },
    group: {
      default: ""
    }
  },
  content: "inline*",
  group: "block",
  defining: true,
  parseDOM: [{
    tag: "h1",

    getAttrs(hook, next) {
      Object.assign(hook, {
        id: hook.dom.dataset.id,
        track: waxProsemirrorUtilities.SchemaHelpers.parseTracks(hook.dom.dataset.track),
        group: hook.dom.dataset.group
      });
      next();
    }

  }, {
    tag: "h2",

    getAttrs(hook, next) {
      Object.assign(hook, {
        id: hook.dom.dataset.id,
        track: waxProsemirrorUtilities.SchemaHelpers.parseTracks(hook.dom.dataset.track),
        group: hook.dom.dataset.group
      });
      next();
    }

  }, {
    tag: "h3",

    getAttrs(hook, next) {
      Object.assign(hook, {
        id: hook.dom.dataset.id,
        track: waxProsemirrorUtilities.SchemaHelpers.parseTracks(hook.dom.dataset.track),
        group: hook.dom.dataset.group
      });
      next();
    }

  }],

  toDOM(hook, next) {
    if (hook.node.attrs.track.length) {
      Object.assign(hook.value[1], {
        "data-id": hook.node.attrs.id,
        "data-track": JSON.stringify(hook.node.attrs.track),
        "data-group": hook.node.attrs.group
      });
    }

    next();
  }

};

const paragraphCont$1 = {
  content: "inline*",
  group: "block",
  priority: 0,
  defining: true,
  attrs: {
    id: {
      default: ""
    },
    track: {
      default: []
    },
    group: {
      default: ""
    }
  },
  parseDOM: [{
    tag: "p.paragraph-cont",

    getAttrs(hook, next) {
      Object.assign(hook, {
        id: hook.dom.dataset.id,
        track: waxProsemirrorUtilities.SchemaHelpers.parseTracks(hook.dom.dataset.track),
        group: hook.dom.dataset.group
      });
      next();
    }

  }],

  toDOM(hook, next) {
    if (hook.node.attrs.track.length) {
      Object.assign(hook.value[1], {
        "data-id": hook.node.attrs.id,
        "data-track": JSON.stringify(hook.node.attrs.track),
        "data-group": hook.node.attrs.group
      });
    }

    next();
  }

};

const extractProse$1 = {
  content: "inline*",
  group: "block",
  priority: 0,
  defining: true,
  attrs: {
    id: {
      default: ""
    },
    track: {
      default: []
    },
    group: {
      default: ""
    }
  },
  parseDOM: [{
    tag: "p.extract-prose",

    getAttrs(hook, next) {
      Object.assign(hook, {
        id: hook.dom.dataset.id,
        track: waxProsemirrorUtilities.SchemaHelpers.parseTracks(hook.dom.dataset.track),
        group: hook.dom.dataset.group
      });
      next();
    }

  }],

  toDOM(hook, next) {
    if (hook.node.attrs.track.length) {
      Object.assign(hook.value[1], {
        "data-id": hook.node.attrs.id,
        "data-track": JSON.stringify(hook.node.attrs.track),
        "data-group": hook.node.attrs.group
      });
    }

    next();
  }

};

const extractPoetry$1 = {
  content: "inline*",
  group: "block",
  priority: 0,
  defining: true,
  attrs: {
    id: {
      default: ""
    },
    track: {
      default: []
    },
    group: {
      default: ""
    }
  },
  parseDOM: [{
    tag: "p.extract-poetry",

    getAttrs(hook, next) {
      Object.assign(hook, {
        id: hook.dom.dataset.id,
        track: waxProsemirrorUtilities.SchemaHelpers.parseTracks(hook.dom.dataset.track),
        group: hook.dom.dataset.group
      });
      next();
    }

  }],

  toDOM(hook, next) {
    if (hook.node.attrs.track.length) {
      Object.assign(hook.value[1], {
        "data-id": hook.node.attrs.id,
        "data-track": JSON.stringify(hook.node.attrs.track),
        "data-group": hook.node.attrs.group
      });
    }

    next();
  }

};

const sourceNote$1 = {
  content: "inline*",
  group: "block",
  priority: 0,
  defining: true,
  attrs: {
    id: {
      default: ""
    },
    track: {
      default: []
    },
    group: {
      default: ""
    }
  },
  parseDOM: [{
    tag: "p.source-note",

    getAttrs(hook, next) {
      Object.assign(hook, {
        id: hook.dom.dataset.id,
        track: waxProsemirrorUtilities.SchemaHelpers.parseTracks(hook.dom.dataset.track),
        group: hook.dom.dataset.group
      });
      next();
    }

  }],

  toDOM(hook, next) {
    if (hook.node.attrs.track.length) {
      Object.assign(hook.value[1], {
        "data-id": hook.node.attrs.id,
        "data-track": JSON.stringify(hook.node.attrs.track),
        "data-group": hook.node.attrs.group
      });
    }

    next();
  }

};

const orderedlist$1 = {
  group: "block",
  content: "list_item+",
  attrs: {
    id: {
      default: ""
    },
    track: {
      default: []
    },
    group: {
      default: ""
    }
  },
  parseDOM: [{
    tag: "ol",

    getAttrs(hook, next) {
      Object.assign(hook, {
        id: hook.dom.dataset.id,
        track: waxProsemirrorUtilities.SchemaHelpers.parseTracks(hook.dom.dataset.track),
        group: hook.dom.dataset.group
      });
      next();
    }

  }],

  toDOM(hook, next) {
    if (hook.node.attrs.track.length) {
      Object.assign(hook.value[1], {
        "data-id": hook.node.attrs.id,
        "data-track": JSON.stringify(hook.node.attrs.track),
        "data-group": hook.node.attrs.group
      });
    }

    next();
  }

};

var index$1 = {
  author: author$1,
  title: title$1,
  subtitle: subtitle$1,
  epigraphProse: epigraphProse$1,
  epigraphPoetry: epigraphPoetry$1,
  paragraphCont: paragraphCont$1,
  extractProse: extractProse$1,
  extractPoetry: extractPoetry$1,
  orderedlist: orderedlist$1,
  sourceNote: sourceNote$1,
  heading: heading$1 // bulletlist: bulletListTrackNode,
  // list_item: listItemTrackNode,
  // image: imageTrackNode

};

exports.authorNode = author;
exports.blockQuoteNode = blockquote;
exports.bulletListNode = bulletlist;
exports.codeBlockNode = codeBlock;
exports.codeMark = code;
exports.commentMark = comment;
exports.emphasisMark = em;
exports.epigraphPoetryNode = epigraphPoetry;
exports.epigraphProseNode = epigraphProse;
exports.extractPoetryNode = extractPoetry;
exports.extractProseNode = extractProse;
exports.footNoteNode = footnote;
exports.headingNode = heading;
exports.imageNode = image;
exports.linkMark = link;
exports.listItemNode = list_item;
exports.orderedListNode = orderedlist;
exports.paragraphContNode = paragraphCont;
exports.smallcapsMark = smallcaps;
exports.sourceMark = source;
exports.sourceNoteNode = sourceNote;
exports.strikethroughMark = strikethrough;
exports.strongMark = strong;
exports.subTitleNode = subtitle;
exports.subscriptMark = subscript;
exports.superscriptMark = superscript;
exports.titleNode = title;
exports.trackChangesMarks = index;
exports.trackChangesNodes = index$1;
exports.underlineMark = underline;
//# sourceMappingURL=index.js.map
