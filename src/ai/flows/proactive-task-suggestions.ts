// FILE: src/ai/flows/proactive-task-suggestions.ts
'use server';

/**
 * @fileOverview An AI agent for proactively suggesting relevant tasks and actions.
 *
 * - getProactiveTaskSuggestions - A function that generates proactive task suggestions.
 * - ProactiveTaskSuggestionsInput - The input type for the getProactiveTaskSuggestions function.
 * - ProactiveTaskSuggestionsOutput - The return type for the getProactiveTaskSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProactiveTaskSuggestionsInputSchema = z.object({
  goals: z.array(z.string()).describe('The user\u2019s current goals.'),
  schedule: z.array(z.string()).describe('The user\u2019s current schedule.'),
  completedTasks: z.array(z.string()).describe('List of tasks the user has recently completed.'),
  preferences: z.object({
    focusWindows: z.array(z.string()).describe('The user\u2019s preferred focus windows.'),
    notificationStyle: z.string().describe('The user\u2019s preferred notification style.'),
  }).describe('The user\u2019s preferences.'),
});
export type ProactiveTaskSuggestionsInput = z.infer<
  typeof ProactiveTaskSuggestionsInputSchema
>;

const ProactiveTaskSuggestionsOutputSchema = z.array(
  z.object({
    title: z.string().describe('The title of the suggested task or action.'),
    reason: z.string().describe('The reason why this task or action is being suggested.'),
  })
);
export type ProactiveTaskSuggestionsOutput = z.infer<
  typeof ProactiveTaskSuggestionsOutputSchema
>;

export async function getProactiveTaskSuggestions(
  input: ProactiveTaskSuggestionsInput
): Promise<ProactiveTaskSuggestionsOutput> {
  return proactiveTaskSuggestionsFlow(input);
}

const proactiveTaskSuggestionsPrompt = ai.definePrompt({
  name: 'proactiveTaskSuggestionsPrompt',
  input: {schema: ProactiveTaskSuggestionsInputSchema},
  output: {schema: ProactiveTaskSuggestionsOutputSchema},
  prompt: `You are an AI assistant designed to proactively suggest tasks and actions to users based on their goals, schedule, completed tasks and preferences.

  Suggest tasks and actions that will help the user achieve their goals and optimize their productivity.
  Consider the user's schedule and focus windows when suggesting tasks.
  Take into account recently completed tasks to avoid suggesting redundant actions.
  The notification style the user selected impacts the intrusiveness of the suggestion - gentle notifications are less important than assertive ones.

  Goals: {{#each goals}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
  Schedule: {{#each schedule}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
  Completed Tasks: {{#each completedTasks}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
  Preferences: Focus Windows - {{#each preferences.focusWindows}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}, Notification Style - {{{preferences.notificationStyle}}}

  Proactive Task Suggestions:
  `,
});

const proactiveTaskSuggestionsFlow = ai.defineFlow(
  {
    name: 'proactiveTaskSuggestionsFlow',
    inputSchema: ProactiveTaskSuggestionsInputSchema,
    outputSchema: ProactiveTaskSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await proactiveTaskSuggestionsPrompt(input);
    return output!;
  }
);
