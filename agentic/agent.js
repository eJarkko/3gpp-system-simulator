// Simple base Agent class used by the coordinator to execute role behaviors
export class Agent {
  constructor({ name, roleKey, systemPrompt, behavior }) {
    this.name = name;
    this.roleKey = roleKey;
    this.systemPrompt = systemPrompt || '';
    this.behavior = behavior;
  }

  async handleTask(input) {
    if (typeof this.behavior !== 'function') {
      return { output: null, notes: `No behavior implemented for role ${this.roleKey}` };
    }
    const result = await this.behavior({ input, systemPrompt: this.systemPrompt });
    return result;
  }
}

