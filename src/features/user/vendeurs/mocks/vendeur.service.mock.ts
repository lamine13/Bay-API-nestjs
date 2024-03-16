import { vendeurMock } from './vendeur.mock';

export class VendeurServiceMock {
  findAll = jest.fn().mockResolvedValue(vendeurMock);
}
