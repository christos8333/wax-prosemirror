import CodeService from "./CodeService/CodeService";
import StrongService from "./StrongService/StrongService";
import EmphasisService from "./EmphasisService/EmphasisService";
import SubscriptService from "./SubscriptService/SubscriptService";
export default [
  new CodeService(),
  new StrongService(),
  new EmphasisService(),
  new SubscriptService()
];
