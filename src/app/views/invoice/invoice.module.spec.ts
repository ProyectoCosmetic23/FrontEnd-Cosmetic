import { PurchaseModule } from './invoice.module';

describe('PurchaseModule', () => {
  let invoiceModule: PurchaseModule;

  beforeEach(() => {
    invoiceModule = new PurchaseModule();
  });

  it('should create an instance', () => {
    expect(invoiceModule).toBeTruthy();
  });
});
