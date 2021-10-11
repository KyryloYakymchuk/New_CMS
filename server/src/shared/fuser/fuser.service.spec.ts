import { Test, TestingModule } from '@nestjs/testing';
import { FuserService } from './fuser.service';

describe('FuserService', () => {
  let service: FuserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FuserService],
    }).compile();

    service = module.get<FuserService>(FuserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
