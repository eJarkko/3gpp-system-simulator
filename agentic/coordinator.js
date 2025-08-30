import { Agent } from './agent.js';

export class Coordinator {
  constructor({ coordinatorTemplate, specialistTemplates, behaviors }) {
    this.coordinatorTemplate = coordinatorTemplate;
    this.specialistTemplates = specialistTemplates;
    this.behaviors = behaviors;
  }

  spawnAgents() {
    const agents = new Map();
    const { specialists = [] } = this.coordinatorTemplate || {};
    for (const spec of specialists) {
      const template = this.specialistTemplates[spec.roleKey];
      if (!template) continue;
      const behavior = this.behaviors[spec.roleKey];
      const agent = new Agent({
        name: template.name || spec.roleKey,
        roleKey: spec.roleKey,
        systemPrompt: template.instructions || '',
        behavior,
      });
      agents.set(spec.roleKey, agent);
    }
    return agents;
  }

  async runPipeline(task) {
    const agents = this.spawnAgents();
    const domain = agents.get('domain_specialist');
    const reviewer = agents.get('reviewer');
    const evaluator = agents.get('evaluator');

    const steps = [];

    const analysis = domain ? await domain.handleTask({ task }) : { output: null };
    steps.push({ role: 'domain_specialist', result: analysis });

    const review = reviewer ? await reviewer.handleTask({ task, prior: analysis }) : { output: null };
    steps.push({ role: 'reviewer', result: review });

    const score = evaluator ? await evaluator.handleTask({ task, prior: { analysis, review } }) : { output: null };
    steps.push({ role: 'evaluator', result: score });

    return {
      task,
      steps,
      final: score?.output ?? null,
    };
  }
}

