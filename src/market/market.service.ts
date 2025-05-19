import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { SupabaseService } from "src/supabase/supabase.service";
import { GetMarketDto } from "./dto/get-market.dto";



@Injectable()
export class MarketService {
  constructor(private readonly supabaseService: SupabaseService, private prismaService: PrismaService) { }


  async createMarket(
    description: string,
    question: string,
    expiry_date: Date,
    image: string | undefined,
    userId: number
  ) {
    const data = await this.prismaService.market.create({
      data: {
        description,
        question,
        expiry_date,
        image,
        creatorId: userId,
      }
    })

    return data;
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

}