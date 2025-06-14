import { Test, TestingModule } from '@nestjs/testing';
import { FrameExtractorService } from './frame-extractor.service';

describe('FrameExtractorService', () => {
  let service: FrameExtractorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FrameExtractorService],
    }).compile();

    service = module.get<FrameExtractorService>(FrameExtractorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
