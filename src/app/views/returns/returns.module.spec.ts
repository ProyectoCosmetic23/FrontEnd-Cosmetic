import { ReturnsModule } from "./returns.module"; 

describe('ReturnsModule', () => {
    let returnsModule: ReturnsModule;

    beforeEach(() => {
        returnsModule = new ReturnsModule();
    });

    it('should create an instance', () => {
        expect(returnsModule).toBeTruthy();
    });
});