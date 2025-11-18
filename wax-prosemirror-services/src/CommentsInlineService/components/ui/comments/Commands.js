/* eslint-disable no-multi-assign */
import { v4 as uuidv4 } from 'uuid';
import { AddMarkStep } from 'prosemirror-transform';

const createComment = (
  state,
  dispatch,
  group,
  viewid,
  conversation = [],
  title = '',
  posFrom,
  posTo,
) => {
  const {
    selection: { $from, $to },
    tr,
  } = state;
  let fromPosition = $from.pos;
  let toPosition = $to.pos;
  if ($from.pos === $to.pos) {
    fromPosition = posFrom;
    toPosition = posTo;
  }
  let footnote = false;
  let footnoteNode;
  state.doc.nodesBetween($from.pos, $to.pos, (node, from) => {
    if (node.type.groups.includes('notes')) {
      footnote = true;
      footnoteNode = node;
    }
  });

  if (footnote) {
    if (
      footnoteNode.content.size + 2 ===
      state.selection.to - state.selection.from
    ) {
      return createCommentOnSingleFootnote(
        state,
        dispatch,
        group,
        viewid,
        conversation,
        title,
      );
    }
    return createCommentOnFootnote(
      state,
      dispatch,
      group,
      viewid,
      conversation,
      title,
    );
  }
  dispatch(
    state.tr
      .addMark(
        fromPosition,
        toPosition,
        state.config.schema.marks.comment.create({
          id: uuidv4(),
          group,
          viewid,
          conversation,
          title,
        }),
      )
      .setMeta('forceUpdate', true),
  );
};

const createCommentOnSingleFootnote = (
  state,
  dispatch,
  group,
  viewid,
  conversation,
  title,
) => {
  const { tr } = state;
  tr.step(
    new AddMarkStep(
      state.selection.from,
      state.selection.from + 1,
      state.config.schema.marks.comment.create({
        id: uuidv4(),
        group,
        conversation,
        viewid,
        title,
      }),
    ),
  ).setMeta('forceUpdate', true);
  dispatch(tr);
};

const createCommentOnFootnote = (
  state,
  dispatch,
  group,
  viewid,
  conversation,
  title,
) => {
  const {
    selection: { $from },
    selection,
    tr,
  } = state;

  const { content } = $from.parent;
  const $pos = state.doc.resolve($from.pos);
  const commentStart = $from.pos - $pos.textOffset;
  const commentEnd = commentStart + $pos.parent.child($pos.index()).nodeSize;

  let start = $from.pos;
  let end = commentEnd;
  const ranges = [];

  const allFragments = [];

  selection.content().content.content.forEach(node => {
    node.content.content.forEach(fragment => {
      allFragments.push(fragment);
    });
  });

  allFragments.forEach((contentNode, index) => {
    start = index === 0 ? start : end;
    end = index === 0 ? end : end + contentNode.nodeSize;
    ranges.push({
      start,
      end,
      footnote: contentNode.type.groups.includes('notes'),
    });
  });

  const mergedRanges = [];
  ranges.forEach((item, i) => {
    if (item.footnote) {
      mergedRanges[mergedRanges.length - 1].end =
        mergedRanges[mergedRanges.length - 1].end + 1;
    } else {
      mergedRanges.push(item);
    }
  });

  const id = uuidv4();

  mergedRanges.forEach(range => {
    tr.step(
      new AddMarkStep(
        range.start,
        range.end,
        state.config.schema.marks.comment.create({
          id,
          group,
          conversation,
          viewid,
          title,
        }),
      ),
    ).setMeta('forceUpdate', true);
  });

  dispatch(tr);
};

export default {
  createComment,
};
