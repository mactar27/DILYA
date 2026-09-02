'use client'

import { useState, useMemo, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ProductCard } from '@/components/product-card'
import { Reveal } from '@/components/reveal'
import { cn } from '@/lib/utils'

// Types (simplified from Prisma)
type Product = any
type Category = any

interface BoutiqueLayoutProps {
  title: string
  products: Product[]
  categories: Category[]
  currentCategorySlug?: string
}

const PRICE_RANGES = [
  { id: 'all', label: 'Tous les prix' },
  { id: 'under-10k', label: "Jusqu'à 10 000 FCFA" },
  { id: '10k-15k', label: '10 000 - 15 000 FCFA' },
  { id: 'over-15k', label: 'Plus de 15 000 FCFA' },
]

const SIZES = ['XS', 'S', 'M', 'L', 'XL']

function BoutiqueFiltersAndGrid({ title, products, categories, currentCategorySlug }: BoutiqueLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const priceFilter = searchParams.get('price') || 'all'
  const sizesFilter = searchParams.get('sizes')?.split(',').filter(Boolean) || []

  // Helpers to update URL
  const updatePrice = (newPrice: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (newPrice === 'all') params.delete('price')
    else params.set('price', newPrice)
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const toggleSize = (size: string) => {
    const params = new URLSearchParams(searchParams.toString())
    const newSizes = sizesFilter.includes(size)
      ? sizesFilter.filter((s) => s !== size)
      : [...sizesFilter, size]
    
    if (newSizes.length === 0) params.delete('sizes')
    else params.set('sizes', newSizes.join(','))
    
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const resetFilters = () => {
    router.push(pathname, { scroll: false })
  }

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Price filter
      if (priceFilter === 'under-10k' && product.price > 10000) return false
      if (priceFilter === '10k-15k' && (product.price < 10000 || product.price > 15000)) return false
      if (priceFilter === 'over-15k' && product.price <= 15000) return false

      // Size filter
      if (sizesFilter.length > 0) {
        if (!product.sizes) return false
        const productSizes = JSON.parse(product.sizes) as string[]
        const hasMatchingSize = sizesFilter.some(size => productSizes.includes(size))
        if (!hasMatchingSize) return false
      }

      return true
    })
  }, [products, priceFilter, sizesFilter])

  return (
    <div className="w-full">
      {/* Hero Header with Pink Gradient */}
      <div className="w-full bg-gradient-to-b from-[#fcdbe8] to-[#fcf5f7] py-16 md:py-24 px-4 text-center">
        <p className="text-sm font-medium tracking-[0.2em] text-primary/70 mb-4 uppercase">Shop</p>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground font-medium max-w-2xl mx-auto leading-tight">
          {title}
        </h1>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          <Link
            href="/boutique"
            className={cn(
              "px-6 py-2 rounded-full text-sm font-medium transition-colors border",
              !currentCategorySlug
                ? "bg-foreground text-background border-foreground"
                : "bg-background text-primary border-border hover:border-primary/30"
            )}
          >
            Tout
          </Link>
          {categories.map((cat) => {
            // Mapping English slug to a clean Display Name for the pills
            let displayName = cat.name.replace('DILYA ', '')
            // Keep capitalization like "Everyday", "Move"
            displayName = displayName.charAt(0).toUpperCase() + displayName.slice(1).toLowerCase()
            return (
              <Link
                key={cat.slug}
                href={`/categorie/${cat.slug}`}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-medium transition-colors border",
                  currentCategorySlug === cat.slug
                    ? "bg-foreground text-background border-foreground"
                    : "bg-background text-primary border-border hover:border-primary/30"
                )}
              >
                {displayName}
              </Link>
            )
          })}
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-8">
              {/* Prix */}
              <div>
                <h3 className="font-semibold text-foreground mb-5 text-lg">Prix</h3>
                <div className="space-y-4">
                  {PRICE_RANGES.map((range) => (
                    <label key={range.id} className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center">
                        <input
                          type="radio"
                          name="price"
                          value={range.id}
                          checked={priceFilter === range.id}
                          onChange={() => updatePrice(range.id)}
                          className="peer sr-only"
                        />
                        <div className="w-5 h-5 rounded-full border border-primary/40 peer-checked:border-[#B57C8A] peer-checked:border-[5px] transition-all group-hover:border-[#B57C8A]/60"></div>
                      </div>
                      <span className="text-sm text-foreground/80">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Taille */}
              <div>
                <h3 className="font-semibold text-foreground mb-5 text-lg">Taille</h3>
                <div className="space-y-4">
                  {SIZES.map((size) => (
                    <label key={size} className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center">
                        <input
                          type="checkbox"
                          value={size}
                          checked={sizesFilter.includes(size)}
                          onChange={() => toggleSize(size)}
                          className="peer sr-only"
                        />
                        <div className="w-5 h-5 rounded-[6px] border border-primary/40 peer-checked:bg-[#B57C8A] peer-checked:border-[#B57C8A] flex items-center justify-center transition-colors group-hover:border-[#B57C8A]/60">
                           {sizesFilter.includes(size) && (
                            <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                           )}
                        </div>
                      </div>
                      <span className="text-sm text-foreground/80">{size}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {(priceFilter !== 'all' || sizesFilter.length > 0) && (
              <div className="mt-12 text-right lg:text-left">
                <button
                  onClick={resetFilters}
                  className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            )}
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="mb-6 text-sm text-muted-foreground font-medium">
              {filteredProducts.length} pièce{filteredProducts.length > 1 ? 's' : ''}
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 sm:gap-6 xl:grid-cols-3 lg:gap-8">
                {filteredProducts.map((product, i) => (
                  <Reveal key={product.id} delay={(i % 12) * 50}>
                    <ProductCard product={product} />
                  </Reveal>
                ))}
              </div>
            ) : (
              <div className="flex h-64 flex-col items-center justify-center rounded-2xl bg-secondary/30 text-center px-4">
                <p className="text-muted-foreground">Aucun produit ne correspond à vos critères.</p>
                <button
                  onClick={resetFilters}
                  className="mt-4 text-sm font-medium text-primary hover:underline underline-offset-4"
                >
                  Réinitialiser
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export function BoutiqueLayout(props: BoutiqueLayoutProps) {
  return (
    <Suspense fallback={<div className="h-screen w-full bg-background" />}>
      <BoutiqueFiltersAndGrid {...props} />
    </Suspense>
  )
}
