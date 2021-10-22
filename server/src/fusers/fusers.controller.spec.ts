import { Test, TestingModule } from "@nestjs/testing";
import { FusersController } from "./fusers.controller";

describe("FusersController", () => {
  let controller: FusersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FusersController],
    }).compile();

    controller = module.get<FusersController>(FusersController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
