import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import YAML from 'yaml';
import { Coordinator } from './coordinator.js';
import { behaviors } from './behaviors.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadYaml(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  return YAML.parse(content);
}

function main() {
  const coordinatorYaml = path.join(__dirname, 'templates', 'coordinator.yaml');
  const specialistsYaml = path.join(__dirname, 'templates', 'specialists.yaml');

  const coordinatorTemplate = loadYaml(coordinatorYaml);
  const specialistTemplates = loadYaml(specialistsYaml);

  const coordinator = new Coordinator({
    coordinatorTemplate,
    specialistTemplates,
    behaviors,
  });

  const task = process.argv.slice(2).join(' ') || 'Generate meta templates for defined agentic roles';

  coordinator.runPipeline(task).then((result) => {
    console.log('--- PIPELINE RESULT ---');
    console.log(JSON.stringify(result, null, 2));
  }).catch((err) => {
    console.error('Pipeline failed:', err);
    process.exit(1);
  });
}

main();

