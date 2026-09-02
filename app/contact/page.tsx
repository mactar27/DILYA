import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export const metadata: Metadata = {
  title: 'Contact | DILYA',
  description: 'Contactez-nous pour toute question ou demande.',
}

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="font-script text-6xl font-normal text-primary mb-4">Contact</h1>
        <p className="text-lg text-muted-foreground">
          Une question ? N'hésitez pas à nous écrire, nous vous répondrons dans les plus brefs délais.
        </p>
      </div>

      <form className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Nom complet</Label>
            <Input id="name" placeholder="Votre nom" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="votre@email.com" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="subject">Sujet</Label>
          <Input id="subject" placeholder="Sujet de votre message" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <textarea 
            id="message" 
            rows={6}
            className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" 
            placeholder="Comment pouvons-nous vous aider ?" 
          />
        </div>
        <Button size="lg" className="w-full sm:w-auto px-8">
          Envoyer le message
        </Button>
      </form>
    </div>
  )
}
