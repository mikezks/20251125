import { Injectable } from '@nestjs/common';
import { readFile } from 'node:fs/promises';
import path from 'node:path';


@Injectable()
export class MfeDiscoveryService {
  async getConfig(): Promise<Record<string, string>> {
  
    const __dirname = path.resolve(process.cwd(), 'apps', 'backend', 'src', 'app');
      
    const schemaPath = path.join(__dirname, 'mfe-discovery', 'mfe.config.json');
    const schema = JSON.parse(await readFile(schemaPath, 'utf-8'));

    return schema;
  }
}

/**
 * http://localhost:3000/navigation/config
 */
