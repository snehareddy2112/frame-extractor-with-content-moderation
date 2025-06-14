import { Controller, Post, Body, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { VideoService } from './video.service';
import { extname } from 'path';

@Controller('upload')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post('process')
  @UseInterceptors(FileInterceptor('video'))
  async processVideo(@UploadedFile() file: Express.Multer.File) {
    const videoPath = file.path;  // Path of the uploaded video
    const result = await this.videoService.moderateVideo(videoPath);
    return result;
  }
}
