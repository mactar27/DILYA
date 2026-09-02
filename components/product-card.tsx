'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag, Heart } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { formatPrice } from '@/lib/format'
import { useCart } from '@/lib/cart-context'
import type { Product } from '@/lib/products'

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault()
    if (!product.inStock) return
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0],
    })
    toast.success(`${product.name} ajouté au panier`)
  }

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0

  return (
    <Link href={`/produit/${product.slug}`} className="group flex flex-col h-full bg-[#fbf9f6] rounded-[24px] overflow-hidden p-2 shadow-sm border border-black/[0.03]">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[18px] bg-secondary/50">
        <Image
          src={product.images[0] || '/placeholder.svg'}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="rounded-full bg-white px-3 py-1.5 text-[10px] font-bold tracking-wide text-primary shadow-sm">
              Nouveau
            </span>
          )}
          {discount > 0 && (
            <span className="rounded-full bg-[#2a2a2a] px-3 py-1.5 text-[10px] font-bold tracking-wide text-white shadow-sm">
              -{discount}%
            </span>
          )}
        </div>

        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-[1px]">
            <span className="rounded-full bg-background px-3 py-1 text-xs font-medium">
              Épuisé
            </span>
          </div>
        )}

        {/* Heart Icon (Top Right) */}
        <button
          aria-label="Ajouter aux favoris"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-primary shadow-sm transition-transform hover:scale-110"
          onClick={(e) => {
            e.preventDefault()
            toast.success('Ajouté aux coups de cœur')
          }}
        >
          <Heart className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-2 flex-1 px-1">
        <h3 className="text-xs font-semibold leading-snug text-foreground/80">{product.name}</h3>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-bold text-foreground tabular-nums">{formatPrice(product.price)}</span>
          {product.oldPrice && (
            <span className="text-[10px] text-muted-foreground line-through tabular-nums font-medium">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>
        
        {product.colors && product.colors.length > 0 && (
          <div className="flex gap-1 mb-2">
            {product.colors.map((color, idx) => (
              <span key={idx} className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-sm" style={{ backgroundColor: color }}></span>
            ))}
          </div>
        )}

        {product.sizes && product.sizes.length > 0 && (
          <div className="flex gap-1 mb-3 flex-wrap">
            {product.sizes.map((size, idx) => (
              <span key={idx} className="px-1.5 py-0.5 text-[9px] font-bold text-foreground/70 bg-white rounded-[4px] border border-black/5">
                {size}
              </span>
            ))}
          </div>
        )}
        
        <button
          onClick={handleAdd}
          disabled={!product.inStock}
          className="mt-auto flex w-full items-center justify-center rounded-xl bg-[#e2959c] py-3 text-white transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
        >
          <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={2.5} />
        </button>
      </div>
    </Link>
  )
}
