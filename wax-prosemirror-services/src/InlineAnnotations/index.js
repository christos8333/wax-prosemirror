import CodeService from './CodeService/CodeService';
import StrongService from './StrongService/StrongService';
import EmphasisService from './EmphasisService/EmphasisService';
import SubscriptService from './SubscriptService/SubscriptService';
import SuperscriptService from './SuperscriptService/SuperscriptService';
import StrikeThroughService from './StrikeThroughService/StrikeThroughService';
import UnderlineService from './UnderlineService/UnderlineService';
import SmallCapsService from './SmallCapsService/SmallCapsService';

export default [
  new CodeService(),
  new StrongService(),
  new EmphasisService(),
  new SubscriptService(),
  new SuperscriptService(),
  new StrikeThroughService(),
  new UnderlineService(),
  new SmallCapsService(),
];
