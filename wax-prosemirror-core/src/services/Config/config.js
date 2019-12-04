import LayoutService from "../../services/LayoutService/LayoutService";
import ConfigService from "./ConfigService";

export default {
  services: [new LayoutService(), new ConfigService()]
};
