// src/moderation/sightengine/sightengine.module.ts

import { Module } from '@nestjs/common';
import { SightengineService } from './sightengine.service';

@Module({
  providers: [SightengineService],
  exports: [SightengineService],
})
export class SightengineModule {}
