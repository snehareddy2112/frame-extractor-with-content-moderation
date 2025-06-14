import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { VideoModule } from './video/video.module';  // Import the VideoModule

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // So you don't have to import it in every module
    }),
    VideoModule,  // Add the VideoModule here
  ],
})
export class AppModule {}
