import { GenderNeutralGuyModel, ItemModel } from "./module/data-models.mjs";
import guyActorSheet from "./module/sheets/guyActorSheet.mjs";
import itemSheet from "./module/sheets/itemSheet.mjs";

Hooks.once("init", () => {
  // Configure custom Document implementations.
  CONFIG.Actor.dataModels.genderNeutralGuy = GenderNeutralGuyModel;
  CONFIG.Item.dataModels.item = ItemModel;

  // Register custom ActorSheet
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("genderNeutralGuy", guyActorSheet, {
    makeDefault: true,
  });

  // Register custom ItemSheet
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("ftrktp", itemSheet, {
    makeDefault: true,
  });

  // Configure Handlebars helpers
  Handlebars.registerHelper("sum", function (...args) {
    args.pop();
    return args.reduce((total, num) => total + Number(num), 0);
  });
});
