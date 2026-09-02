import Image from 'next/image'
import Link from 'next/link'
import { ButtonLink } from '@/components/ui/button-link'
import { Reveal } from '@/components/reveal'

export function PromoBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <Reveal className="relative overflow-hidden rounded-2xl">
        <div className="relative grid items-center md:grid-cols-2">
          <div className="relative z-10 p-8 sm:p-12 lg:p-16">
            <h2 className="max-w-md text-balance font-serif text-3xl font-medium leading-tight sm:text-4xl">
              Votre prochaine découverte vous attend.
            </h2>
            <p className="mt-4 max-w-sm text-muted-foreground">
              Profitez de nos sélections du moment avant qu&apos;elles ne disparaissent.
            </p>
            <ButtonLink href="/boutique" size="lg" className="mt-7 h-12 px-7">Découvrir les offres</ButtonLink>
          </div>
          <div className="relative h-56 md:h-full md:min-h-[22rem]">
            <Image
              src="/images/promo-selection.png"
              alt="Sélection de produits premium mis en avant"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
        <div className="absolute inset-0 -z-0 bg-accent" />
      </Reveal>
    </section>
  )
}
