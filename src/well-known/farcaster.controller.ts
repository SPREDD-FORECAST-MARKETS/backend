import { Controller, Get, Redirect } from '@nestjs/common';

@Controller('.well-known')
export class FarcasterController {
  @Get('farcaster.json')
  @Redirect(
    'https://api.farcaster.xyz/miniapps/hosted-manifest/01988ea0-f663-ea51-b91f-6af5058d5f3e',
    307,
  )
  manifestRedirect() {
    // Optional: return { url: '...', statusCode: 307 }
  }
}
