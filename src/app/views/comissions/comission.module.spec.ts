import { ComissionModule } from './comission.module';

describe('ComissionModule', () => {
  let comissionsModule: ComissionModule;

  beforeEach(() => {
    comissionsModule = new ComissionModule();
  });

  it('should create an instance', () => {
    expect(comissionsModule).toBeTruthy();
  });
});
