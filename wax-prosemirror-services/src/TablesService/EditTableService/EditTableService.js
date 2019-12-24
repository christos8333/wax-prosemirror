import Service from "wax-prosemirror-core/src/services/Service";
import Table from "./Table";

class EditTableService extends Service {
  boot() {}

  register() {
    this.container.bind("TableDropDownOptions").to(TableDropDownOptions);
  }
}

export default EditTableService;
