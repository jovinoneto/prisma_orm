import { inject, injectable } from 'tsyringe';

import { IDeliverymanRepository } from '@modules/account/repositories/IDeliverymanRepository';

import { DeleteDeliverymanError } from './DeleteDeliverymanError';

@injectable()
export class DeleteDeliverymanUseCase {
  constructor(
    @inject('DeliverymanRepository')
    private deliverymanRepository: IDeliverymanRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const deliveryman = await this.deliverymanRepository.findById(id);

    if (!deliveryman) {
      throw new DeleteDeliverymanError();
    }

    await this.deliverymanRepository.delete(id);
  }
}
