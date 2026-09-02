import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import { prisma } from '@/lib/db'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Le Journal — DILYA',
  description:
    'Conseils beauté, routines naturelles et inspirations lifestyle par DILYA.',
}

export default async function JournalPage() {
  const articles = await prisma.article.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: 'desc' },
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative bg-primary py-24 px-6 text-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-10 select-none text-[10rem] leading-none font-serif text-white flex items-center justify-center">
          ✦
        </div>
        <p className="text-xs uppercase tracking-[0.3em] text-primary-foreground/60 mb-4">
          Beauté · Bien-être · Lifestyle
        </p>
        <h1 className="font-serif text-5xl md:text-7xl text-white font-medium">
          Le Journal
        </h1>
        <p className="mt-6 text-base text-primary-foreground/70 max-w-md mx-auto leading-relaxed">
          Tendances, inspirations et conseils pour cultiver votre élégance au quotidien.
        </p>
      </section>

      {/* Articles */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        {articles.length === 0 ? (
          <div className="text-center py-24 text-muted-foreground">
            <p className="text-lg">Aucun article publié pour le moment.</p>
            <p className="text-sm mt-2">Revenez bientôt !</p>
          </div>
        ) : (
          <div className="grid gap-10 md:grid-cols-3">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/journal/${article.slug}`}
                className="group flex flex-col rounded-3xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Cover */}
                <div className="relative aspect-[4/3] bg-gradient-to-br from-accent/30 to-primary/20 flex items-center justify-center">
                  <span className="font-serif text-6xl opacity-30 select-none">✦</span>
                  {article.category && (
                    <div className="absolute top-3 left-3 bg-primary/90 text-primary-foreground text-[10px] uppercase tracking-widest px-3 py-1 rounded-full font-semibold">
                      {article.category}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6 gap-3">
                  <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {article.readTime}
                    </span>
                    {article.publishedAt && (
                      <>
                        <span>·</span>
                        <span>
                          {article.publishedAt.toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </span>
                      </>
                    )}
                  </div>
                  <h2 className="font-serif text-xl font-medium text-foreground leading-snug group-hover:text-primary transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {article.excerpt}
                  </p>
                  <span className="mt-2 inline-flex items-center text-xs font-semibold uppercase tracking-widest text-primary group-hover:gap-2 transition-all">
                    Lire l'article
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
