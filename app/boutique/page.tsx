import { Metadata } from 'next'
import { getProducts, getCategories } from '@/lib/products'
import { BoutiqueLayout } from '@/components/boutique/boutique-layout'

export const metadata: Metadata = {
  title: 'Toute la collection DILYA | Boutique',
  description: 'Découvrez toute notre sélection.',
}

export const dynamic = 'force-dynamic'

export default async function BoutiquePage() {
  const products = await getProducts()
  const categories = await getCategories()
  
  return (
    <BoutiqueLayout 
      title="Toute la collection DILYA"
      products={products}
      categories={categories}
    />
  )
}
