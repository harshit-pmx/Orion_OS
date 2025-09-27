'use server';

/**
 * @fileOverview A task prioritization AI agent.
 *
 * - prioritizeTasks - A function that handles the task prioritization process.
 * - PrioritizeTasksInput - The input type for the prioritizeTasks function.
 * - PrioritizeTasksOutput - The return type for the prioritizeTasks function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PrioritizeTasksInputSchema = z.object({
  goals: z.array(z.string()).describe('A list of the user\'s goals.'),
  deadlines: z.array(z.string()).describe('A list of deadlines associated with the user\'s goals.'),
  tasks: z.array(z.string()).describe('A list of tasks to be prioritized.'),
});
export type PrioritizeTasksInput = z.infer<typeof PrioritizeTasksInputSchema>;

const PrioritizeTasksOutputSchema = z.object({
  prioritizedTasks: z.array(z.string()).describe('A list of tasks, prioritized based on the goals and deadlines.'),
});
export type PrioritizeTasksOutput = z.infer<typeof PrioritizeTasksOutputSchema>;

export async function prioritizeTasks(input: PrioritizeTasksInput): Promise<PrioritizeTasksOutput> {
  return prioritizeTasksFlow(input);
}

const prompt = ai.definePrompt({
  name: 'prioritizeTasksPrompt',
  input: {schema: PrioritizeTasksInputSchema},
  output: {schema: PrioritizeTasksOutputSchema},
  prompt: `You are an AI assistant designed to prioritize tasks based on goals and deadlines.

  Prioritize the following tasks based on how well they align with the user's goals and deadlines. Return the tasks in a prioritized order, with the most important tasks listed first.

  Goals: {{{goals}}}
  Deadlines: {{{deadlines}}}
  Tasks: {{{tasks}}}

  Prioritized Tasks:`,
});

const prioritizeTasksFlow = ai.defineFlow(
  {
    name: 'prioritizeTasksFlow',
    inputSchema: PrioritizeTasksInputSchema,
    outputSchema: PrioritizeTasksOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
