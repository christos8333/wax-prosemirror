import CodeService from "./CodeService/CodeService";
import StrongService from "./StrongService/StrongService";
import LinkService from "./LinkService/LinkService";
import EmphasisService from "./EmphasisService/EmphasisService";
export default [
  new CodeService(),
  new StrongService(),
  new LinkService(),
  new EmphasisService()
];
