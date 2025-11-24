import { Controller, Get } from '@nestjs/common';
import { MfeDiscoveryService } from './mfe-discovery.service';

@Controller('discovery')
export class MfeDiscoveryController {
  constructor(private readonly openAiService: MfeDiscoveryService) {}

  @Get('mfe')
  async translate(): Promise<unknown> {
    return this.openAiService.getConfig();
  }
}
