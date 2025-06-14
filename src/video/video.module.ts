import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { FrameExtractorService } from './frame-extractor/frame-extractor.service';
import { SightengineService } from '../moderation/sightengine/sightengine.service';
import { UploadController } from './upload.controller';

@Module({
  imports: [],
  controllers: [UploadController],  // Add the UploadController
  providers: [VideoService, FrameExtractorService, SightengineService],  // Add the necessary services
})
export class VideoModule {}
