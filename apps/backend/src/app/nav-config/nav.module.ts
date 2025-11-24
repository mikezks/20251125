import { Module } from '@nestjs/common';
import { NavigationConfigController } from './nav.controller';
import { NavConfigService } from './nav.service';

@Module({
  controllers: [NavigationConfigController],
  providers: [NavConfigService],
})
export class NaviationAiModule {}
