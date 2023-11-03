import { CategoryModule } from './category.module';

describe('CategoryModule', () => {
  let categoriaModule: CategoryModule;

  beforeEach(() => {
    categoriaModule = new CategoryModule();
  });

  it('should create an instance', () => {
    expect(categoriaModule).toBeTruthy();
  });
});
