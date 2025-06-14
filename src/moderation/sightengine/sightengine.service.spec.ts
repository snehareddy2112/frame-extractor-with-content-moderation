import { Test, TestingModule } from '@nestjs/testing';
import { SightengineService } from './sightengine.service';

describe('SightengineService', () => {
  let service: SightengineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SightengineService],
    }).compile();

    service = module.get<SightengineService>(SightengineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
