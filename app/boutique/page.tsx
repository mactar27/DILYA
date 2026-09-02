import { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { getProducts } from '@/lib/products'
import { ProductCard } from '@/components/product-card'
import { Reveal } from '@/components/reveal'

export const metadata: Metadata = {
  title: 'Boutique | DILYA',
  description: 'Découvrez toute notre sélection de produits de beauté, accessoires et soins.',
}

export const dynamic = 'force-dynamic'

export default async function BoutiquePage() {
  const products = await getProducts()
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12">
      <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground hover:underline">Accueil</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="font-medium text-foreground">Boutique</span>
      </nav>

      <div className="mb-12">
        <h1 className="font-serif text-3xl font-medium sm:text-4xl">Toute la boutique</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Parcourez l'ensemble de notre catalogue. Des produits sélectionnés avec soin pour votre bien-être au quotidien.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-8">
        {products.map((product, i) => (
          <Reveal key={product.id} delay={i * 50}>
            <ProductCard product={product} />
          </Reveal>
        ))}
      </div>
    </div>
  )
}
