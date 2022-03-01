import { DOMSerializer } from 'prosemirror-model';

export default class Serializer extends DOMSerializer {
  constructor(props) {
    super(props);
  }

  serializeNode(node, options = {}) {
    // console.log('hohohohho');
    // let dom = this.serializeNodeInner(node, options);
    // for (let i = node.marks.length - 1; i >= 0; i--) {
    //   let wrap = this.serializeMark(node.marks[i], node.isInline, options);
    //   if (wrap) {
    //     (wrap.contentDOM || wrap.dom).appendChild(dom);
    //     dom = wrap.dom;
    //   }
    // }
    // return dom;
  }

  serializeFragment(fragment, options = {}, target) {
    // if (!target) target = doc(options).createDocumentFragment();
    // let top = target,
    //   active = null;
    // fragment.forEach(node => {
    //   if (active || node.marks.length) {
    //     if (!active) active = [];
    //     let keep = 0,
    //       rendered = 0;
    //     while (keep < active.length && rendered < node.marks.length) {
    //       let next = node.marks[rendered];
    //       if (!this.marks[next.type.name]) {
    //         rendered++;
    //         continue;
    //       }
    //       if (!next.eq(active[keep]) || next.type.spec.spanning === false)
    //         break;
    //       keep += 2;
    //       rendered++;
    //     }
    //     while (keep < active.length) {
    //       top = active.pop();
    //       active.pop();
    //     }
    //     while (rendered < node.marks.length) {
    //       let add = node.marks[rendered++];
    //       let markDOM = this.serializeMark(add, node.isInline, options);
    //       if (markDOM) {
    //         active.push(add, top);
    //         top.appendChild(markDOM.dom);
    //         top = markDOM.contentDOM || markDOM.dom;
    //       }
    //     }
    //   }
    //   top.appendChild(this.serializeNodeInner(node, options));
    // });
    // return target;
  }

  serializeNodeInner(node, options = {}) {
    console.log('hohohohho');
    let { dom, contentDOM } = DOMSerializer.renderSpec(
      doc(options),
      this.nodes[node.type.name](node),
    );
    if (contentDOM) {
      if (node.isLeaf)
        throw new RangeError('Content hole not allowed in a leaf node spec');
      if (options.onContent) options.onContent(node, contentDOM, options);
      else this.serializeFragment(node.content, options, contentDOM);
    }
    return dom;
  }
}
