'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Search, ShoppingBag, Menu, Truck, Heart, Lock, Bookmark } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useCart } from '@/lib/cart-context'
import { CartDrawer } from '@/components/cart-drawer'
import { SearchDialog } from '@/components/search-dialog'

const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/boutique', label: 'Boutique' },
  { href: '/categorie/everyday', label: 'Catégories' },
  { href: '/a-propos', label: 'À propos' },
  { href: '/journal', label: 'Journal' },
  { href: '/contact', label: 'Contact' },
]

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function SiteHeader() {
  const { count, setOpen } = useCart()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isAdmin = pathname?.startsWith('/admin')
  if (isAdmin) return null

  return (
    <>
      <div className="bg-primary text-primary-foreground hidden md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-[11px] tracking-wide">
          <div className="flex items-center gap-1.5">
            <Truck className="h-3 w-3" />
            <span>Livraison disponible à Dakar & Abidjan</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span>Paiement sécurisé</span>
            <Lock className="h-3 w-3" />
          </div>
        </div>
      </div>

      <header
        className={cn(
          'sticky top-0 z-40 border-b transition-all duration-300',
          scrolled
            ? 'border-border bg-background/90 backdrop-blur-md'
            : 'border-transparent bg-transparent',
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
          {/* Left: mobile menu + logo */}
          <div className="flex items-center gap-2">
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger
                render={
                  <button
                    className="md:hidden inline-flex size-8 shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium transition-all outline-none hover:bg-muted focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                    aria-label="Menu"
                  />
                }
              >
                <Menu className="h-5 w-5" />
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0">
                <SheetHeader className="border-b px-6 py-5 text-left">
                  <SheetTitle className="inline-flex items-center">
                    <span className="font-script text-4xl text-primary font-normal">Dilya</span>
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col px-3 py-4">
                  <Link href="/" onClick={() => setMenuOpen(false)} className="rounded-md px-3 py-3 text-base transition-colors hover:bg-secondary">Accueil</Link>
                  <Link href="/boutique" onClick={() => setMenuOpen(false)} className="rounded-md px-3 py-3 text-base transition-colors hover:bg-secondary">Boutique</Link>
                  
                  <div className="px-3 py-2 text-sm font-medium text-muted-foreground mt-2">Catégories</div>
                  <Link href="/categorie/everyday" onClick={() => setMenuOpen(false)} className="rounded-md px-6 py-2 text-base transition-colors hover:bg-secondary">DILYA EVERYDAY</Link>
                  <Link href="/categorie/night" onClick={() => setMenuOpen(false)} className="rounded-md px-6 py-2 text-base transition-colors hover:bg-secondary">DILYA NIGHT</Link>
                  <Link href="/categorie/accessories" onClick={() => setMenuOpen(false)} className="rounded-md px-6 py-2 text-base transition-colors hover:bg-secondary">DILYA ACCESSORIES</Link>
                  <Link href="/categorie/exclusives" onClick={() => setMenuOpen(false)} className="rounded-md px-6 py-2 text-base transition-colors hover:bg-secondary">DILYA EXCLUSIVES</Link>
                  
                  <div className="my-2 h-px bg-border" />
                  <Link href="/a-propos" onClick={() => setMenuOpen(false)} className="rounded-md px-3 py-3 text-base transition-colors hover:bg-secondary">À propos</Link>
                  <Link href="/journal" onClick={() => setMenuOpen(false)} className="rounded-md px-3 py-3 text-base transition-colors hover:bg-secondary">Journal</Link>
                  <Link href="/contact" onClick={() => setMenuOpen(false)} className="rounded-md px-3 py-3 text-base transition-colors hover:bg-secondary">Contact</Link>
                </nav>
              </SheetContent>
            </Sheet>
            
            {/* Desktop Logo */}
            <Link href="/" className="hidden lg:flex items-center gap-2">
              <span className="font-script text-4xl text-primary font-normal pt-1">Dilya</span>
            </Link>
          </div>

          {/* Mobile Logo (Centered) */}
          <Link href="/" className="lg:hidden absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center justify-center">
            <span className="font-script text-4xl text-primary font-normal pt-1">Dilya</span>
          </Link>

          {/* Center: nav (Desktop only) */}
          <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-6">
            {navLinks.map((link) => {
              if (link.label === 'Catégories') {
                return (
                  <DropdownMenu key="categories">
                    <DropdownMenuTrigger className={cn(
                      'relative text-sm tracking-wide text-foreground/80 transition-colors hover:text-foreground flex items-center gap-1 outline-none',
                      pathname?.startsWith('/categorie') && 'text-foreground'
                    )}>
                      Catégories
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-0.5 opacity-70">
                        <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {pathname?.startsWith('/categorie') && (
                        <span className="absolute -bottom-1.5 left-0 h-px w-full bg-primary" />
                      )}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center" className="w-48 bg-background/95 backdrop-blur-md">
                      <DropdownMenuItem><Link href="/categorie/everyday" className="w-full cursor-pointer">DILYA EVERYDAY</Link></DropdownMenuItem>
                      <DropdownMenuItem><Link href="/categorie/night" className="w-full cursor-pointer">DILYA NIGHT</Link></DropdownMenuItem>
                      <DropdownMenuItem><Link href="/categorie/accessories" className="w-full cursor-pointer">DILYA ACCESSORIES</Link></DropdownMenuItem>
                      <DropdownMenuItem><Link href="/categorie/exclusives" className="w-full cursor-pointer">DILYA EXCLUSIVES</Link></DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )
              }
              const active =
                link.href === '/'
                  ? pathname === '/'
                  : pathname?.startsWith(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative text-sm tracking-wide text-foreground/80 transition-colors hover:text-foreground',
                    active && 'text-foreground',
                  )}
                >
                  {link.label}
                  {active && (
                    <span className="absolute -bottom-1.5 left-0 h-px w-full bg-primary" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Right: actions */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="text-primary hover:text-primary/80"
              aria-label="Rechercher"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="text-primary hover:text-primary/80"
              aria-label="Favoris"
            >
              <Bookmark className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="relative text-primary hover:text-primary/80"
              aria-label={`Panier, ${count} article${count > 1 ? 's' : ''}`}
              onClick={() => setOpen(true)}
            >
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-medium leading-none text-primary-foreground">
                  {count}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>

      <CartDrawer />
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  )
}
