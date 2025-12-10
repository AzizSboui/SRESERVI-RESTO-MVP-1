'use server';
/**
 * @fileOverview A restaurant chat AI agent.
 *
 * - restaurantChat - A function that handles the restaurant chat process.
 * - ChatMessage - The type for a single chat message.
 * - RestaurantChatInput - The input type for the restaurantChat function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { restaurants } from '@/lib/data';

const ChatMessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});
export type ChatMessage = z.infer<typeof ChatMessageSchema>;

const RestaurantChatInputSchema = z.object({
  history: z.array(ChatMessageSchema),
  message: z.string(),
});
export type RestaurantChatInput = z.infer<typeof RestaurantChatInputSchema>;

export async function restaurantChat(input: RestaurantChatInput): Promise<string> {
  const result = await restaurantChatFlow(input);
  return result;
}

const restaurantChatFlow = ai.defineFlow(
  {
    name: 'restaurantChatFlow',
    inputSchema: RestaurantChatInputSchema,
    outputSchema: z.string(),
  },
  async ({ history, message }) => {
    const restaurantData = JSON.stringify(
      restaurants.map((r) => ({
        name: r.name,
        cuisine: r.cuisine,
        rating: r.rating,
        description: r.description,
        address: r.address,
      })),
      null,
      2
    );

    const prompt = `You are a friendly and helpful AI assistant for 'DineEase', a restaurant reservation website. Your goal is to help users find the perfect restaurant.

You have access to the following restaurant data:
${restaurantData}

Current conversation history:
${history.map((m) => `${m.role}: ${m.content}`).join('\n')}

Based on all the information above, please provide a concise and helpful response to the user's message.
User: ${message}
Model:`;

    const llmResponse = await ai.generate({
      prompt: prompt,
      history: history,
    });
    
    return llmResponse.text;
  }
);
