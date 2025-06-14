import { Module } from '@nestjs/common';
import { SightengineService } from './sightengine/sightengine.service';

@Module({
  providers: [SightengineService],
  exports: [SightengineService], // Export it so other modules can use it
})
export class ModerationModule {}
