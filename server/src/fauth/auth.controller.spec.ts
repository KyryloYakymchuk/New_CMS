import { Test, TestingModule } from '@nestjs/testing';
import { FauthController } from './fauth.controller';

describe('FauthController', () => {
  let controller: FauthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FauthController],
    }).compile();

    controller = module.get<FauthController>(FauthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
