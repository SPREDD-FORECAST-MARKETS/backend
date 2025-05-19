

import { Body, Controller, Get, HttpStatus, NotFoundException, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiSecurity } from '@nestjs/swagger';
import { PrivyAuthGuard } from 'src/auth/jwt-auth.guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { CurrentUser } from 'src/decorators';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { User } from 'generated/prisma';
import { UserDto } from './dto/user.dto';
import { UserFilterDto } from './dto/get-user.dto';

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

    @Get("filter") 
    @ApiOperation({ summary: 'Get users filtered by ID, wallet address, or market ID' })
    @ApiResponse({ 
        status: HttpStatus.OK, 
        description: 'Users retrieved successfully',
        type: [UserDto]
    })
    async findUsers(@Query() filterDto: UserFilterDto): Promise<UserDto[]> {
        return this.userService.findUsers(filterDto);
    }


}
