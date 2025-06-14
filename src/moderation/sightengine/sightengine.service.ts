import { Injectable } from '@nestjs/common';
import * as Sightengine from 'sightengine';

@Injectable()
export class SightengineService {
  private client: any;

  constructor() {
    this.client = Sightengine(
      process.env.SIGHTENGINE_API_USER, 
      process.env.SIGHTENGINE_API_SECRET
    );
  }

  async moderateImage(imagePath: string): Promise<any> {
    try {
      const response = await this.client
        .check([imagePath], { models: 'nudity,violence,weapon,alcohol,drugs,gore,selfharm,gambling,tobacco' });
      return response[0];
    } catch (error) {
      console.error('Error moderating image:', error);
      throw new Error('Error moderating image');
    }
  }
}
