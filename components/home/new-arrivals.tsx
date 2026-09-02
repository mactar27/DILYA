import Image from 'next/image'
import Link from 'next/link'
import { getNewProducts } from '@/lib/products'
import { ProductCard } from '@/components/product-card'
import { Reveal } from '@/components/reveal'
import { ButtonLink } from '@/components/ui/button-link'

export async function NewArrivals() {
  const products = (await getNewProducts()).slice(0, 4)

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_1.4fr] lg:gap-12">
        <Reveal className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary lg:sticky lg:top-24">
            <Image
              src="/images/lifestyle-nouveautes.png"
              alt="Ambiance lifestyle mettant en avant les nouveaux produits de la boutique"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/70 to-transparent p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-background/80">
                Nouveautés
              </p>
              <p className="mt-2 max-w-sm font-serif text-2xl text-background">
                De nouvelles trouvailles, régulièrement.
              </p>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal className="mb-6">
            <h2 className="font-serif text-3xl font-medium sm:text-4xl">Nouveautés</h2>
            <p className="mt-2 max-w-md text-muted-foreground">
              Découvrez les derniers produits disponibles dans notre boutique.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {products.map((p, i) => (
              <Reveal key={p.id} delay={i * 70}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-8">
            <ButtonLink href="/categorie/nouveautes" size="lg" variant="outline">Voir les nouveautés</ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
