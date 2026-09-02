import 'dotenv/config'
import { prisma } from '../lib/db'

const articles = [
  {
    slug: 'essentiels-garde-robe-minimaliste',
    title: "Les essentiels d'une garde-robe minimaliste",
    excerpt:
      "La clé d'un style élégant sans effort réside dans quelques pièces maîtresses. Découvrez les 5 vêtements indispensables pour construire une garde-robe minimaliste et intemporelle.",
    category: 'Style & Tendances',
    readTime: '4 min',
    image: '/images/blog-1.jpg',
    isPublished: true,
    publishedAt: new Date('2026-08-28'),
    content: `## 1. Le blazer bien coupé

Un blazer noir ou beige de bonne qualité est la pierre angulaire d'un dressing chic. Il structure immédiatement une tenue, qu'il soit porté sur une robe élégante pour le soir ou avec un jean décontracté en journée.

## 2. La chemise blanche oversize

Empruntée au vestiaire masculin, la chemise blanche se décline à l'infini. Nouée à la taille, portée ouverte sur un débardeur ou boutonnée de manière classique, elle apporte toujours une touche de lumière.

## 3. Le pantalon fluide

Confortable mais sophistiqué, le pantalon fluide taille haute allonge la silhouette. Choisissez-le dans une teinte neutre (noir, marine, beige) pour qu'il s'associe facilement avec le reste de vos vêtements.

> 💡 Astuce DILYA : Investissez toujours dans la qualité de vos basiques. Une belle matière (soie, coton bio, laine) fait toute la différence sur le tombé du vêtement.

## 4. La petite robe noire revisitée

L'indétrônable "Little Black Dress" est indispensable. Optez pour une coupe simple qui met en valeur votre morphologie. Le secret réside dans l'accessoirisation selon l'occasion.

## 5. L'ensemble casual-chic

Un ensemble coordonné (comme notre "Ensemble Casual") est la solution parfaite pour les jours où vous ne savez pas quoi porter. Il garantit une allure soignée en quelques secondes.`,
  },
  {
    slug: 'comment-accessoiriser-tenue-basique',
    title: 'L\'art d\'accessoiriser une tenue basique',
    excerpt:
      "Un jean, un t-shirt blanc... Comment transformer une tenue banale en un look pointu et élégant ? Tout se joue dans le choix des accessoires. Leçon de style.",
    category: 'Accessoires',
    readTime: '5 min',
    image: '/images/blog-2.jpg',
    isPublished: true,
    publishedAt: new Date('2026-08-20'),
    content: `## Le pouvoir du sac à main

Le sac n'est pas qu'un contenant, c'est l'âme de votre tenue. Un beau sac en cuir structuré apporte instantanément du sérieux et du chic à un ensemble décontracté. 

## Accumulation de bijoux (Stacking)

Sur un haut simple, n'hésitez pas à superposer plusieurs colliers fins de différentes longueurs, ou à accumuler des bracelets fins. 

- Privilégiez une seule couleur de métal (tout or ou tout argent) pour rester chic.
- Les perles reviennent en force et adoucissent un look un peu trop strict.

> 💡 Conseil DILYA : Si vous optez pour des boucles d'oreilles imposantes (comme des grandes créoles), allégez le reste de vos bijoux pour ne pas surcharger la silhouette.

## L'importance des détails

Parfois, un simple foulard en soie noué autour du cou, à la anse de votre sac ou même dans vos cheveux suffit à apporter la touche de couleur et de raffinement qui manquait.

Chez DILYA, notre catégorie *Accessories* a été pensée précisément pour vous offrir ces détails qui feront toute la différence.`,
  },
  {
    slug: 'retour-elegance-intemporelle',
    title: 'Le retour de l\'élégance intemporelle',
    excerpt:
      "Fini la fast-fashion et les tendances éphémères. La mode revient à l'essentiel : des coupes parfaites, des couleurs neutres et une allure intemporelle. Décryptage d'un mouvement qui s'installe.",
    category: 'Inspirations',
    readTime: '6 min',
    image: '/images/blog-3.jpg',
    isPublished: true,
    publishedAt: new Date('2026-08-10'),
    content: `## Moins, mais mieux

Nous assistons à un véritable retour aux sources. La tendance "Quiet Luxury" ou l'élégance discrète prône des vêtements sans logos apparents, où le luxe se devine par la qualité des finitions et la noblesse des matières.

## Les couleurs de l'intemporel

La palette de cette nouvelle élégance est douce et rassurante :
- Le camel et le beige
- Le blanc cassé et le crème
- Le noir profond
- Les nuances de gris et le bleu marine

Ces teintes ont l'avantage de s'associer parfaitement entre elles, permettant de multiplier les tenues avec un minimum de pièces.

## L'esthétique DILYA

C'est exactement cette philosophie qui nous a guidé pour créer DILYA. Nous voulions une marque qui célèbre la femme moderne, celle qui cherche à être élégante de jour comme de nuit (*Everyday & Night*), sans pour autant renoncer à son confort.

L'élégance n'est plus une contrainte, elle devient une expression naturelle de soi.`,
  },
]

async function main() {
  console.log('Seeding articles...')
  for (const article of articles) {
    await prisma.article.upsert({
      where: { slug: article.slug },
      update: article,
      create: article,
    })
    console.log(`✓ ${article.title}`)
  }
  console.log('Done!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
