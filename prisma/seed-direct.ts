/**
 * Direct seed script using mariadb driver (bypasses Prisma adapter/transaction issues).
 * TiDB Serverless is MySQL-compatible over TCP — the raw mariadb driver works fine.
 */
import * as mariadb from 'mariadb'
import { randomUUID } from 'crypto'
import 'dotenv/config'

const dbUrl = new URL(process.env.DATABASE_URL || '')
const pool = mariadb.createPool({
  host: dbUrl.hostname,
  port: Number(dbUrl.port) || 4000,
  user: dbUrl.username,
  password: dbUrl.password,
  database: dbUrl.pathname.slice(1),
  ssl: true,
  connectionLimit: 5,
  connectTimeout: 30000, // 30s — TiDB Serverless can be slow to wake
  socketTimeout: 30000,
})

async function run() {
  const conn = await pool.getConnection()
  console.log('🌱 Seeding database...')

  try {
    // ------ CATEGORIES ------
    const categories = [
      { id: randomUUID(), slug: 'beaute', name: 'Beauté', tagline: 'Produits beauté et maquillage', image: '/images/categories/beaute.png' },
      { id: randomUUID(), slug: 'accessoires', name: 'Accessoires', tagline: 'Bracelets et accessoires', image: '/images/categories/accessoires.png' },
      { id: randomUUID(), slug: 'soins', name: 'Soins', tagline: 'Produits de soin et bien-être', image: '/images/categories/soins.png' },
    ]

    for (const c of categories) {
      await conn.query(
        'INSERT INTO categories (id, slug, name, tagline, image) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE name=VALUES(name)',
        [c.id, c.slug, c.name, c.tagline, c.image]
      )
    }
    console.log('  ✅ Categories inserted')

    // Fetch category IDs
    const catRows = await conn.query('SELECT id, slug FROM categories') as { id: string; slug: string }[]
    const catMap: Record<string, string> = {}
    for (const r of catRows) catMap[r.slug] = r.id

    // ------ PRODUCTS ------
    const products = [
      { slug: 'savon-noir', name: 'Savon Noir', categorySlug: 'soins', price: 7500, isNew: false, inStock: true, stock: 42, shortDescription: 'Savon noir traditionnel pour une peau nette, douce et purifiée.', description: "Un savon noir authentique, riche et onctueux, qui nettoie en profondeur tout en respectant l'équilibre de la peau.", informations: ['Contenance : 200 g', 'Convient à tous types de peau', 'Fabrication artisanale'], images: ['/images/products/savon-noir.png'] },
      { slug: 'bracelet-elegance', name: 'Bracelet Élégance', categorySlug: 'accessoires', price: 10000, isNew: true, inStock: true, stock: 18, shortDescription: 'Bracelet fin doré, une touche discrète et raffinée au quotidien.', description: 'Un bracelet délicat en perles dorées, pensé pour accompagner tous vos looks.', informations: ['Longueur ajustable', 'Finition dorée', 'Fermoir sécurisé'], images: ['/images/products/bracelet-elegance.png'], variant: { label: 'Couleur', options: ['Doré', 'Argenté'] } },
      { slug: 'mascara-volume', name: 'Mascara Volume', categorySlug: 'beaute', price: 8500, oldPrice: 10000, isNew: false, inStock: true, stock: 30, shortDescription: 'Un regard intense et volumineux, sans effet paquet.', description: "Ce mascara volumateur gaine chaque cil pour un regard profond et défini.", informations: ['Contenance : 10 ml', 'Tenue longue durée', 'Testé dermatologiquement'], images: ['/images/products/mascara-volume.png'] },
      { slug: 'huile-de-soin', name: 'Huile de soin', categorySlug: 'soins', price: 9000, isNew: true, inStock: true, stock: 25, shortDescription: 'Une huile nourrissante multi-usages pour le visage, le corps et les cheveux.', description: 'Une huile précieuse aux actifs végétaux qui nourrit intensément et sublime la peau.', informations: ['Contenance : 50 ml', 'Multi-usages', 'Sans parfum de synthèse'], images: ['/images/products/huile-de-soin.png'] },
      { slug: 'creme-hydratante', name: 'Crème Hydratante', categorySlug: 'soins', price: 11000, isNew: false, inStock: true, stock: 20, shortDescription: 'Hydratation confort 24h pour une peau souple et repulpée.', description: "Une crème riche et fondante qui restaure la barrière cutanée.", informations: ['Contenance : 50 ml', 'Hydratation 24h', 'Convient aux peaux sensibles'], images: ['/images/products/creme-hydratante.png'] },
      { slug: 'bracelet-perles', name: 'Bracelet Perles', categorySlug: 'accessoires', price: 8000, isNew: false, inStock: true, stock: 15, shortDescription: 'Bracelet en perles naturelles, élégant et lumineux.', description: 'Un bracelet raffiné en perles naturelles qui apporte une note lumineuse et féminine.', informations: ['Longueur ajustable', 'Perles naturelles', 'Fait main'], images: ['/images/products/bracelet-perles.png'] },
      { slug: 'rouge-a-levres', name: 'Rouge à Lèvres', categorySlug: 'beaute', price: 7000, isNew: true, inStock: true, stock: 28, shortDescription: 'Une teinte nude rosée, confortable et longue tenue.', description: "Un rouge à lèvres crémeux à la couleur intense et au fini satiné.", informations: ['Fini satiné', 'Longue tenue', 'Formule hydratante'], images: ['/images/products/rouge-a-levres.png'], variant: { label: 'Teinte', options: ['Nude rosé', 'Rose vif', 'Bois de rose'] } },
      { slug: 'serum-visage', name: 'Sérum Visage', categorySlug: 'soins', price: 13500, oldPrice: 15000, isNew: false, inStock: true, stock: 12, shortDescription: "Un concentré éclat pour une peau lisse et lumineuse.", description: "Ce sérum booster d'éclat unifie le teint et affine le grain de peau.", informations: ['Contenance : 30 ml', 'Effet éclat', 'Application matin et soir'], images: ['/images/products/serum-visage.png'] },
      { slug: 'bougie-parfumee', name: 'Bougie Parfumée', categorySlug: 'accessoires', price: 9500, isNew: true, inStock: true, stock: 22, shortDescription: 'Une ambiance chaleureuse et enveloppante à la maison.', description: 'Une bougie à la cire végétale et au parfum délicat.', informations: ['Durée : ~40h', 'Cire végétale', 'Parfum délicat'], images: ['/images/products/bougie-parfumee.png'] },
      { slug: 'foulard-soie', name: 'Foulard Soie', categorySlug: 'accessoires', price: 12000, isNew: false, inStock: true, stock: 10, shortDescription: 'Un foulard doux aux teintes sauge, chic et polyvalent.', description: "Un foulard fluide et raffiné qui se porte au cou, dans les cheveux ou noué à un sac.", informations: ['Dimensions : 90 x 90 cm', 'Toucher soyeux', 'Teintes sauge et ivoire'], images: ['/images/products/foulard-soie.png'] },
      { slug: 'gommage-corps', name: 'Gommage Corps', categorySlug: 'soins', price: 8500, isNew: true, inStock: true, stock: 19, shortDescription: 'Un gommage doux pour une peau lisse et éclatante.', description: 'Un gommage corps aux grains fins qui élimine les cellules mortes.', informations: ['Contenance : 200 g', 'Grains naturels', 'Rinçage facile'], images: ['/images/products/gommage-corps.png'] },
      { slug: 'huile-cheveux', name: 'Huile Cheveux', categorySlug: 'beaute', price: 9500, isNew: false, inStock: false, stock: 0, shortDescription: 'Nutrition et brillance pour des cheveux sublimés.', description: 'Une huile capillaire légère qui nourrit les longueurs.', informations: ['Contenance : 100 ml', 'Non grasse', 'Tous types de cheveux'], images: ['/images/products/huile-de-soin.png'] },
    ] as Array<{ slug: string; name: string; categorySlug: string; price: number; oldPrice?: number; isNew: boolean; inStock: boolean; stock: number; shortDescription: string; description: string; informations: string[]; images: string[]; variant?: { label: string; options: string[] } }>

    const reviews = [
      { author: 'Awa D.', rating: 5, date: '2025-11-02', text: 'Qualité au rendez-vous, livraison rapide. Je recommande vivement.' },
      { author: 'Fatou N.', rating: 4, date: '2025-10-21', text: 'Très joli produit, conforme à la description. Emballage soigné.' },
    ]

    for (const p of products) {
      // Check if exists
      const existing = await conn.query('SELECT id FROM products WHERE slug = ?', [p.slug]) as { id: string }[]
      if (existing.length > 0) {
        console.log(`  ↩  Skipping: ${p.name}`)
        continue
      }

      const productId = randomUUID()
      const now = new Date()
      await conn.query(
        'INSERT INTO products (id, slug, name, categoryId, price, oldPrice, isNew, inStock, stock, shortDescription, description, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [productId, p.slug, p.name, catMap[p.categorySlug], p.price, p.oldPrice ?? null, p.isNew ? 1 : 0, p.inStock ? 1 : 0, p.stock, p.shortDescription, p.description, now]
      )

      for (let i = 0; i < p.images.length; i++) {
        await conn.query('INSERT INTO product_images (id, productId, url, position) VALUES (?, ?, ?, ?)', [randomUUID(), productId, p.images[i], i])
      }

      for (let i = 0; i < p.informations.length; i++) {
        await conn.query('INSERT INTO product_infos (id, productId, value, position) VALUES (?, ?, ?, ?)', [randomUUID(), productId, p.informations[i], i])
      }

      if (p.variant) {
        await conn.query('INSERT INTO product_variants (id, productId, label, options) VALUES (?, ?, ?, ?)', [randomUUID(), productId, p.variant.label, JSON.stringify(p.variant.options)])
      }

      for (const r of reviews) {
        await conn.query('INSERT INTO reviews (id, productId, author, rating, date, text) VALUES (?, ?, ?, ?, ?, ?)', [randomUUID(), productId, r.author, r.rating, r.date, r.text])
      }

      console.log(`  ✅ Created: ${p.name}`)
    }

    console.log('\n✅ Seeding complete!')
  } finally {
    conn.release()
    await pool.end()
  }
}

run().catch((e) => {
  console.error('❌ Seeding failed:', e)
  process.exit(1)
})
