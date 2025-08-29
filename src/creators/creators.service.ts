import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TwitterService } from '../twitter/twitter.service';

export interface CreateCreatorDto {
  twitter_username: string;
}

export interface CreatorResponse {
  id: number;
  twitter_username: string;
  twitter_name: string;
  profile_image_url: string;
  position: number;
  joined_at: Date;
}

@Injectable()
export class CreatorsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly twitterService: TwitterService
  ) {}

  async joinCreators(dto: CreateCreatorDto): Promise<CreatorResponse> {
    const validationResult = await this.twitterService.validateUsername(dto.twitter_username);
    
    if (!validationResult.isValid || !validationResult.user) {
      throw new ConflictException(validationResult.error || 'Invalid Twitter username');
    }

    const existingCreator = await this.prisma.creator.findUnique({
      where: { twitter_username: validationResult.user.username.toLowerCase() }
    });

    if (existingCreator) {
      throw new ConflictException('This username has already joined the creator\'s program');
    }

    const currentMax = await this.prisma.creator.aggregate({
      _max: { position: true }
    });
    const nextPosition = (currentMax._max.position || 0) + 1;

    const creator = await this.prisma.creator.create({
      data: {
        twitter_username: validationResult.user.username.toLowerCase(),
        twitter_name: validationResult.user.name,
        profile_image_url: validationResult.user.profile_image_url,
        position: nextPosition
      }
    });

    return creator;
  }

  async getCreators(): Promise<CreatorResponse[]> {
    return this.prisma.creator.findMany({
      orderBy: { position: 'asc' },
      take: 50
    });
  }

  async getCreatorCount(): Promise<number> {
    return this.prisma.creator.count();
  }
}