// src/users/dto/user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'generated/prisma';


export class UserDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'johndoe' })
  username: string;

  @ApiProperty({ example: 'Blockchain enthusiast and trader' })
  about: string;

  @ApiProperty({ example: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F' })
  wallet_address: string;

  @ApiProperty({ enum: Role, example: Role.USER })
  role: Role;

  @ApiProperty({ example: 'https://example.com/profile.jpg', nullable: true })
  profile_pic: string | null;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  updatedAt: Date;
}