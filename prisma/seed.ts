import 'dotenv/config'
import { prisma } from '../lib/db'

async function main() {
  console.log('🌱 Seeding database...')
  const initialCategories = [
    { slug: 'everyday', name: 'DILYA Everyday', tagline: 'FOR EVERY DAY', image: '/images/categories/beaute.png' },
    { slug: 'move', name: 'DILYA Move', tagline: 'MOVE YOUR WAY', image: '/images/categories/nouveautes.png' },
    { slug: 'night', name: 'DILYA Night', tagline: 'SOFT NIGHTS', image: '/images/categories/soins.png' },
    { slug: 'accessories', name: 'DILYA Accessories', tagline: 'THE FINISHING TOUCH', image: '/images/categories/accessoires.png' },
  ]
  for (const cat of initialCategories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    })
  }

  const categories = await prisma.category.findMany()
  const catMap: Record<string, string> = {}
  for (const cat of categories) {
    catMap[cat.slug] = cat.id
  }

  const sampleReviews = [
    { author: 'Awa D.', rating: 5, date: new Date('2025-11-02'), text: 'Qualité au rendez-vous, livraison rapide. Je recommande vivement.' },
    { author: 'Fatou N.', rating: 4, date: new Date('2025-10-21'), text: 'Très joli produit, conforme à la description. Emballage soigné.' },
  ]

  // Helper to create or update a product
  async function upsertProduct(data: {
    id: string
    slug: string
    name: string
    categorySlug: string
    price: number
    oldPrice?: number
    isNew: boolean
    inStock: boolean
    stock: number
    shortDescription: string
    description: string
    informations: string[]
    images: string[]
    variant?: { label: string; options: string[] }
    sizes?: string[]
    colors?: string[]
  }) {
    const existing = await prisma.product.findUnique({ where: { slug: data.slug } })
    if (existing) {
      console.log(`  ↩  Skipping existing: ${data.name}`)
      return
    }

    await prisma.product.create({
      data: {
        slug: data.slug,
        name: data.name,
        categoryId: catMap[data.categorySlug],
        price: data.price,
        oldPrice: data.oldPrice,
        isNew: data.isNew,
        inStock: data.inStock,
        stock: data.stock,
        shortDescription: data.shortDescription,
        description: data.description,
        sizes: data.sizes ? JSON.stringify(data.sizes) : null,
        colors: data.colors ? JSON.stringify(data.colors) : null,
        images: {
          create: data.images.map((url, position) => ({ url, position })),
        },
        informations: {
          create: data.informations.map((value, position) => ({ value, position })),
        },
        ...(data.variant
          ? {
              variants: {
                create: {
                  label: data.variant.label,
                  options: JSON.stringify(data.variant.options),
                },
              },
            }
          : {}),
        reviews: {
          create: sampleReviews,
        },
      },
    })
    console.log(`  ✅ Created: ${data.name}`)
  }

  const productsToSeed = [
    { id: 'p1', slug: 'pyjama-soie', name: 'Pyjama en Soie', categorySlug: 'night', price: 10000, isNew: false, inStock: true, stock: 42, shortDescription: 'Pour des nuits douces.', description: "Parfait pour se prélasser.", informations: ['Taille: S, M, L'], images: ['/placeholder.svg'], sizes: ['S', 'M', 'L'], colors: ['#000000', '#800020'] },
    { id: 'p2', slug: 'bague-fine', name: 'Bague Fine', categorySlug: 'accessories', price: 3000, isNew: true, inStock: true, stock: 18, shortDescription: 'Bague dorée.', description: 'Une bague délicate.', informations: ['Finition dorée'], images: ['/placeholder.svg'], colors: ['#FFD700'] },
    { id: 'p3', slug: 'ensemble-sport', name: 'Ensemble Sport', categorySlug: 'move', price: 10000, oldPrice: 12000, isNew: false, inStock: true, stock: 30, shortDescription: 'Confort et maintien.', description: "Le choix parfait pour le sport.", informations: ['Taille: S, M, L'], images: ['/placeholder.svg'], sizes: ['S', 'M', 'L'], colors: ['#000000', '#A9A9A9'] },
    { id: 'p4', slug: 'collier-minimal', name: 'Collier Minimaliste', categorySlug: 'accessories', price: 4500, isNew: true, inStock: true, stock: 25, shortDescription: 'Collier pratique et chic.', description: 'Un indispensable.', informations: ['Matière: Acier inoxydable'], images: ['/placeholder.svg'], colors: ['#FFD700', '#C0C0C0'] },
    { id: 'p5', slug: 't-shirt-everyday', name: 'T-Shirt Everyday', categorySlug: 'everyday', price: 12500, isNew: false, inStock: true, stock: 20, shortDescription: 'Le t-shirt blanc.', description: "S'accorde avec tout.", informations: ['Coton 100%'], images: ['/placeholder.svg'], sizes: ['XS', 'S', 'M', 'L'], colors: ['#FFFFFF', '#000000'] },
    { id: 'p6', slug: 'pantalon-cargo', name: 'Pantalon Cargo', categorySlug: 'everyday', price: 15000, isNew: true, inStock: true, stock: 19, shortDescription: 'Pantalon cargo confortable.', description: 'Confort et style réunis.', informations: ['Couleur beige'], images: ['/placeholder.svg'], sizes: ['S', 'M', 'L'], colors: ['#F5F5DC', '#000000'] },
    { id: 'p7', slug: 'nuisette-dentelle', name: 'Nuisette Dentelle', categorySlug: 'night', price: 10000, isNew: true, inStock: true, stock: 28, shortDescription: 'Douceur et légèreté.', description: "Nuisette confortable.", informations: ['Fini brillant'], images: ['/placeholder.svg'], sizes: ['S', 'M', 'L'], colors: ['#C0C0C0', '#000000'] },
    { id: 'p8', slug: 'legging-move', name: 'Legging Move', categorySlug: 'move', price: 8500, isNew: false, inStock: true, stock: 12, shortDescription: 'Legging stretch.', description: "Coupe impeccable pour le sport.", informations: ['Entretien: Lavage à froid'], images: ['/placeholder.svg'], sizes: ['S', 'M', 'L'], colors: ['#000000', '#0000FF'] },
  ]

  // On supprime d'abord tous les produits pour repartir sur une base propre
  await prisma.orderItem.deleteMany({})
  await prisma.order.deleteMany({})
  await prisma.product.deleteMany({})

  for (const product of productsToSeed) {
    await upsertProduct(product)
  }

  const articlesToSeed = [
    {
      slug: '5-facons-de-porter',
      title: '5 façons de porter votre pièce DILYA',
      excerpt: 'Découvrez nos astuces pour transformer une seule pièce en 5 looks différents.',
      content: 'Le secret d\'une garde-robe réussie réside dans la polyvalence des pièces.\n\n## 1. Avec des accessoires dorés\nLes bijoux fins mettent en valeur la coupe.\n\n## 2. En mode décontracté\nAvec des baskets blanches pour le week-end.',
      category: 'STYLE & MODE',
      readTime: '3 min',
      image: '/ChatGPT Image 2 sept. 2026, 03_23_15.png',
      isPublished: true,
      publishedAt: new Date(),
    },
    {
      slug: 'essentiels-garde-robe',
      title: 'Les essentiels d\'une garde-robe élégante',
      excerpt: 'Les pièces maîtresses pour construire une garde-robe intemporelle et chic.',
      content: 'Il suffit de quelques bonnes pièces pour être toujours bien habillée.\n\n## Le blazer noir\nUn classique indémodable.\n\n## La robe de soirée\nPrête pour toutes les invitations.',
      category: 'INSPIRATION',
      readTime: '4 min',
      image: '/ChatGPT Image 2 sept. 2026, 03_20_13.png',
      isPublished: true,
      publishedAt: new Date(),
    },
    {
      slug: 'look-dilya-night',
      title: 'Comment composer un look DILYA NIGHT',
      excerpt: 'Guide pour briller en soirée avec notre nouvelle collection.',
      content: 'Pour une soirée réussie, le look compte autant que l\'attitude.\n\n## Miser sur l\'élégance\nPrivilégiez les coupes fluides.\n\n## Les détails qui tuent\nPaillettes, bijoux, accessoires...',
      category: 'GUIDE STYLE',
      readTime: '5 min',
      image: '/ChatGPT Image 2 sept. 2026, 03_20_04.png',
      isPublished: true,
      publishedAt: new Date(),
    }
  ]

  await prisma.article.deleteMany({})
  for (const article of articlesToSeed) {
    await prisma.article.create({ data: article })
  }

  console.log('✅ Seeding complete!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
