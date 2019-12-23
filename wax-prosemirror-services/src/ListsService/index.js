import BulletListService from "./BulletListService/BulletListService";
import OrderedListService from "./OrderedListService/OrderedListService";
import JoinUpService from "./JoinUpService/JoinUpService";
import LiftService from "./LiftService/LiftService";

export default [
  new BulletListService(),
  new OrderedListService(),
  new JoinUpService(),
  new LiftService()
];
