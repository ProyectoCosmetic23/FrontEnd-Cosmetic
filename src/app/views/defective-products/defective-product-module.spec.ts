import { DefectiveProductModule } from './defective-product-module';

describe('DefectiveProductModule', () => {
  let defectiveProductModule: DefectiveProductModule;

  beforeEach(() => {
    defectiveProductModule = new DefectiveProductModule();
  });

  it('should create an instance', () => {
    expect(defectiveProductModule).toBeTruthy();
  });
});