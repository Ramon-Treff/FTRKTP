export class GenderNeutralGuyModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    return {
      age: new fields.StringField(),
      personality: new fields.StringField(),
      appearance: new fields.StringField(),
      stats: new fields.SchemaField({
        body: new fields.NumberField(),
        pace: new fields.NumberField(),
        mind: new fields.NumberField(),
        aura: new fields.NumberField(),
      }),
      attributeModifiers: new fields.SchemaField({
        fit: new fields.NumberField(),
        will: new fields.NumberField(),
        hot: new fields.NumberField(),
        precision: new fields.NumberField(),
        trick: new fields.NumberField(),
        confidence: new fields.NumberField(),
      }),
      // age: new fields.StringField(),
      // personality: new fields.StringField(),
      // appearance: new fields.StringField(),
    };
  }
  prepareBaseData() {
    super.prepareBaseData();
    this.stats.body = this.stats.body || 0;
    this.stats.pace = this.stats.pace || 0;
    this.stats.mind = this.stats.mind || 0;
    this.stats.aura = this.stats.aura || 0;

    // this.stats.age = this.stats.age || "";
    // this.stats.appearance = this.stats.appearance || "";
    // this.stats.personality = this.stats.personality || "";

    this.attributeModifiers.fit = this.attributeModifiers.fit || 0;
    this.attributeModifiers.will = this.attributeModifiers.will || 0;
    this.attributeModifiers.hot = this.attributeModifiers.hot || 0;
    this.attributeModifiers.precision = this.attributeModifiers.precision || 0;
    this.attributeModifiers.trick = this.attributeModifiers.trick || 0;
    this.attributeModifiers.confidence =
      this.attributeModifiers.confidence || 0;
  }

  prepareDerivedData() {
    super.prepareDerivedData();
    this.items = this.items || new Collection();
  }
}

export class ItemModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    return {
      description: new fields.StringField(),
    };
  }
  prepareBaseData() {
    super.prepareBaseData();
  }
  prepareDerivedData() {
    super.prepareDerivedData();
  }
}
