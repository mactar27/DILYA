'use client'

import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { formatPrice } from '@/lib/format'
import type { Product } from '@/lib/products'

export function ProductCard({ product }: { product: Product }) {
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0

  return (
    <Link href={`/produit/${product.slug}`} className="group flex flex-col h-full bg-[#fbf9f6] rounded-[24px] overflow-hidden p-2 shadow-sm border border-black/[0.03]">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary/50">
        <div className="absolute inset-4 sm:inset-6">
          <Image
            src={product.images[0] || '/placeholder.svg'}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-contain transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>

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
      </div>

      <div className="mt-4 flex flex-col gap-2 flex-1 px-1 pb-3">
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
          <div className="flex gap-1 mb-1 flex-wrap">
            {product.sizes.map((size, idx) => (
              <span key={idx} className="px-1.5 py-0.5 text-[9px] font-bold text-foreground/70 bg-white rounded-[4px] border border-black/5">
                {size}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
