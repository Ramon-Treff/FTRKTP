/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
export default class guyActorSheet extends ActorSheet {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["ftrktp", "sheet", "actor"],
      template: "systems/FTRKTP/templates/sheets/guy-actor-sheet.hbs",
      width: 1000,
      height: 800,
    });
  }
  getData(options) {
    const data = super.getData(options);
    data.stats = data.actor.system.stats;
    data.luck = data.actor.system.luck;
    data.luckMax = data.actor.system.luckMax;
    data.attributeModifiers = data.actor.system.attributeModifiers;
    data.age = data.actor.system.age;
    data.personality = data.actor.system.personality;
    data.appearance = data.actor.system.appearance;

    return data;
  }

  activateListeners(html) {
    super.activateListeners(html);
    // Add event listeners for item roll buttons
    html.find(".item-roll").click(this._onItemRoll.bind(this));
    html.find(".item-create").click(this._onItemCreate.bind(this));
    html.find(".item-edit").click((ev) => {
      const itemId = $(ev.currentTarget).data("item-id");
      const item = this.actor.items.get(itemId);
      if (item) {
        item.sheet.render(true); // Open item sheet
      }
    });
    html.find(".item-delete").click(async (ev) => {
      const itemId = $(ev.currentTarget).data("item-id");
      const item = this.actor.items.get(itemId);
      if (item) {
        // Ask for confirmation before deleting
        const confirmation = await Dialog.confirm({
          title: `Delete ${item.name}`,
          content: `Are you sure you want to delete ${item.name}?`,
          yes: async () => {
            await this.actor.deleteEmbeddedDocuments("Item", [itemId]); // Delete the item
            console.log(`Deleted ${item.name}`);
          },
        });
      }
    });
  }

  async _onItemRoll(event) {
    event.preventDefault();
    const skill = event.target?.dataset?.skill;
    const skillValue = event.target?.dataset?.skillValue;
    if (!skillValue) return;

    // Get the dice formula from the button's data attribute
    const diceFormula = event.currentTarget.dataset.dice || "2d10";

    // Roll the dice
    const roll = new Roll(diceFormula);
    await roll.roll({ async: true });

    const diceResults = roll.dice[0].results.map((result) => {
      return result.result;
    });
    let successes = 0;
    diceResults.forEach((res) => {
      if (res === 10) {
        successes--;
      }
      if (res === 1) {
        successes++;
      }
      if (res <= skillValue) {
        successes++;
      }
    });

    const successIcon = "✅";
    const failureIcon = "❌";
    let icons = "";
    let style = "text-align: center;";
    let text = "No Successes or Failures";
    if (successes == 4) {
      text = "Critical Success!";
      icons = successIcon.repeat(5);
      style += "color: green; font-weight: bold;";
    } else if (successes > 0) {
      text = `Successes: ${successes}`;
      icons = successIcon.repeat(successes);
    } else if (successes == -2) {
      text = "Critical Failure!";
      icons = failureIcon.repeat(5);
      style += "color: #a82121; font-weight: bold;";
    } else if (successes < 0) {
      text = `Failures: ${Math.abs(successes)}`;
      icons = failureIcon.repeat(Math.abs(successes));
    }

    // Ensure Foundry's dice roll display appears in chat
    await roll.toMessage(
      {
        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        flavor: `Rolling for ${skill || "an action"}!`,
        content: `
        <div style="${style}">
          <div>
            <strong>Rolls</strong><br>
            ${diceResults.join(" + ")}<br>
          </div>
          <div style="text-align: center; color: inherit;">
            <strong>${text}</strong><br>
            ${icons}
          </div>
        </div>
      `,
      },
      { rollMode: "roll" }
    );
  }

  async _onItemCreate(event) {
    event.preventDefault();
    const itemData = {
      name: "Item name",
      type: "item",
    };

    return this.actor.createEmbeddedDocuments("Item", [itemData]);
  }
}
