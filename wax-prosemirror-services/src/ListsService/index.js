import BulletListService from './BulletListService/BulletListService';
import OrderedListService from './OrderedListService/OrderedListService';
import JoinUpService from './JoinUpService/JoinUpService';
import LiftService from './LiftService/LiftService';
import ListItemService from './ListItemService/ListItemService';
import BlockQuoteService from './BlockQuoteService/BlockQuoteService';
import ListToolGroupService from './ListToolGroupService/ListToolGroupService';

export default [
  new BlockQuoteService(),
  new ListItemService(),
  new BulletListService(),
  new OrderedListService(),
  new JoinUpService(),
  new LiftService(),
  new ListToolGroupService(),
];
