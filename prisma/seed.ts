import 'dotenv/config'
import { prisma } from '../lib/db'

async function main() {
  console.log('🌱 Seeding database...')
  const initialCategories = [
    { slug: 'everyday', name: 'DILYA EVERYDAY', tagline: 'Les pièces du quotidien, faciles à porter et à associer.', image: '/images/categories/beaute.png' },
    { slug: 'night', name: 'DILYA NIGHT', tagline: 'Les pièces plus habillées, soirées, sorties, événements.', image: '/images/categories/soins.png' },
    { slug: 'accessories', name: 'DILYA ACCESSORIES', tagline: 'Les accessoires.', image: '/images/categories/accessoires.png' },
    { slug: 'exclusives', name: 'DILYA EXCLUSIVES', tagline: 'Pièces exclusives et nouveautés.', image: '/images/categories/nouveautes.png' },
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
    { id: 'p1', slug: 'robe-elegante', name: 'Robe Élégante', categorySlug: 'night', price: 25000, isNew: false, inStock: true, stock: 42, shortDescription: 'Une robe noire classique pour vos soirées.', description: "Parfaite pour toutes les occasions habillées.", informations: ['Taille: S, M, L'], images: ['/placeholder.svg'], sizes: ['S', 'M', 'L'], colors: ['#000000', '#800020'] },
    { id: 'p2', slug: 'bracelet-elegance', name: 'Bracelet Élégance', categorySlug: 'accessories', price: 10000, isNew: true, inStock: true, stock: 18, shortDescription: 'Bracelet fin doré, une touche discrète et raffinée au quotidien.', description: 'Un bracelet délicat en perles dorées, pensé pour accompagner tous vos looks.', informations: ['Finition dorée'], images: ['/placeholder.svg'], colors: ['#FFD700', '#C0C0C0'] },
    { id: 'p3', slug: 'ensemble-casual', name: 'Ensemble Casual', categorySlug: 'everyday', price: 18500, oldPrice: 20000, isNew: false, inStock: true, stock: 30, shortDescription: 'Un ensemble confortable pour tous les jours.', description: "Le choix parfait pour le confort et le style au quotidien.", informations: ['Taille: S, M, L, XL'], images: ['/placeholder.svg'], sizes: ['S', 'M', 'L', 'XL'], colors: ['#F5F5DC', '#A9A9A9'] },
    { id: 'p4', slug: 'sac-cuir', name: 'Sac en Cuir', categorySlug: 'accessories', price: 35000, isNew: true, inStock: true, stock: 25, shortDescription: 'Sac pratique et chic.', description: 'Un indispensable pour transporter vos affaires avec style.', informations: ['Matière: Simili cuir'], images: ['/placeholder.svg'], colors: ['#8B4513', '#000000'] },
    { id: 'p5', slug: 't-shirt-basique', name: 'T-Shirt Basique', categorySlug: 'everyday', price: 11000, isNew: false, inStock: true, stock: 20, shortDescription: 'Le t-shirt blanc indispensable.', description: "S'accorde avec tout, parfait pour le style DILYA EVERYDAY.", informations: ['Coton 100%'], images: ['/placeholder.svg'], sizes: ['XS', 'S', 'M', 'L'], colors: ['#FFFFFF', '#000000'] },
    { id: 'p6', slug: 'pantalon-fluide', name: 'Pantalon Fluide', categorySlug: 'everyday', price: 22500, isNew: true, inStock: true, stock: 19, shortDescription: 'Pantalon taille haute fluide.', description: 'Confort et style réunis.', informations: ['Léger', 'Couleur beige'], images: ['/placeholder.svg'], sizes: ['S', 'M', 'L'], colors: ['#F5F5DC', '#000000', '#808080'] },
    { id: 'p7', slug: 'robe-paillettes', name: 'Robe Paillettes', categorySlug: 'night', price: 45000, isNew: true, inStock: true, stock: 28, shortDescription: 'Pour briller en soirée.', description: "Attirez tous les regards avec cette robe exclusive.", informations: ['Fini brillant'], images: ['/placeholder.svg'], sizes: ['S', 'M', 'L'], colors: ['#C0C0C0', '#FFD700'] },
    { id: 'p8', slug: 'blazer-chic', name: 'Blazer Chic', categorySlug: 'exclusives', price: 55000, oldPrice: 65000, isNew: false, inStock: true, stock: 12, shortDescription: 'Le blazer coupe droite.', description: "Coupe impeccable pour un look structuré et moderne.", informations: ['Entretien: Nettoyage à sec'], images: ['/placeholder.svg'], sizes: ['S', 'M', 'L'], colors: ['#000000', '#F5F5DC'] },
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
