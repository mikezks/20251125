import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app/app.module';
import { config } from 'dotenv';

config(); // .env laden

const fastifyAdapter = new FastifyAdapter();

fastifyAdapter.enableCors({
  origin: ['*']
});
  
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyAdapter
  );
  await app.listen(3000);
}
bootstrap();
