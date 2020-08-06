import { Mapping, RemoveMarkStep } from 'prosemirror-transform';
import { minBy, maxBy } from 'lodash';

import { injectable } from 'inversify';
import Tools from '../../lib/Tools';

export default
@injectable()
class AcceptTrackChange extends Tools {
  title = 'Accept Changes';
  content = 'Accept';

  get run() {
    return (state, dispatch) => {
      const {
        tr,
        selection: { from, to },
      } = state;

      const map = new Mapping();

      state.doc.nodesBetween(from, to, (node, pos) => {
        if (
          node.marks &&
          node.marks.find(mark => mark.type.name === 'insertion')
        ) {
          const insertionMark = node.marks.find(
            mark => mark.type.name === 'insertion',
          );
          tr.step(
            new RemoveMarkStep(
              map.map(maxBy(pos, from)),
              map.map(minBy(pos + node.nodeSize, to)),
              insertionMark,
            ),
          );
        }
      });
      dispatch(tr);
    };
  }

  get active() {
    return state => {};
  }
}
