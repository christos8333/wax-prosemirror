export default class Menu {
  groups = new Map();
  constructor(config = []) {

    this.addGroup()
  }

  addGroup(name, value) {
    this.groups.set(name, value);
  }

}


{
    groupNanme : "Annotation",
    tools: [
        {},{}
    ]
}
,
{
    groupNanme : "Annotation",
    tools: [
        {},{}
    ]
}