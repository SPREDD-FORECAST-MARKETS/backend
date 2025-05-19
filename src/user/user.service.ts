import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";


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

}