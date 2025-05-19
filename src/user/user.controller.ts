

import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiSecurity } from '@nestjs/swagger';
import { PrivyAuthGuard } from 'src/auth/jwt-auth.guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { CurrentUser } from 'src/decorators';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { User } from 'generated/prisma';

@Controller('user')
export class UserController {

    constructor(private userService: UserService, private prismaService: PrismaService) { }

    @Post("update-me")
    @UseGuards(PrivyAuthGuard)
    @ApiBearerAuth()
    @ApiSecurity('bearer')
    async createToken(@Body() updateUserDto: UpdateUserDto, @CurrentUser() user: User) {

        const cleanedDto = Object.fromEntries(Object.entries(updateUserDto).filter(([_, value]) => value !== undefined && value !== ''));
        return this.userService.updateUser(cleanedDto, user.id);
    }


}
