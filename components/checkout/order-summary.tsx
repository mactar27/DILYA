'use client'

import Image from 'next/image'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { formatPrice } from '@/lib/format'
import { Separator } from '@/components/ui/separator'

export function OrderSummary() {
  const { items, subtotal, setQuantity, removeItem, count } = useCart()

  if (items.length === 0) {
    return (
      <div className="flex h-full flex-col justify-center rounded-2xl bg-secondary/30 p-6 text-center lg:p-8">
        <p className="text-muted-foreground">Votre panier est vide.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col rounded-2xl bg-secondary/30 p-6 lg:p-8">
      <h2 className="mb-6 font-serif text-xl font-medium sm:text-2xl">
        Votre panier <span className="text-muted-foreground">({count})</span>
      </h2>

      <div className="flex flex-col gap-6">
        <ul className="flex flex-col gap-6">
          {items.map((item) => (
            <li key={`${item.id}-${item.variant || ''}`} className="flex gap-4 items-start">
              {/* Produit Image */}
              <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-md bg-background md:h-24 md:w-20">
                <Image
                  src={item.image || '/placeholder.svg'}
                  alt={item.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>

              {/* Produit Info & Actions */}
              <div className="flex flex-1 flex-col">
                <div className="flex justify-between items-start gap-2">
                  <div className="flex flex-col">
                    <span className="font-medium text-foreground leading-snug">{item.name}</span>
                    {item.variant && <span className="text-xs text-muted-foreground mt-0.5">{item.variant}</span>}
                  </div>
                  <button
                    onClick={() => removeItem(item.id, item.variant)}
                    className="text-muted-foreground transition-colors hover:text-destructive shrink-0 pt-1"
                    aria-label="Retirer l'article"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-4 flex items-end justify-between">
                  <div className="flex items-center rounded-md border bg-background">
                    <button
                      className="flex h-8 w-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                      onClick={() => setQuantity(item.id, item.quantity - 1, item.variant)}
                      aria-label="Diminuer la quantité"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm tabular-nums">{item.quantity}</span>
                    <button
                      className="flex h-8 w-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                      onClick={() => setQuantity(item.id, item.quantity + 1, item.variant)}
                      aria-label="Augmenter la quantité"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  
                  <span className="font-medium tabular-nums text-right">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <Separator className="my-2" />

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Sous-total</span>
            <span className="font-medium">{formatPrice(subtotal)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Livraison</span>
            <span className="text-muted-foreground">—</span>
          </div>
          <Separator className="my-1" />
          <div className="flex items-center justify-between">
            <span className="font-medium text-foreground">Total</span>
            <div className="flex flex-col items-end">
              <span className="text-xl font-semibold tabular-nums">{formatPrice(subtotal)}</span>
              <span className="text-xs text-muted-foreground">Taxes incluses. Frais d'expédition calculés à l'étape suivante.</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
