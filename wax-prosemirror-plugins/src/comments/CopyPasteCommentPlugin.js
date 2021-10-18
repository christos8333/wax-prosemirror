/* eslint-disable */
import { forEach } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { Plugin, PluginKey } from 'prosemirror-state';
import { DocumentHelpers } from 'wax-prosemirror-utilities';

const copyPasteCommentPugin = new PluginKey('copyPasteCommentPugin');

export default (props, context) => {
  return new Plugin({
    key: copyPasteCommentPugin,
    props: {
      transformPasted: slice => {
        const { activeView } = context.app.context;
        console.log(activeView);
        const { content } = slice;
        console.log(slice);
        const commentNodes = DocumentHelpers.findChildrenByMark(
          content,
          activeView.state.schema.marks.comment,
          true,
        );

        const allComments = [];

        commentNodes.map(node => {
          node.node.marks.map(comment => {
            if (comment.type.name === 'comment') {
              allComments.push(comment);
            }
          });
        });

        const groupedCommentsById = allComments.reduce((obj, mark) => {
          obj[mark.attrs.id] = [...(obj[mark.attrs.id] || []), mark];
          return obj;
        }, {});

        forEach(Object.keys(groupedCommentsById), key => {
          const id = uuidv4();
          forEach(groupedCommentsById[key], comment => {
            comment.attrs.id = id;
          });
        });

        return slice;
      },
    },
  });
};
