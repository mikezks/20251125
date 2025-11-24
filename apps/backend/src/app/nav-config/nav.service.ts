import { Injectable } from '@nestjs/common';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { NavigationConfig } from "@flight-demo/shared/navigation";



@Injectable()
export class NavConfigService {
  async getConfig(): Promise<NavigationConfig> {
  
    const __dirname = path.resolve(process.cwd(), 'apps', 'backend', 'src', 'app');
      
    const schemaPath = path.join(__dirname, 'nav-config', 'nav.config.json');
    const schema = JSON.parse(await readFile(schemaPath, 'utf-8'));

    return schema;
  }
}

/**
 * http://localhost:3000/navigation/config
 */

