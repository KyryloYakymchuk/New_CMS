import { Test, TestingModule } from "@nestjs/testing";
import { FauthService } from "./fauth.service";

describe("FauthService", () => {
  let service: FauthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FauthService],
    }).compile();

    service = module.get<FauthService>(FauthService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
