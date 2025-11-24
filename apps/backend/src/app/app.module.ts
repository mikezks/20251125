import { Module } from '@nestjs/common';
import { OpenAiModule } from './openai/openai.module';
import { NaviationAiModule } from './nav-config/nav.module';
import { MfeDiscoveryModule } from './mfe-discovery/mfe-discovery.module';

@Module({
  imports: [
    MfeDiscoveryModule,
    NaviationAiModule,
    OpenAiModule,
  ],
})
export class AppModule {}
