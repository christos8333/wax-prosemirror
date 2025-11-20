import { Plugin } from 'prosemirror-state';
import { v4 as uuidv4 } from 'uuid';

const wrapFigureInParagraphPlugin = () => {
  return new Plugin({
    appendTransaction(transactions, oldState, newState) {
      const { doc, tr } = newState;
      let modified = false;
      const newTr = tr;

        doc.descendants((node, pos) => {
          if (node.type.name === 'figure') {
            const parentPos = pos - 1;
            const parent = doc.nodeAt(parentPos);
            
            if (!parent || parent.type.name !== 'paragraph') {
              // Get the image ID from the first child (image node)
              let imageId = null;
              if (node.firstChild && node.firstChild.attrs && node.firstChild.attrs.id) {
                imageId = node.firstChild.attrs.id;
              }
              
              // Generate paragraph ID based on image ID or create new one
              const paragraphId = imageId ? `figure-paragraph-${imageId}` : `figure-paragraph-${uuidv4()}`;
              
              const paragraph = newState.schema.nodes.paragraph.create(
                { 
                  id: paragraphId,
                  class: 'paragraph figure-wrapper'
                }, 
                [node]
              );
              newTr.replaceWith(pos, pos + node.nodeSize, paragraph);
              modified = true;
            }
          }
        });

      return modified ? newTr : null;
    }
  });
};

export default wrapFigureInParagraphPlugin;
