import { createParamDecorator, ExecutionContext, PipeTransform, Type } from '@nestjs/common';
import { PrismaClient, User } from 'generated/prisma';
import { getPrismaClient } from 'generated/prisma/runtime/library';

/**
 * Parameter decorator that extracts the user object from the request.
 * This decorator retrieves the user information that was attached
 * during authentication by the PrivyAuthGuard.
 * 
 * @example
 * // Get the entire user object
 * @Get('profile')
 * getProfile(@CurrentUser() user) {
 *   return user;
 * }
 * 
 * @example
 * // Get a specific property from the user
 * @Get('profile-id')
 * getProfileId(@CurrentUser('id') userId: string) {
 *   return { id: userId };
 * }
 */
export const CurrentUser = createParamDecorator(
  async (data: string | undefined, ctx: ExecutionContext): Promise<User | null> => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    const prismaClient = new PrismaClient();

    // If a specific property is requested and it exists on the user object
    if (data && user) {
      return user[data];
    }
    const userPrisma = await prismaClient.user.findFirst({
      where: {
        wallet_address: user.wallet.address
      }
    });

    return userPrisma;

  },
);

// Type definition for the CurrentUser decorator to help TypeScript
export type CurrentUserType = typeof CurrentUser;