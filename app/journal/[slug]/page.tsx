import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Clock } from 'lucide-react'
import { prisma } from '@/lib/db'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await prisma.article.findUnique({ where: { slug, isPublished: true } })
  if (!article) return {}
  return {
    title: `${article.title} — Le Journal DILYA`,
    description: article.excerpt,
  }
}

// Simple markdown-like renderer
function renderContent(content: string) {
  const lines = content.split('\n')
  const elements: React.ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    if (!line.trim()) { i++; continue }

    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} className="font-serif text-2xl font-medium text-primary mt-10 mb-4">
          {line.slice(3)}
        </h2>
      )
    } else if (line.startsWith('### ')) {
      elements.push(
        <h3 key={i} className="font-serif text-xl font-medium text-foreground mt-8 mb-3">
          {line.slice(4)}
        </h3>
      )
    } else if (line.startsWith('> ')) {
      elements.push(
        <div key={i} className="my-8 rounded-2xl bg-accent/20 border border-accent/30 px-6 py-5">
          <p className="text-sm leading-relaxed text-foreground/90">{line.slice(2)}</p>
        </div>
      )
    } else if (line.startsWith('- ')) {
      const items: string[] = []
      while (i < lines.length && lines[i].startsWith('- ')) {
        items.push(lines[i].slice(2))
        i++
      }
      elements.push(
        <ul key={`list-${i}`} className="space-y-2 my-4">
          {items.map((item, j) => (
            <li key={j} className="flex items-start gap-3 text-sm text-foreground/80">
              <span className="mt-1 h-4 w-4 flex-none rounded-full bg-primary/20 flex items-center justify-center text-[9px] text-primary font-bold">✓</span>
              {item}
            </li>
          ))}
        </ul>
      )
      continue
    } else {
      // Inline bold/italic rendering
      const html = line
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
      elements.push(
        <p key={i} className="text-base leading-relaxed text-foreground/80 mb-5" dangerouslySetInnerHTML={{ __html: html }} />
      )
    }

    i++
  }

  return elements
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = await prisma.article.findUnique({ where: { slug, isPublished: true } })
  if (!article) notFound()

  const otherArticles = await prisma.article.findMany({
    where: { isPublished: true, NOT: { slug } },
    take: 3,
    orderBy: { publishedAt: 'desc' },
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative bg-primary py-20 px-6 text-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-10 select-none text-[10rem] leading-none font-serif text-white flex items-center justify-center">✦</div>

        <Link
          href="/journal"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary-foreground/60 hover:text-primary-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-3 w-3" /> Le Journal
        </Link>

        <div className="mb-4 flex items-center justify-center gap-3 text-xs text-primary-foreground/50">
          {article.category && (
            <span className="bg-white/10 px-3 py-1 rounded-full">{article.category}</span>
          )}
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {article.readTime} de lecture
          </span>
          {article.publishedAt && (
            <span>
              {article.publishedAt.toLocaleDateString('fr-FR', {
                day: 'numeric', month: 'long', year: 'numeric',
              })}
            </span>
          )}
        </div>

        <h1 className="font-serif text-4xl md:text-6xl text-white font-medium max-w-3xl mx-auto leading-tight">
          {article.title}
        </h1>
      </section>

      {/* Intro excerpt */}
      <article className="mx-auto max-w-2xl px-6 py-16">
        <p className="text-lg leading-relaxed text-foreground/80 font-serif border-l-2 border-primary/30 pl-5 mb-10 italic">
          {article.excerpt}
        </p>

        {/* Rendered content */}
        {renderContent(article.content)}

        <div className="mt-16 pt-10 border-t border-border">
          <Link
            href="/journal"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-primary hover:opacity-70 transition-opacity"
          >
            <ArrowLeft className="h-4 w-4" />
            Voir tous les articles
          </Link>
        </div>
      </article>

      {/* Other articles */}
      {otherArticles.length > 0 && (
        <section className="bg-secondary/30 py-14 px-6">
          <div className="mx-auto max-w-5xl">
            <h2 className="font-serif text-2xl font-medium text-center text-primary mb-10">
              Vous aimerez aussi
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {otherArticles.map((other) => (
                <Link
                  key={other.slug}
                  href={`/journal/${other.slug}`}
                  className="group rounded-2xl bg-card border border-border p-5 hover:shadow-md transition-shadow"
                >
                  <span className="text-[10px] uppercase tracking-widest text-primary/60 font-semibold">
                    {other.category}
                  </span>
                  <h3 className="mt-2 font-serif text-lg font-medium text-foreground leading-snug group-hover:text-primary transition-colors">
                    {other.title}
                  </h3>
                  <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{other.excerpt}</p>
                  <span className="mt-3 text-xs font-semibold uppercase tracking-widest text-primary inline-flex items-center gap-1">
                    Lire <ArrowLeft className="h-3 w-3 rotate-180" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
