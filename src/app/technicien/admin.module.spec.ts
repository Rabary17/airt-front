import { TechnicienModule } from './technicien.module';

describe('AdminModule', () => {
  let adminModule: TechnicienModule;

  beforeEach(() => {
    adminModule = new TechnicienModule();
  });

  it('should create an instance', () => {
    expect(adminModule).toBeTruthy();
  });
});
