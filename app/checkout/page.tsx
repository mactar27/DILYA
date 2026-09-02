import { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { OrderSummary } from '@/components/checkout/order-summary'
import { CheckoutForm } from '@/components/checkout/checkout-form'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Paiement sécurisé | DILYA',
  description: 'Finalisez votre commande en toute sécurité.',
}

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12">
      <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground hover:underline">Accueil</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/panier" className="hover:text-foreground hover:underline">Panier</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="font-medium text-foreground">Paiement sécurisé</span>
      </nav>

      <h1 className="mb-8 font-serif text-3xl font-medium sm:text-4xl">Finaliser la commande</h1>

      <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.2fr]">
        <OrderSummary />
        <CheckoutForm />
      </div>
    </div>
  )
}
