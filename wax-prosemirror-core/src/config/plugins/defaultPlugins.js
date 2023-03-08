import { history } from 'prosemirror-history';
import { dropCursor } from 'prosemirror-dropcursor';
import { gapCursor } from 'prosemirror-gapcursor';
import FakeCursorPlugin from './FakeCursorPlugin';

export default [dropCursor(), gapCursor(), history()];
