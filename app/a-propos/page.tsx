import { Metadata } from 'next'
import { prisma } from '@/lib/db'

export const metadata: Metadata = {
  title: 'À propos | DILYA',
  description: 'Découvrez l\'histoire et les valeurs de DILYA.',
}

export const dynamic = 'force-dynamic'

export default async function AboutPage() {
  const page = await prisma.page.findUnique({
    where: { slug: 'a-propos' }
  })

  // Contenu par défaut si la page n'a pas encore été créée dans l'admin
  const defaultTitle = 'À propos de Dilya'
  const defaultContent = `
    <p class="text-lg text-muted-foreground mb-6 leading-relaxed">
      DILYA est née d'une passion pour l'élégance minimaliste et le raffinement. Notre mission est de vous proposer des pièces intemporelles, faciles à porter et à associer, pour vous accompagner dans chaque moment de votre vie.
    </p>
    <p class="text-lg text-muted-foreground leading-relaxed">
      Chaque collection est pensée avec soin, alliant qualité, confort et esthétique premium. Bienvenue dans notre univers.
    </p>
  `

  const title = page?.title || defaultTitle
  const content = page?.content || defaultContent

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
        <div>
          <h1 className="font-script text-6xl font-normal text-primary mb-6">{title}</h1>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
        <div className="relative h-[600px] w-full rounded-2xl overflow-hidden bg-secondary/50">
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm uppercase tracking-widest">
            Photo Dilya
          </div>
        </div>
      </div>
    </div>
  )
}

