import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { GetMyCreatedMarketsDto, UserFilterDto } from "./dto/get-user.dto";
import { UserDto } from "./dto/user.dto";
import { Prisma } from "generated/prisma";


@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) { }


  async updateUser(
    cleanedDto: any,
    userId: number,
  ) {

    const data = await this.prismaService.user.update({
      where: {
        id: userId
      },
      data: cleanedDto
    })

    return data;
  }

  async getMe(
    userId: number,
  ) {
    const data = await this.prismaService.user.findFirst({
      where: {
        id: userId
      }
    })

    return data;
  }


  async findUsers(filterDto: UserFilterDto): Promise<UserDto[]> {
    const { id, walletAddress, marketId } = filterDto;

    // Build where conditions
    const where: Prisma.UserWhereInput = {};

    // Filter by single ID
    if (id) {
      where.id = id;
    }


    // Filter by wallet address
    if (walletAddress) {
      where.wallet_address = walletAddress;
    }

    // Filter by market ID (users who participated in a specific market)
    if (marketId) {
      where.OR = [
        // Users who created the market
        { markets: { some: { id: marketId } } }
      ];
    }

    // Fetch users with filters
    const users = await this.prismaService.user.findMany({
      where,
      orderBy: {
        id: 'asc'
      },
    });

    return users;
  }


  async getMyCreatedMarkets(
    filterDto: GetMyCreatedMarketsDto,
    userId: number
  ) {

    const { page = 1, size = 10 } = filterDto;
    const where = { creatorId: userId }

    const [data, total] = await Promise.all([
      this.prismaService.market.findMany({
        where,
        skip: (page - 1) * size,
        take: size,
      }),
      this.prismaService.market.count({ where })
    ])

    return {
      meta: {
        total,
        page,
        size,
        totalPage: Math.ceil(total / size)
      },
      data
    };

  }

}