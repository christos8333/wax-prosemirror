import { Service } from 'wax-prosemirror-core';
import InlineServices from './index';

class InlineAnnotationsService extends Service {
  dependencies = InlineServices;
}

export default InlineAnnotationsService;
