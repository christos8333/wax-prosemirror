import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { AbstractNodeView } from 'wax-prosemirror-services';
import { StepMap } from 'prosemirror-transform';

let questionView;
export default class MultipleChoiceNodeView extends AbstractNodeView {
  constructor(node, view, getPos, decorations, createPortal, Component) {
    super(node, view, getPos, decorations, createPortal, Component);
    this.node = node;
    this.outerView = view;
    this.getPos = getPos;

    this.innerView = new EditorView(
      {
        mount: this.dom.appendChild(document.createElement('div')),
      },
      {
        state: EditorState.create({
          doc: node,
        }),
        dispatchTransaction: this.dispatchInner.bind(this),

        handleDOMEvents: {
          mousedown: () => {
            // Kludge to prevent issues due to the fact that the whole
            // footnote is node-selected (and thus DOM-selected) when
            // the parent editor is focused.
            if (this.outerView.hasFocus()) this.innerView.focus();
          },
        },

        attributes: {
          spellcheck: 'false',
        },
      },
    );
  }
  static name() {
    return 'multiple_choice';
  }

  dispatchInner(tr) {
    let { state, transactions } = this.innerView.state.applyTransaction(tr);
    this.innerView.updateState(state);

    if (!tr.getMeta('fromOutside')) {
      let outerTr = this.outerView.state.tr,
        offsetMap = StepMap.offset(this.getPos() + 1);
      for (let i = 0; i < transactions.length; i++) {
        let steps = transactions[i].steps;
        for (let j = 0; j < steps.length; j++)
          outerTr.step(steps[j].map(offsetMap));
      }
      if (outerTr.docChanged) this.outerView.dispatch(outerTr);
    }
  }

  update(node) {
<<<<<<< HEAD
    if (!node.sameMarkup(this.node)) return false;
    this.node = node;
    if (this.innerView) {
      let state = this.innerView.state;
      let start = node.content.findDiffStart(state.doc.content);
      if (start != null) {
        let { a: endA, b: endB } = node.content.findDiffEnd(state.doc.content);
        let overlap = start - Math.min(endA, endB);
        if (overlap > 0) {
          endA += overlap;
          endB += overlap;
        }
        this.innerView.dispatch(
          state.tr
            .replace(start, endB, node.slice(start, endA))
            .setMeta('fromOutside', true),
        );
      }
    }
=======
    console.log('in nodes update');
>>>>>>> fix
    return true;
  }
}
