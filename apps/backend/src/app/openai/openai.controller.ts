import { Controller, Get, Query } from '@nestjs/common';
import { OpenAiService } from './openai.service';

@Controller('openai')
export class OpenAiController {
  constructor(private readonly openAiService: OpenAiService) {}

  @Get('navigation')
  async translate(@Query('describe') input: string): Promise<unknown> {
    return this.openAiService.translateNaturalLanguage(input);
  }
}
