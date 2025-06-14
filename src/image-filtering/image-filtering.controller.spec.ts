import { Test, TestingModule } from '@nestjs/testing';
import { ImageFilteringController } from './image-filtering.controller';

describe('ImageFilteringController', () => {
  let controller: ImageFilteringController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImageFilteringController],
    }).compile();

    controller = module.get<ImageFilteringController>(ImageFilteringController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
