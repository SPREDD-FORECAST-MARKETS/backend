import { Injectable } from '@nestjs/common';
import { TwitterApi } from '@virtuals-protocol/game-twitter-node';
import { TwitterUser, TwitterApiResponse, TwitterValidationResult } from './twitter.types';

@Injectable()
export class TwitterService {
  private readonly gameTwitterClient: TwitterApi;

  constructor() {
    const gameTwitterAccessToken = process.env.GAME_TWITTER_ACCESS_TOKEN || '';
    if (!gameTwitterAccessToken) {
      throw new Error('GAME_TWITTER_ACCESS_TOKEN environment variable is required');
    }
    this.gameTwitterClient = new TwitterApi({
      gameTwitterAccessToken: gameTwitterAccessToken,
    });
  }

  async validateUsername(username: string): Promise<TwitterValidationResult> {
    // Remove @ symbol if present
    const cleanUsername = username.replace('@', '');

    try {
      // Use Game Framework's enterprise Twitter access with higher rate limits
      const userResult = await this.gameTwitterClient.v2.userByUsername(cleanUsername, {
        'user.fields': 'profile_image_url,name'
      });

      if (!userResult.data) {
        return { 
          isValid: false, 
          error: 'Username does not exist' 
        };
      }

      const userData = userResult.data;
      return { 
        isValid: true, 
        user: {
          id: userData.id,
          name: userData.name,
          username: userData.username,
          // Convert _normal to _400x400 for better quality
          profile_image_url: userData.profile_image_url?.replace('_normal', '_400x400') || `https://ui-avatars.com/api/?name=${cleanUsername}&background=6366f1&color=ffffff&bold=true&size=400`
        }
      };

    } catch (error) {
      console.error('Twitter API validation error:', error);
      return { 
        isValid: false, 
        error: error instanceof Error ? error.message : 'Network error' 
      };
    }
  }
}