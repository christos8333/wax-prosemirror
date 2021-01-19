const customtagBlock = {
    excludes: 'customBlock',
  
    attrs: {
      class: { default: null },
      tagName: ''
    },
    inclusive: false,
    parseDOM: [
      {
        tag: 'custom-tag-block',
        getAttrs(hook, next) {
          Object.assign(hook, {
            class: hook.dom.getAttribute('class'),
            tagname: hook.dom.getAttribute('tagName')
          });
          next();
        },
      },
    ],
    toDOM(hook, next) {
      hook.value = ['custom-tag-block', hook.node.attrs, 0]; // eslint-disable-line no-param-reassign
      next();
    },
  };
  
  export default customtagBlock;
  