import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import { getCategories, getProductsByCategory } from '@/lib/products'
import { ProductCard } from '@/components/product-card'
import { Reveal } from '@/components/reveal'

export const dynamic = 'force-dynamic'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const slug = (await params).slug
  const categories = await getCategories()
  const category = categories.find(c => c.slug === slug)

  if (!category) return { title: 'Catégorie introuvable' }

  return {
    title: `${category.name} | DILYA`,
    description: category.tagline,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const slug = (await params).slug
  const categories = await getCategories()
  const category = categories.find(c => c.slug === slug)

  if (!category) {
    notFound()
  }

  const categoryProducts = await getProductsByCategory(slug)

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12">
      <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground hover:underline">Accueil</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/boutique" className="hover:text-foreground hover:underline">Boutique</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="font-medium text-foreground">{category.name}</span>
      </nav>

      <div className="mb-12">
        <h1 className="font-serif text-3xl font-medium sm:text-4xl">{category.name}</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          {category.tagline}
        </p>
      </div>

      {categoryProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-8">
          {categoryProducts.map((product, i) => (
            <Reveal key={product.id} delay={i * 50}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="flex h-40 flex-col items-center justify-center rounded-xl bg-secondary/50 text-center">
          <p className="text-muted-foreground">Aucun produit dans cette catégorie pour le moment.</p>
        </div>
      )}
    </div>
  )
}
