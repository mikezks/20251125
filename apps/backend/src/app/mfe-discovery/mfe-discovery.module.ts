import { Module } from '@nestjs/common';
import { MfeDiscoveryController } from './mfe-discovery.controller';
import { MfeDiscoveryService } from './mfe-discovery.service';

@Module({
  controllers: [MfeDiscoveryController],
  providers: [MfeDiscoveryService],
})
export class MfeDiscoveryModule {}
