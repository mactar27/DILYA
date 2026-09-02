import Link from 'next/link'
import Image from 'next/image'
import { getFeaturedProducts } from '@/lib/products'
import { ProductCard } from '@/components/product-card'
import { Reveal } from '@/components/reveal'
import { ButtonLink } from '@/components/ui/button-link'

export async function FeaturedProducts() {
  const products = await getFeaturedProducts()

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal className="mb-10 flex flex-col items-center justify-center relative text-center">
          <h2 className="font-serif text-3xl font-medium sm:text-5xl text-foreground relative inline-block">
            Nos produits
          </h2>
          <div className="mt-4 flex items-center justify-center">
            <div className="w-12 h-px bg-primary/30"></div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="mx-2 text-primary/60" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C12 2 11.5 8 7 9.5C11.5 11 12 17 12 17C12 17 12.5 11 17 9.5C12.5 8 12 2 12 2Z" fill="currentColor"/>
            </svg>
            <div className="w-12 h-px bg-primary/30"></div>
          </div>
        </Reveal>

        {/* Category Pills */}
        <div className="flex justify-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-hide px-2">
          <Link href="/boutique" className="px-5 py-2 rounded-full bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest shrink-0 shadow-sm">
            Tout
          </Link>
          <Link href="/categorie/everyday" className="px-5 py-2 rounded-full bg-secondary/50 text-foreground/70 text-[10px] font-bold uppercase tracking-widest hover:bg-secondary transition-colors shrink-0">
            Everyday
          </Link>
          <Link href="/categorie/night" className="px-5 py-2 rounded-full bg-secondary/50 text-foreground/70 text-[10px] font-bold uppercase tracking-widest hover:bg-secondary transition-colors shrink-0">
            Night
          </Link>
          <Link href="/categorie/accessories" className="px-5 py-2 rounded-full bg-secondary/50 text-foreground/70 text-[10px] font-bold uppercase tracking-widest hover:bg-secondary transition-colors shrink-0">
            Accessories
          </Link>
          <Link href="/categorie/nouveautes" className="px-5 py-2 rounded-full bg-secondary/50 text-foreground/70 text-[10px] font-bold uppercase tracking-widest hover:bg-secondary transition-colors shrink-0">
            Nouveautés
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {products.map((p, i) => (
            <Reveal key={p.id} delay={i * 70}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link href="/boutique" className="group flex items-center text-xs font-semibold text-primary uppercase tracking-widest border border-primary/20 px-8 py-3 rounded-full hover:bg-primary/5 transition-colors">
            Voir tout
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="ml-2 transform group-hover:translate-x-1 transition-transform" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
