import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { SupabaseService } from "src/supabase/supabase.service";
import { GetMarketDto } from "./dto/get-market.dto";



@Injectable()
export class MarketService {
  constructor(private prismaService: PrismaService) { }


  async createMarket(
    description: string,
    resolution_criteria: string,
    question: string,
    expiry_date: Date,
    image: string | undefined,
    contract_address: string,
    userId: number
  ) {

    const market = await this.prismaService.market.create({
      data: {
        description,
        resolution_criteria,
        question,
        expiry_date,
        image,
        contract_address,
        creatorId: userId,
      }
    })

    await this.prismaService.outcome.create({
      data: {
        outcome_title: "YES",
        marketID: market.id,
      }
    })

    await this.prismaService.outcome.create({
      data: {
        outcome_title: "NO",
        marketID: market.id,
      }
    })

    return market;
  }


  async getMarkets(getMarketDto: GetMarketDto) {

    const { page = 1, size = 10, id, question, tags, sortBy = "asc", orderBy = "id" } = getMarketDto;

    const where: any = {};

    if (id) {
      where.id = id;
    }

    if (question) {
      where.question = {
        contains: question,
        mode: "insensitive"
      }
    }

    if (tags && tags.length > 0) {
      where.tags = {
        hasSome: tags,
      }
    }

    const [data, total] = await Promise.all([
      this.prismaService.market.findMany({
        where,
        skip: (page - 1) * size,
        take: size,
        orderBy: {
          [orderBy]: sortBy,
        },
        include: {
          creator: {
            select: {
              id: true,
              username: true,
              wallet_address: true
            }
          },
          outcome: {
            select: {
              id: true,
              outcome_title: true
            }
          }
        }
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


  async getMarket(marketId: number) {

    const market = await this.prismaService.market.findFirst({
      where: {
        id: marketId
      },
      include: {
        creator: {
          select: {
            id: true,
            username: true,
            wallet_address: true
          }
        },
        outcome: {
          select: {
            id: true,
            outcome_title: true
          }
        }
      }
    })

    if (!market) {
      throw new NotFoundException("Market doest not exists!");
    }

    return market;

  }

}