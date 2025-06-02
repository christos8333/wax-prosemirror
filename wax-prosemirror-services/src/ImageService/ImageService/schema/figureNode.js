import { SchemaHelpers } from 'wax-prosemirror-core'

const figureNode = {
  attrs: {
    id: { default: '' },
    track: { default: [] },
    group: { default: '' },
    viewid: { default: '' },
  },
  content: 'image* figcaption{0,1}',
  group: 'block',
  selectable: true,
  isolating: true,
  marks: '',
  parseDOM: [
    {
      tag: 'figure',
      getAttrs(dom) {
        return {
          id: dom.dataset.id,
          track: SchemaHelpers.parseTracks(dom.dataset.track),
          group: dom.dataset.group,
          viewid: dom.dataset.viewid,
        }
      },
    },
  ],
  toDOM(node) {
    const attrs = {}
    if (node.attrs.track?.length) {
      attrs['data-id'] = node.attrs.id
      attrs['data-track'] = JSON.stringify(node.attrs.track)
      attrs['data-group'] = node.attrs.group
      attrs['data-viewid'] = node.attrs.viewid
    }
    return ['figure', attrs, 0]
  },
}

export default figureNode
