const parseFormatList = str => {
  if (!str) {
    return [];
  }
  let formatList;
  try {
    formatList = JSON.parse(str);
  } catch (error) {
    return [];
  }
  if (!Array.isArray(formatList)) {
    return [];
  }
  return formatList.filter(format => typeof format === 'string');
};

const parseTracks = str => {
  if (!str) {
    return [];
  }
  let tracks;
  try {
    tracks = JSON.parse(str);
  } catch (error) {
    return [];
  }
  if (!Array.isArray(tracks)) {
    return [];
  }
  return tracks.filter(
    (
      track, // ensure required fields are present
    ) =>
      track.hasOwnProperty('user') &&
      track.hasOwnProperty('username') &&
      track.hasOwnProperty('date'),
  );
};

const blockLevelToDOM = node => {
  const attrs =
    node.attrs.track && node.attrs.track.length
      ? {
          'data-id': node.attrs.id,
          class: node.attrs.class,
          'data-track': JSON.stringify(node.attrs.track),
          'data-group': node.attrs.group,
          'data-viewid': node.attrs.viewid,
        }
      : { class: node.attrs.class };
  return attrs;
};

export default { parseFormatList, parseTracks, blockLevelToDOM };
