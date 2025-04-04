export default class CustomItemSheet extends ItemSheet {
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["ftrktp", "sheet", "item"],
      template: "systems/FTRKTP/templates/sheets/item-sheet.hbs",
      width: 500,
      height: 400,
    });
  }

  getData(options) {
    const data = super.getData(options);
    data.description = data.item.system.description;
    return data;
  }
}
