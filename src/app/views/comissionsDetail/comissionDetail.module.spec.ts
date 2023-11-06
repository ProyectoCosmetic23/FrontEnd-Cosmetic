import { ComissionDetailModule } from './comissionDetail.module';

describe('ComissionDetailModule', () => {
  let comissionDetailModule: ComissionDetailModule;

  beforeEach(() => {
    comissionDetailModule = new ComissionDetailModule();
  });

  it('should create an instance', () => {
    expect(comissionDetailModule).toBeTruthy();
  });
});
