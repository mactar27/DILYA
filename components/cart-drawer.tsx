'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { ButtonLink } from '@/components/ui/button-link'
import { Separator } from '@/components/ui/separator'
import { useCart } from '@/lib/cart-context'
import { formatPrice } from '@/lib/format'

export function CartDrawer() {
  const { items, isOpen, setOpen, subtotal, removeItem, setQuantity, count } = useCart()

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b px-6 py-5">
          <SheetTitle className="font-serif text-2xl">
            Votre panier {count > 0 && <span className="text-muted-foreground">({count})</span>}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
              <ShoppingBag className="h-7 w-7 text-muted-foreground" aria-hidden="true" />
            </div>
            <p className="text-muted-foreground">Votre panier est vide pour le moment.</p>
            <ButtonLink href="/boutique" variant="outline" onClick={() => setOpen(false)}>Découvrir la boutique</ButtonLink>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <ul className="flex flex-col gap-5">
                {items.map((item) => (
                  <li key={`${item.id}-${item.variant ?? ''}`} className="flex gap-4">
                    <Link
                      href={`/produit/${item.slug}`}
                      onClick={() => setOpen(false)}
                      className="relative h-24 w-20 shrink-0 overflow-hidden rounded-md bg-secondary"
                    >
                      <Image
                        src={item.image || '/placeholder.svg'}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </Link>
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <Link
                            href={`/produit/${item.slug}`}
                            onClick={() => setOpen(false)}
                            className="text-sm font-medium leading-snug hover:underline"
                          >
                            {item.name}
                          </Link>
                          {item.variant && (
                            <p className="text-xs text-muted-foreground">{item.variant}</p>
                          )}
                        </div>
                        <button
                          onClick={() => removeItem(item.id, item.variant)}
                          className="text-muted-foreground transition-colors hover:text-destructive"
                          aria-label={`Retirer ${item.name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center rounded-md border">
                          <button
                            className="flex h-8 w-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                            onClick={() =>
                              setQuantity(item.id, item.quantity - 1, item.variant)
                            }
                            aria-label="Diminuer la quantité"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            className="flex h-8 w-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                            onClick={() =>
                              setQuantity(item.id, item.quantity + 1, item.variant)
                            }
                            aria-label="Augmenter la quantité"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <span className="text-sm font-medium tabular-nums">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <SheetFooter className="gap-3 border-t px-6 py-5">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Sous-total</span>
                <span className="text-base font-medium text-foreground tabular-nums">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Frais de livraison calculés à l’étape suivante selon votre pays.
              </p>
              <Separator />
              <div className="flex flex-col gap-2">
                <ButtonLink href="/checkout" size="lg" onClick={() => setOpen(false)}>Passer la commande</ButtonLink>
                <ButtonLink
                  href="/panier"
                  variant="outline"
                  size="lg"
                  onClick={() => setOpen(false)}
                >Voir le panier</ButtonLink>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
