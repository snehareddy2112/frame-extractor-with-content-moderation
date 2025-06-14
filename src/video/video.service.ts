import { Injectable } from '@nestjs/common';
import { FrameExtractorService } from './frame-extractor/frame-extractor.service';
import { SightengineService } from '../moderation/sightengine/sightengine.service';
import * as path from 'path';

export interface ModerationResult {
  frame: string;
  moderation: {
    status: 'passed' | 'failed';
    reasons: string[];
  };
}

@Injectable()
export class VideoService {
  constructor(
    private readonly frameExtractor: FrameExtractorService,
    private readonly sightengine: SightengineService,
  ) {}

  async processVideoForModeration(filePath: string): Promise<{
    summary: ModerationResult[];
    finalDecision: 'Approved' | 'Rejected';
  }> {
    const fullPath = path.resolve(filePath);  // Resolve the full path for the video
    const frames = await this.frameExtractor.extractFrames(fullPath);  // Extract frames from the video
    const results: ModerationResult[] = [];

    // Loop through each extracted frame and check for moderation
    for (const framePath of frames) {
      let result;

      // Try to moderate the frame, handle any errors gracefully
      try {
        result = await this.sightengine.moderateImage(framePath);
      } catch (error) {
        console.error('Error moderating frame:', framePath, error);
        results.push({
          frame: path.basename(framePath),
          moderation: {
            status: 'failed',
            reasons: ['error'],
          },
        });
        continue;  // Skip this frame and move to the next one
      }

      // Collect reasons for moderation failure
      const reasons: string[] = [];

      if (result?.weapon?.prob > 0.5) reasons.push('weapon');
      if (result?.violence?.prob > 0.5) reasons.push('violence');
      if (result?.gore?.prob > 0.5) reasons.push('gore');
      if (result?.nudity?.raw > 0.5 || result?.nudity?.sexual_activity > 0.5)
        reasons.push('nudity');
      if (result?.alcohol?.prob > 0.5) reasons.push('alcohol');
      if (result?.drugs?.prob > 0.5) reasons.push('drugs');
      if (result?.gambling?.prob > 0.5) reasons.push('gambling');
      if (result?.tobacco?.prob > 0.5) reasons.push('tobacco');
      if (result?.selfharm?.prob > 0.5) reasons.push('selfharm');

      // Store the result for each frame
      results.push({
        frame: path.basename(framePath),
        moderation: {
          status: reasons.length > 0 ? 'failed' : 'passed',
          reasons,
        },
      });
    }

    // Determine the final decision based on the results
    const anyFailed = results.some((r) => r.moderation.status === 'failed');

    return {
      summary: results,
      finalDecision: anyFailed ? 'Rejected' : 'Approved',
    };
  }
}
