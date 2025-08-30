// Simple, deterministic mock behaviors for demo purposes

export async function domainSpecialistBehavior({ input, systemPrompt }) {
  const { task } = input;
  return {
    output: {
      analysis: `Analysis for: ${task}`,
      keyPoints: [
        'Summarized requirements',
        'Identified constraints',
        'Outlined approach per template guidance',
      ],
      prompt: systemPrompt,
    },
  };
}

export async function reviewerBehavior({ input, systemPrompt }) {
  const { task, prior } = input;
  const issues = [];
  if (!prior?.output?.analysis) issues.push('Missing analysis');
  return {
    output: {
      reviewSummary: `Review of task: ${task}`,
      issues,
      improvements: [
        'Clarify assumptions',
        'Add edge cases',
      ],
      prompt: systemPrompt,
    },
  };
}

export async function evaluatorBehavior({ input, systemPrompt }) {
  const { analysis, review } = input.prior || {};
  const hasAnalysis = Boolean(analysis?.output?.analysis);
  const hasReview = Boolean(review?.output?.reviewSummary);
  const score = (hasAnalysis ? 0.6 : 0) + (hasReview ? 0.4 : 0);
  return {
    output: {
      score,
      verdict: score >= 0.8 ? 'strong' : score >= 0.5 ? 'acceptable' : 'weak',
      prompt: systemPrompt,
    },
  };
}

export const behaviors = {
  domain_specialist: domainSpecialistBehavior,
  reviewer: reviewerBehavior,
  evaluator: evaluatorBehavior,
};

