import Image from 'next/image'
import Link from 'next/link'
import { getCategories } from '@/lib/products'
import { Reveal } from '@/components/reveal'
import { Leaf, Lock, Sun } from 'lucide-react'

// Map icons manually based on the mockup. In a real app, this might come from the DB.
const iconMap: Record<string, any> = {
  'beaute': Leaf,
  'accessoires': Lock,
  'soins': Lock,
  'nouveautes': Sun,
}

export async function CategoryGrid() {
  const categories = await getCategories()
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <Reveal className="mb-12 flex flex-col items-center justify-center relative">
        <h2 className="font-serif text-4xl font-medium sm:text-5xl text-primary relative inline-block">
          Nos catégories
          {/* Shell sticker */}
          <div className="absolute -right-16 -top-4 rotate-12">
            <Image src="/images/coquillage.png" alt="Shell sticker" width={60} height={60} className="drop-shadow-md" />
          </div>
        </h2>
        {/* Wavy line placeholder */}
        <div className="mt-4 text-accent opacity-50">
          <svg width="150" height="12" viewBox="0 0 150 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.5 6C15 6 15 1.5 30 1.5C45 1.5 45 10.5 60 10.5C75 10.5 75 6 90 6C105 6 105 1.5 120 1.5C135 1.5 135 10.5 148.5 10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {categories.map((cat, i) => {
          const IconComponent = iconMap[cat.slug] || Leaf
          return (
            <Reveal key={cat.slug} delay={i * 80}>
              <Link
                href={`/categorie/${cat.slug}`}
                className="group relative flex aspect-square flex-col justify-end overflow-hidden rounded-3xl bg-secondary"
              >
                <Image
                  src={cat.image || '/placeholder.svg'}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Top Left Icon */}
                <div className="absolute left-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-2xl bg-white/90 shadow-sm backdrop-blur">
                  <IconComponent className="h-5 w-5 text-primary stroke-[1.5]" />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-60 transition-opacity group-hover:opacity-40" />
                
                {/* Bottom Pill */}
                <div className="relative z-10 mx-auto mb-6 flex flex-col items-center justify-center">
                  <h3 className="font-serif text-2xl font-medium text-white drop-shadow-md mb-2">{cat.name}</h3>
                  <div className="flex h-8 items-center rounded-full bg-white px-5 text-[11px] font-semibold tracking-wider text-primary shadow-sm transition-transform group-hover:-translate-y-1">
                    Voir tout
                  </div>
                </div>
              </Link>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
