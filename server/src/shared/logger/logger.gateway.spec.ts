import { Test, TestingModule } from "@nestjs/testing";
import { LoggerGateway } from "./logger.gateway";

describe("LoggerGateway", () => {
  let gateway: LoggerGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoggerGateway],
    }).compile();

    gateway = module.get<LoggerGateway>(LoggerGateway);
  });

  it("should be defined", () => {
    expect(gateway).toBeDefined();
  });
});
