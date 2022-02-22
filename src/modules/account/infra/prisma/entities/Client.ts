import { v4 as uuid } from 'uuid';

export class Client {
  public readonly id: string;

  name: string;
  username: string;
  password: string;

  constructor(props: Omit<Client, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}
