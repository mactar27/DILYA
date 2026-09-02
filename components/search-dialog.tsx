'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { searchProductsAction, getCategoriesAction } from '@/app/actions'
import { formatPrice } from '@/lib/format'
import { type Product, type Category } from '@/lib/products'

export function SearchDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)
  
  const trimmed = query.trim()

  useEffect(() => {
    getCategoriesAction().then(setCategories)
  }, [])

  useEffect(() => {
    if (!trimmed) {
      setResults([])
      return
    }
    let active = true
    setLoading(true)
    searchProductsAction(trimmed).then(res => {
      if (active) {
        setResults(res)
        setLoading(false)
      }
    })
    return () => { active = false }
  }, [trimmed])

  function close() {
    onOpenChange(false)
    setQuery('')
  }

  const suggestions = categories.filter((c) => c.slug !== 'nouveautes')

  return (
    <Dialog open={open} onOpenChange={(o) => (o ? onOpenChange(true) : close())}>
      <DialogContent className="top-24 max-w-xl translate-y-0 gap-0 overflow-hidden p-0">
        <DialogTitle className="sr-only">Rechercher un produit</DialogTitle>
        <div className="flex items-center gap-3 border-b px-4">
          <Search className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden="true" />
          {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
          <Input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un produit, une catégorie..."
            className="h-14 border-0 px-0 text-base shadow-none focus-visible:ring-0"
          />
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2">
          {trimmed === '' ? (
            <div className="p-3">
              <p className="px-2 pb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Suggestions
              </p>
              <div className="flex flex-wrap gap-2 px-2">
                {suggestions.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/categorie/${c.slug}`}
                    onClick={close}
                    className="rounded-full border px-3 py-1.5 text-sm transition-colors hover:bg-secondary"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
          ) : loading ? (
            <div className="p-6 text-center text-sm text-muted-foreground">Recherche en cours...</div>
          ) : results.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-sm text-muted-foreground">
                Aucun résultat pour «&nbsp;{trimmed}&nbsp;».
              </p>
              <p className="mt-3 text-xs text-muted-foreground">Essayez plutôt&nbsp;:</p>
              <div className="mt-2 flex flex-wrap justify-center gap-2">
                {suggestions.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/categorie/${c.slug}`}
                    onClick={close}
                    className="rounded-full border px-3 py-1.5 text-sm transition-colors hover:bg-secondary"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <ul>
              {results.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/produit/${p.slug}`}
                    onClick={close}
                    className="flex items-center gap-3 rounded-md p-2 transition-colors hover:bg-secondary"
                  >
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded bg-secondary">
                      <Image
                        src={p.images[0] || '/placeholder.svg'}
                        alt={p.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{p.name}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {p.shortDescription}
                      </p>
                    </div>
                    <span className="text-sm tabular-nums text-muted-foreground">
                      {formatPrice(p.price)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
