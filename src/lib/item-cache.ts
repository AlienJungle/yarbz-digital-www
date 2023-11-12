import { add } from "date-fns";

export class ItemCache<TItem> {
  private value: TItem;
  private lifetimeMinutes: number;
  private loadAction: () => Promise<TItem>;
  private description: string;

  private expiryTime: Date | null;

  constructor(
    initialValue: TItem,
    lifetimeMinutes: number,
    loadAction: () => Promise<TItem>,
    description: string,
  ) {
    this.expiryTime = null;

    this.value = initialValue;
    this.lifetimeMinutes = lifetimeMinutes;
    this.loadAction = loadAction;
    this.description = description;
  }

  public async load(): Promise<TItem> {
    console.log(`Loading item cache for ${this.description}...`);
    this.expiryTime = add(new Date(), { minutes: this.lifetimeMinutes });
    this.value = await this.loadAction();
    console.log(`Successfully loaded item cache for ${this.description}!`);
    return this.value;
  }

  public async get(): Promise<TItem> {
    const now = new Date();
    if (!this.expiryTime || now > this.expiryTime) {
      console.log(`Item cache for ${this.description} has expired.`);
      return this.load();
    }

    return this.value;
  }
}
