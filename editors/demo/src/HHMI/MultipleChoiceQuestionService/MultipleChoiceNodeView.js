import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { AbstractNodeView } from 'wax-prosemirror-services';
import { StepMap } from 'prosemirror-transform';

let questionView;
export default class MultipleChoiceNodeView extends AbstractNodeView {
  constructor(node, view, getPos, decorations, createPortal, Component) {
    super(node, view, getPos, decorations, createPortal, Component);

    setTimeout(() => {
      console.log(document.getElementById('test'));
      questionView = new EditorView(
        { mount: document.getElementById('test') },
        {
          state: EditorState.create({
            doc: node,
          }),
          dispatchTransaction: tr => {
            console.log('dispatch', questionView.state.applyTransaction(tr));
            let { state, transactions } = questionView.state.applyTransaction(
              tr,
            );
            questionView.updateState(state);

            if (!tr.getMeta('fromOutside')) {
              let outerTr = view.state.tr,
                offsetMap = StepMap.offset(getPos() + 1);
              for (let i = 0; i < transactions.length; i++) {
                let steps = transactions[i].steps;
                for (let j = 0; j < steps.length; j++)
                  outerTr.step(steps[j].map(offsetMap));
              }
              if (outerTr.docChanged) view.dispatch(outerTr);
            }
          },

          attributes: {
            spellcheck: 'false',
          },
        },
      );
    });
  }
  static name() {
    return 'multiple_choice';
  }

  update(node) {
    const { state } = questionView;
    const start = node.content.findDiffStart(state.doc.content);
    console.log('start', start);
    if (start != null) {
      let { a: endA, b: endB } = node.content.findDiffEnd(state.doc.content);
      const overlap = start - Math.min(endA, endB);
      if (overlap > 0) {
        endA += overlap;
        endB += overlap;
      }
      questionView.dispatch(
        state.tr
          .replace(start, endB, node.slice(start, endA))
          .setMeta('fromOutside', true),
      );
    }
  }
}
