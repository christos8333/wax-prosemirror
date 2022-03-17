import { InputRule } from 'prosemirror-inputrules';

const linkRule = markType => {
  return MarkInputRule(
    /(?:(?:(https|http|ftp)+):\/\/)?(?:\S+(?::\S*)?(@))?(?:(?:([a-z0-9][a-z0-9\-]*)?[a-z0-9]+)(?:\.(?:[a-z0-9\-])*[a-z0-9]+)*(?:\.(?:[a-z]{2,})(:\d{1,5})?))(?:\/[^\s]*)?\s$/i,
    markType,
    match => ({ type: match[2] === '@' ? 'email' : 'uri' }),
  );
};

const MarkInputRule = (regexp, markType, getAttrs) => {
  return new InputRule(regexp, (state, match, start, end) => {
    const $start = state.doc.resolve(start);
    const attrs = getAttrs instanceof Function ? getAttrs(match) : getAttrs;
    if (!$start.parent.type.allowsMarkType(markType)) return null;
    const linkString = match[0].substring(0, match[0].length - 1);

    const linkAttrs =
      attrs.type === 'email'
        ? { href: `mailto:${linkString}` }
        : { href: linkString, target: '_blank' };
    const oLink = markType.create(linkAttrs);

    const tr = state.tr
      .addMark(start, end, oLink)
      .insertText(' ', start + linkString.length);
    // .removeMark(
    //   start + linkString.length,
    //   start + linkString.length,
    //   markType,
    // );
    return tr;
  });
};

export default linkRule;
