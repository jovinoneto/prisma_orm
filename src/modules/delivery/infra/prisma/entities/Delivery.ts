import { v4 as uuid } from 'uuid';

export class Delivery {
  public readonly id: string;

  item_name: string;
  id_client: string;
  id_deliveryman?: string;

  constructor(props: Omit<Delivery, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}
