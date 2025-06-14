import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { VideoService } from './video/video.service'; // Import your video service

@Controller('upload') // Defines the '/upload' base route
export class UploadController {
  constructor(private readonly videoService: VideoService) {}

  @Post()  // POST method for '/upload'
  @UseInterceptors(FileInterceptor('video'))  // This will handle file upload under 'video' field
  async upload(@UploadedFile() file: Express.Multer.File) {
    // Process the uploaded video
    const result = await this.videoService.processVideoForModeration(file.path);
    return result;  // Return the result (summary and decision)
  }
}
