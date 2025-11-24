import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';
import { zodTextFormat } from 'openai/helpers/zod';
import zodSchema from './schema/schema';
import { getSystemPrompt } from './openai.config';


@Injectable()
export class OpenAiService {
  private readonly openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async translateNaturalLanguage(input: string): Promise<unknown> {
  
    const completion = await this.openai.responses.parse({
      model: 'gpt-4o-2024-08-06',
      input: [
        { role: 'system', content: await getSystemPrompt() },
        { role: 'user', content: input },
      ],
      temperature: 0.2,
      text: {
        format: zodTextFormat(zodSchema, 'json_object')
      }
    });

    return completion.output_parsed;
  }
}

/**
 * http://localhost:3000/openai/navigation?describe=add%20a%20booking%20feature.
 */
