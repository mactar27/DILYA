'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simuler un appel API
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    toast.success('Votre message a été envoyé avec succès !', {
      description: 'Nous vous répondrons dans les plus brefs délais.'
    })
    
    setIsSubmitting(false)
    ;(e.target as HTMLFormElement).reset()
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Nom complet</Label>
          <Input id="name" required placeholder="Votre nom" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" required placeholder="votre@email.com" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="subject">Sujet</Label>
        <Input id="subject" required placeholder="Sujet de votre message" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <textarea 
          id="message" 
          required
          rows={6}
          className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" 
          placeholder="Comment pouvons-nous vous aider ?" 
        />
      </div>
      <Button size="lg" className="w-full sm:w-auto px-8" disabled={isSubmitting}>
        {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        Envoyer le message
      </Button>
    </form>
  )
}
