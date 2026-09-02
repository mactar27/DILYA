import Image from 'next/image'
import Link from 'next/link'
import { Reveal } from '@/components/reveal'
import { ArrowRight } from 'lucide-react'

const articles = [
  {
    title: "5 façons de porter votre pièce DILYA",
    category: "STYLE & MODE",
    image: "/ChatGPT Image 2 sept. 2026, 03_23_15.png",
    href: "/journal/5-facons-de-porter",
  },
  {
    title: "Les essentiels d'une garde-robe élégante",
    category: "INSPIRATION",
    image: "/ChatGPT Image 2 sept. 2026, 03_20_13.png",
    href: "/journal/essentiels-garde-robe",
  },
  {
    title: "Comment composer un look DILYA NIGHT",
    category: "GUIDE STYLE",
    image: "/ChatGPT Image 2 sept. 2026, 03_20_04.png",
    href: "/journal/look-dilya-night",
  },
]

export function Journal() {
  return (
    <section className="bg-[#fcf7f7] py-16 md:py-24 relative overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center text-center mb-10">
          <Reveal>
            <h2 className="font-serif text-3xl font-medium sm:text-5xl text-foreground">
              Le journal DILYA
            </h2>
            <p className="mt-4 text-sm text-muted-foreground max-w-2xl mx-auto">
              Tendances, inspirations et conseils pour cultiver votre style au quotidien.
            </p>
            <Link href="/journal" className="mt-6 inline-flex items-center text-xs font-semibold text-primary hover:opacity-70 transition-opacity">
              Découvrir le journal
              <ArrowRight className="ml-2 h-3.5 w-3.5" />
            </Link>
          </Reveal>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {articles.map((article, i) => (
            <Reveal key={i} delay={i * 100}>
              <Link href={article.href} className="group block bg-white rounded-[24px] overflow-hidden shadow-sm border border-black/[0.03] p-3 pb-6">
                <div className="relative overflow-hidden rounded-[16px] bg-secondary mb-5">
                  <Image
                    src={article.image}
                    alt={article.title}
                    width={1024}
                    height={576}
                    className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="px-2">
                  <span className="text-[9px] uppercase tracking-widest text-foreground/50 font-bold mb-2 block">
                    {article.category}
                  </span>
                  <h3 className="text-[17px] font-serif text-foreground leading-snug mb-4">
                    {article.title}
                  </h3>
                  <span className="text-[11px] text-[#e2959c] font-medium group-hover:underline underline-offset-4">
                    Lire l'article
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        
        <div className="mt-12 flex justify-center pb-6">
          <Link href="/journal" className="inline-flex items-center justify-center w-full max-w-[280px] h-12 bg-white/60 backdrop-blur rounded-full text-[10px] font-bold uppercase tracking-widest text-[#e2959c] hover:bg-white shadow-sm transition-colors border border-[#e2959c]/20">
            VOIR TOUS LES ARTICLES <ArrowRight className="ml-2 h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
