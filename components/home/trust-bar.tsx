import { Leaf, Truck, Lock, Heart } from 'lucide-react'
import { Reveal } from '@/components/reveal'

const items = [
  {
    icon: Leaf,
    title: 'Ingrédients naturels',
    text: 'Sélectionnés avec soin',
  },
  {
    icon: Truck,
    title: 'Livraison rapide',
    text: 'Partout en Afrique',
  },
  {
    icon: Lock,
    title: 'Paiement sécurisé',
    text: '100% sécurisé',
  },
  {
    icon: Heart,
    title: 'Satisfait ou remboursé',
    text: "14 jours pour changer d'avis",
  },
]

export function TrustBar() {
  return (
    <section className="relative z-30 -mt-10 mb-8 px-4 md:-mt-16">
      <div className="mx-auto max-w-6xl rounded-3xl bg-white px-4 py-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-primary/5">
        <div className="grid grid-cols-2 gap-x-2 gap-y-10 md:grid-cols-4 lg:gap-x-12">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 70} className="flex flex-col items-center text-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center text-primary">
                <item.icon className="h-8 w-8 stroke-[1.2]" aria-hidden="true" />
              </div>
              <div className="space-y-1">
                <h3 className="font-sans text-[11px] font-semibold text-primary uppercase tracking-wider">{item.title}</h3>
                <p className="text-[10px] text-foreground/60 leading-tight px-2">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
