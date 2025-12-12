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

    const prompt = `Vous êtes un assistant IA amical et serviable pour 'ResRVI', un site web de réservation de restaurants. Votre objectif est d'aider les utilisateurs à trouver le restaurant parfait et à utiliser le site. Vous devez toujours répondre en français.

FONCTIONNALITÉS DU SITE :
- Les utilisateurs peuvent rechercher des restaurants sur la page d'accueil.
- Pour réserver, l'utilisateur doit visiter la page d'un restaurant, choisir une date, une heure, un nombre de personnes et une table disponible.
- Il y a des pages de connexion ('/login') et d'inscription ('/signup').
- Après la réservation, l'utilisateur arrive sur une page de confirmation avec un QR code.
- L'annulation d'une réservation est possible depuis la page de confirmation.

Vous avez accès aux données des restaurants suivants :
${restaurantData}

Historique de la conversation actuelle :
${history.map((m) => `${m.role}: ${m.content}`).join('\n')}

En vous basant sur toutes les informations ci-dessus, veuillez fournir une réponse concise et utile au message de l'utilisateur. Si l'utilisateur demande comment faire une action (réserver, s'inscrire), guidez-le.
Utilisateur: ${message}
Modèle:`;

    const llmResponse = await ai.generate({
      prompt: prompt,
      history: history,
    });
    
    return llmResponse.text;
  }
);
