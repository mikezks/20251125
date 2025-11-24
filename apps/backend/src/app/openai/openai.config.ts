import { readFile } from 'node:fs/promises';
import path from 'node:path';


export async function getSystemPrompt(): Promise<string> {
  const __dirname = path.resolve(process.cwd(), 'apps', 'backend', 'src', 'app');
  
  const schemaPath = path.join(__dirname, 'openai', 'schema', 'schema.json');
  const schema = JSON.parse(await readFile(schemaPath, 'utf-8'));
  const schemaStr = JSON.stringify(schema, null, 2);

  const navConfigPath = path.join(__dirname, 'nav-config', 'nav.config.json');
  const nav = JSON.parse(await readFile(navConfigPath, 'utf-8'));
  const navStr = JSON.stringify(nav, null, 2);
  
  const [date, time] = new Date().toISOString().split('T');

  return [
    `Convert the following input according to this JSON schema: ${ schemaStr }`,
    `Use the following JSON schema as known state to decide which navigation config is allowed: ${ navStr }`,
    `Use the description property to get additional context and decide, whether the user's request can be fulfilled with a proper navigation config.`,
    `If the user's request can not be fulfilled, add a proper message to the result structure.`,
    `If parts can be fulfilled, add a message for the successful results as well.`,
    `Never suggest navigation configs that are not available in the navigation config input.`,
    `If the user requests a micro frontend, an app, a view, a screen, a UI, a feature, a route, or a component treat this as navigation config item.`,
    `If those terms are mixed in the user prompt, treat them as one context.`,
    `It has high priority to not add navigation configs in case the user instruction contains a clear instruction for this.`,
    `Remove duplicate entries.`,
    `Remove "Home" as this is added automatically.`,
    `Today's date is ${ date }.`,
    `Current time is ${ time }.`,
    `Interpret all relative dates and times accordingly.`,
    `Correct typos for values and care about case sensitivity for values and labels.`,
    `Route and icon values are always lowercase.`,
  ].join('\n');
}
