import { Controller, Get, Post, Query } from '@nestjs/common';
import { NavConfigService } from './nav.service';

@Controller('navigation')
export class NavigationConfigController {
  constructor(private readonly navConfigService: NavConfigService) {}

  @Get('config')
  async translate(): Promise<unknown> {
    return this.navConfigService.getConfig()
  }
}
