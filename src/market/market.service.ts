import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { SupabaseService } from "src/supabase/supabase.service";



@Injectable()
export class MarketService {
  constructor(private readonly supabaseService: SupabaseService, private prismaService: PrismaService) {}


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

}