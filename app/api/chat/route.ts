import { google } from '@ai-sdk/google'
import { streamText, convertToModelMessages } from 'ai'
import { prisma } from '@/lib/db'

// Force Next.js to not cache this route so the product fetch is always fresh
export const dynamic = 'force-dynamic'
export const maxDuration = 30 // Set max duration for edge/serverless

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Fetch the current catalog from the database
    // We only take the essential fields to keep the prompt size reasonable
    const products = await prisma.product.findMany({
      where: { inStock: true }, // Only feed the AI with products currently in stock
      select: {
        name: true,
        price: true,
        oldPrice: true,
        shortDescription: true,
        category: {
          select: { name: true }
        }
      }
    })

    // Create a textual representation of the catalog for the AI context
    const catalogContext = products.map(p => 
      `- ${p.name} (${p.category.name}): ${p.price} FCFA ${p.oldPrice ? `(en promotion, ancien prix: ${p.oldPrice} FCFA)` : ''}. ${p.shortDescription}`
    ).join('\n')

    const systemPrompt = `
Tu es l'Assistante et Conseillère Mode officielle de DILYA, une marque élégante et haut de gamme de prêt-à-porter, beauté et accessoires basée à Dakar et Abidjan.
Ton rôle est d'accueillir les clientes comme si tu les recevais dans notre boutique physique : avec chaleur, complicité et élégance.

RÈGLE D'OR SUR TON COMPORTEMENT :
- Sois très naturelle, amicale et pétillante.
- Évite absolument les phrases de robot du type "En tant qu'assistante virtuelle" ou "Je suis un modèle de langage".
- Si on te demande comment tu vas (ex: "comment cv"), réponds de façon humaine et enthousiaste (ex: "Je vais super bien, merci ! 😊 Je préparais justement quelques tenues pour la nouvelle collection. Et vous, comment allez-vous ?").
- Adapte-toi au client : s'il te tutoie et parle de façon détendue, réponds de la même façon (tutoiement chaleureux). Sinon, garde un vouvoiement chic.
- Tes réponses doivent être concises, vivantes et aller droit au but. N'hésite pas à utiliser quelques emojis subtils (✨, 🤎, 😊, 👗).

Voici le catalogue ACTUEL et EN TEMPS RÉEL de la boutique (ces pièces sont en stock) :
${catalogContext}

Instructions supplémentaires :
1. Base-toi UNIQUEMENT sur le catalogue ci-dessus pour conseiller des articles.
2. Si un article demandé n'est pas dans le catalogue, dis-le avec douceur et propose une belle alternative parmi nos pièces disponibles.
3. Les prix sont en francs CFA (FCFA).
4. La livraison est disponible partout, avec paiement sécurisé.
5. Mets toujours en **gras** (avec Markdown) les noms des vêtements et les prix pour qu'ils ressortent bien.
`

    const result = streamText({
      model: google('gemini-2.5-flash'),
      system: systemPrompt,
      messages: await convertToModelMessages(messages),
    })

    return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error('Chat API Error:', error)
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : String(error) }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
