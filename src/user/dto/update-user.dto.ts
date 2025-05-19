import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Your username should be unique',
    example: 'forcaster3',
    minLength: 6,
  })
  username?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'About me',
    example: "I'm forcaster",
  })
  about?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Optional profile image URL',
    example: 'https://example.com/market-image.png',
  })
  profile_pic?: string;
}
