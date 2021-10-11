import { Test, TestingModule } from '@nestjs/testing';
import {NetworkUserService} from "./networkUser.service";

describe('NetworkUserService', () => {
  let service: NetworkUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NetworkUserService],
    }).compile();

    service = module.get<NetworkUserService>(NetworkUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
