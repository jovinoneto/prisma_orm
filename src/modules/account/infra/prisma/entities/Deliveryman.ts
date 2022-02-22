import { v4 as uuid } from 'uuid';

export class Deliveryman {
  public readonly id: string;

  name: string;
  username: string;
  password: string;

  constructor(props: Omit<Deliveryman, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}
