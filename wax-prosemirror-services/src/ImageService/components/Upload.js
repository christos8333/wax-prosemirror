import { v4 as uuidv4 } from 'uuid';
import { Commands } from 'wax-prosemirror-core';

const findPlaceholder = (state, id, placeholderPlugin) => {
  const decos = placeholderPlugin.getState(state);
  const found = decos.find(null, null, spec => spec.id === id);
  return found.length ? found[0].from : null;
};

const insertImage = (
  fileData,
  view,
  placeholderPlugin,
  context,
  app,
  serverUrl,
  altText,
  caption,
) => {
  const trackChange = app.config.get('config.EnableTrackChangeService');
  const imageConfig = app.config.get('config.ImageService');
  const showLongDesc = imageConfig && imageConfig.showLongDesc;

  if (trackChange?.enabled)
    if (
      context.pmViews.main.state.doc.resolve(
        context.pmViews.main.state.tr.selection.from,
      ).parent.nodeSize !== 2
    ) {
      Commands.simulateKey(context.pmViews.main, 13, 'Enter');
    }

  // A fresh object to act as the ID for this upload
  // const id = {}
  const id = uuidv4();

  // Replace the selection with a placeholder
  const { tr } = context.pmViews.main.state;

  if (!tr.selection.empty) tr.deleteSelection();

  tr.setMeta(placeholderPlugin, {
    add: { id, pos: tr.selection.from },
  });

  context.pmViews.main.dispatch(tr);

  const extraData = { fileId: fileData.fileId };

  let pos = findPlaceholder(context.pmViews.main.state, id, placeholderPlugin);
  // If the content around the placeholder has been deleted, drop
  // the image

  if (pos == null) {
    pos = context.pmViews.main.state.selection.from;
    // return
  }

  // if paragraph is empty don't break into new line
  if (context.pmViews.main.state.doc.resolve(pos).parent.nodeSize === 2) {
    pos -= 1;
  }

  const imageId = uuidv4();

  if (caption) {
    context.pmViews.main.dispatch(
      context.pmViews.main.state.tr
        .replaceWith(
          pos,
          pos,
          context.pmViews.main.state.schema.nodes.figure.create({}, [
            context.pmViews.main.state.schema.nodes.image.create({
              src: `${serverUrl}/file/${fileData.file.id}`,
              id: imageId,
              alt: altText,
              fileid: fileData.fileId,
              extraData,
              ...(showLongDesc ? { 'aria-describedby': uuidv4() } : {}),
            }),
            context.pmViews.main.state.schema.nodes.figcaption.create(
              { id: imageId },
              context.pmViews.main.state.schema.text(caption),
            ),
          ]),
        )
        .setMeta(placeholderPlugin, { remove: { id } }),
    );
  } else {
    context.pmViews.main.dispatch(
      context.pmViews.main.state.tr
        .replaceWith(
          pos,
          pos,
          context.pmViews.main.state.schema.nodes.image.create({
            src: `${serverUrl}/file/${fileData.file.id}`,
            id: imageId,
            alt: altText,
            fileid: fileData.fileId,
            extraData,
            ...(showLongDesc ? { 'aria-describedby': uuidv4() } : {}),
          }),
        )
        .setMeta(placeholderPlugin, { remove: { id } }),
    );
  }
};

export default insertImage;
