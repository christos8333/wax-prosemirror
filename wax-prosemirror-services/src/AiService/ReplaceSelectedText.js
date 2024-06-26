import { DOMParser } from 'prosemirror-model';
import { TextSelection } from 'prosemirror-state';

const elementFromString = string => {
  const wrappedValue = `<body>${string}</body>`;
  const { body } = new window.DOMParser().parseFromString(
    wrappedValue,
    'text/html',
  );

  return body;
};

const replaceSelectedText = (view, responseText, replace = false) => {
  if (!responseText) return;
  let { state } = view;
  let { tr } = state;
  const { from, to } = tr.selection;
  const paragraphNodes = [];
  const parser = DOMParser.fromSchema(state.config.schema);

  if (from > state.doc.content.size || to > state.doc.content.size) {
    return;
  }

  let transformedText = state.schema.text(responseText);

  if (responseText.includes('<ul>') || responseText.includes('ol')) {
    transformedText = parser.parse(
      elementFromString(responseText.replace(/^\s+|\s+$/g, '')),
      {},
    );
  }

  if (responseText.includes('\n')) {
    responseText.split('\n\n').forEach(paragraph => {
      let content = '';

      if (/^\d+\..*\n/.test(paragraph)) {
        content = `<ol>`;

        paragraph.split('\n').forEach(line => {
          content += `<li>${line.replace(/^(\d+\.\s)/g, '').trim()}</li>`;
        });

        content += `</ol>`;
      } else if (/^-.*\n/.test(paragraph)) {
        content = `<ul>`;

        paragraph.split('\n').forEach(line => {
          content += `<li>${line.replace(/[-\s]/g, '')}</li>`;
        });

        content += `</ul>`;
      } else {
        content = paragraph.replace(/\n/g, '<br />');
      }

      paragraphNodes.push(parser.parse(elementFromString(content)));
    });
  }

  const finalReplacementText =
    paragraphNodes.length !== 0 ? paragraphNodes : transformedText;

  if (replace) {
    if (from !== to) {
      tr = tr.delete(from, to);
    }
    tr = tr.replaceWith(from, from, finalReplacementText);
  } else {
    tr = tr.insert(to, finalReplacementText);
  }

  view.dispatch(tr);

  try {
    // Fetch the most recent state again
    state = view.state;

    // Update the selection to the end of the new text
    const newFrom = replace ? from : to;
    const newTo = newFrom + responseText.length;
    const cursorPosition = paragraphNodes.length !== 0 ? newTo + 2 : newTo;
    const newSelection = TextSelection.create(state.doc, newTo, newTo);
    tr = state.tr.setSelection(newSelection);
    // Dispatch the final transaction to update the state
    view.dispatch(tr);
    view.focus();
  } catch (error) {
    console.log(error);
  }
};

export default replaceSelectedText;
