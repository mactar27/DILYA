import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCategories, getProductsByCategory } from '@/lib/products'
import { BoutiqueLayout } from '@/components/boutique/boutique-layout'

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
    <BoutiqueLayout
      title={category.name}
      products={categoryProducts}
      categories={categories}
      currentCategorySlug={category.slug}
    />
  )
}
