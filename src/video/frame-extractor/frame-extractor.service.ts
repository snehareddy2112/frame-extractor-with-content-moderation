import { Injectable } from '@nestjs/common';
import * as ffmpeg from 'fluent-ffmpeg';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FrameExtractorService {
  extractFrames(filePath: string): Promise<string[]> {
    const frames: string[] = [];
    const outputDir = path.join(__dirname, '../../uploads/frames');
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

    return new Promise((resolve, reject) => {
      ffmpeg(filePath)
        .on('end', () => resolve(frames))
        .on('error', (err) => reject(err))
        .screenshots({
          count: 5, // Number of frames to extract
          folder: outputDir,
          size: '320x240',
          filename: '%b-%i.png',
        })
        .on('filenames', (fileNames) => {
          frames.push(...fileNames.map((name) => path.join(outputDir, name)));
        });
    });
  }
}
