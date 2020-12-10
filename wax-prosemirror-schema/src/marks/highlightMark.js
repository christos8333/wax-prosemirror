// const highlight = {
//   parseDOM: [
//     { tag: "highlight" },
//     { style: "color:red" },
//   ],
//     toDOM: (hook, next) => {
//       hook.value = [
//         "highlight",
//         {
//           style: "background-color:red"
//         }
//       ];
//       next();
//     }
//   };


  const highlight = {
    attrs: {
      style: { default: null }
    },
    inclusive: false,
    parseDOM: [
      {
        tag: "highlight",
        getAttrs(hook, next) {
          const style = hook.dom.getAttribute("style");
          Object.assign(hook, {
            style: hook.dom.getAttribute("style"),
          });
          next();
        }
      }
    ],
    toDOM(hook, next) {
      hook.value = ["highlight", hook.node.attrs, 0];
      next();
    }
  };
  
  export default highlight;
  