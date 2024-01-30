export const isConflicting = (fromA, toA, fromB, toB) => {
  // case 1: (non-conflicting) A is before B
  if (fromA < toB && toA < fromB) return false;
  // case 2: (non-conflicting) B is before A
  if (fromB < toA && toB < fromA) return false;
  // case 3: (conflicting) some kind of overlap
  return true;
};

export const createAnnotationRendering = annotations => {
  const renderedAnnotations = [];
  const openAnnotationStack = [];
  // const actionMap: Map<number, ActionKeyframe[]> = new Map();
  const actionMap = [];
  const annotationFragmentation = [];
  // annotations = sortAnnotationsByStart(annotations);
  // STEP 1: Create a Map, containing the rendering actions for each index in the document.
  // this could be opening or closing an annotation
  annotations.forEach((term, index) => {
    // create an opening action keyframe
    const open = {
      action: 'open',
      annotationIndex: index,
      textAnchor: term.from,
    };
    // create a closing action keyframe
    const close = {
      action: 'close',
      annotationIndex: index,
      textAnchor: term.to,
    };
    const openMapElement = actionMap[open.textAnchor];
    // create empty actions list if necessary
    if (!openMapElement) actionMap[open.textAnchor] = [];
    actionMap[open.textAnchor].push(open);
    const closeMapElement = actionMap[close.textAnchor];
    if (!closeMapElement) actionMap[close.textAnchor] = [];
    actionMap[close.textAnchor].push(close);
  });
  actionMap // STEP 2: iterate the actionMap and generate the annotation UI elements
    .forEach((actions, _) => {
      actions.forEach(action => {
        // check if there are still open annotations
        if (openAnnotationStack.length !== 0) {
          const actionStackPeek =
            openAnnotationStack[openAnnotationStack.length - 1];
          if (
            actionStackPeek.action === 'open' &&
            actionStackPeek.annotationIndex === action.annotationIndex &&
            action.action === 'close'
          ) {
            // base case: the last opened annotation is closed by next action
            openAnnotationStack.pop();
            const rendering = annotationFragmentation[action.annotationIndex]
              ? 'fragment-right'
              : 'normal';
            const from = annotationFragmentation[action.annotationIndex]
              ? renderedAnnotations[renderedAnnotations.length - 1].to
              : annotations[action.annotationIndex].from;
            const normalTerm = Object.assign(
              Object.assign({}, annotations[action.annotationIndex]),
              { from, rendering },
            );
            renderedAnnotations.push(normalTerm);
          } else if (
            actionStackPeek.action === 'open' &&
            action.action === 'close'
          ) {
            // annotation is closed while being overlapped by another annotation
            // -> find "open" action and remove it, otherwise a new truncated segment would be created
            const indexOfActionToRemove = openAnnotationStack.findIndex(a => {
              return (
                a.textAnchor === annotations[action.annotationIndex].from &&
                a.annotationIndex === action.annotationIndex &&
                a.action === 'open'
              );
            });
            if (indexOfActionToRemove > -1) {
              openAnnotationStack.splice(indexOfActionToRemove, 1);
            } else {
              throw Error(
                "Couldn't find opening keyframe for annotation " +
                  action.annotationIndex,
              );
            }
          } else if (
            actionStackPeek.action === 'open' &&
            action.action === 'open'
          ) {
            let fragment;
            if (annotationFragmentation[actionStackPeek.annotationIndex]) {
              // n-th truncation (n > 1): render a middle fragment
              fragment = Object.assign(
                Object.assign({}, annotations[actionStackPeek.annotationIndex]),
                {
                  rendering: 'fragment-middle',
                  // start where the last rendered annotation ends + 1
                  from: renderedAnnotations[renderedAnnotations.length - 1].to,
                  // stop where the next annotation begins - 1
                  to: annotations[action.annotationIndex].from,
                },
              );
            } else {
              // first-time-truncation: a new annotation begins, truncating the old open annotation
              fragment = Object.assign(
                Object.assign({}, annotations[actionStackPeek.annotationIndex]),
                {
                  rendering: 'fragment-left',
                  to: annotations[action.annotationIndex].from,
                },
              );
              // mark the previous annotation as fragmented, by saving where the fragment ends
              annotationFragmentation[actionStackPeek.annotationIndex] = true;
            }
            renderedAnnotations.push(fragment);
            openAnnotationStack.push(action);
          }
        } else if (action.action === 'open') {
          openAnnotationStack.push(action);
        }
      });
    });
  return renderedAnnotations;
};

export const sortAnnotationsByStart = annotations => {
  return annotations.sort((a, b) => a.from - b.from);
};
