import { Metadata } from 'next'
import { ContactForm } from '@/components/contact-form'

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

      <ContactForm />
    </div>
  )
}
