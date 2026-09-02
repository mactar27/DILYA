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
      <Reveal className="mb-10 text-left">
        <p className="text-xs font-bold tracking-[0.2em] text-primary/70 uppercase mb-3">Explorer</p>
        <h2 className="font-serif text-4xl font-medium sm:text-5xl text-foreground">
          Votre univers DILYA
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {categories.map((cat, i) => {
          const IconComponent = iconMap[cat.slug] || Leaf
          return (
            <Reveal key={cat.slug} delay={i * 80}>
              <Link
                href={`/categorie/${cat.slug}`}
                className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl bg-secondary"
              >
                <Image
                  src={cat.image || '/placeholder.svg'}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-contain transition-transform duration-700 group-hover:scale-110"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
                
                {/* Content */}
                <div className="relative z-10 mx-auto mb-10 flex flex-col items-center justify-center text-center px-4 w-full">
                  <div className="mb-4 flex h-6 w-6 items-center justify-center rounded-[4px] bg-white/20 backdrop-blur-sm border border-white/30">
                    <IconComponent className="h-3 w-3 text-white stroke-[2]" />
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl font-medium text-white drop-shadow-md mb-2">{cat.name}</h3>
                  <p className="text-[9px] font-bold tracking-[0.2em] text-white/90 uppercase drop-shadow-md line-clamp-1">
                    {cat.tagline}
                  </p>
                </div>
              </Link>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
