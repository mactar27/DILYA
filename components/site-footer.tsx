'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { subscribeToNewsletter } from '@/app/actions'

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
)

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z"/>
  </svg>
)

const SnapchatIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.272.149-.211.043-.391.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.052-.15-.055-.225-.015-.243.165-.465.42-.509 3.264-.54 4.73-3.879 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-1.107-.435-1.257-.93-1.197-1.273.09-.479.674-.793 1.168-.793.146 0 .27.029.383.074.42.194.789.3 1.104.3.234 0 .384-.06.465-.105l-.046-.569c-.098-1.626-.225-3.651.307-4.837C7.392 1.077 10.739.807 11.727.807l.419-.015h.06z"/>
  </svg>
)

export function SiteFooter() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await subscribeToNewsletter(email)
      toast.success('Inscrit avec succès !')
      setEmail('')
    } catch (error) {
      toast.error("Erreur lors de l'inscription")
    } finally {
      setIsLoading(false)
    }
  }

  const pathname = usePathname()
  if (pathname?.startsWith('/admin')) return null

  return (
    <footer className="mt-16 bg-[#1a1a1a] text-white overflow-hidden relative rounded-t-[32px] md:rounded-t-[48px]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px] mix-blend-screen" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px] mix-blend-screen" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Main Info Column */}
          <div className="flex flex-col gap-8 lg:col-span-4 text-center lg:text-left items-center lg:items-start">
            <Link href="/" className="inline-block transition-transform hover:scale-105 active:scale-95 w-fit">
              <span className="font-serif text-3xl font-bold tracking-tight text-white drop-shadow-sm">Dilya🌸</span>
            </Link>
            <p className="text-[13px] leading-relaxed text-white/70 max-w-sm">
              L'élégance minimaliste pour la femme moderne. Des pièces intemporelles conçues avec passion.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white transition-all hover:bg-white hover:text-[#e2959c] hover:scale-110">
                <InstagramIcon className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white transition-all hover:bg-white hover:text-[#e2959c] hover:scale-110">
                <TikTokIcon className="h-4 w-4" />
                <span className="sr-only">TikTok</span>
              </a>
              <a href="https://snapchat.com" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white transition-all hover:bg-white hover:text-[#e2959c] hover:scale-110">
                <SnapchatIcon className="h-4 w-4" />
                <span className="sr-only">Snapchat</span>
              </a>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-4 sm:grid-cols-3">
            <div className="flex flex-col gap-4">
              <h3 className="font-serif text-sm font-semibold text-white tracking-wider uppercase">Boutique</h3>
              <div className="flex flex-col gap-2.5 text-[11px] text-white/60">
                <Link href="/categorie/everyday" className="w-fit hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-white after:transition-all hover:after:w-full">Everyday</Link>
                <Link href="/categorie/night" className="w-fit hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-white after:transition-all hover:after:w-full">Night</Link>
                <Link href="/categorie/accessories" className="w-fit hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-white after:transition-all hover:after:w-full">Accessories</Link>
                <Link href="/nouveautes" className="w-fit hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-white after:transition-all hover:after:w-full">Nouveautés</Link>
              </div>
            </div>
            
            <div className="flex flex-col gap-4">
              <h3 className="font-serif text-sm font-semibold text-white tracking-wider uppercase">À propos</h3>
              <div className="flex flex-col gap-2.5 text-[11px] text-white/60">
                <Link href="/notre-histoire" className="w-fit hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-white after:transition-all hover:after:w-full">Notre histoire</Link>
                <Link href="/valeurs" className="w-fit hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-white after:transition-all hover:after:w-full">Nos valeurs</Link>
                <Link href="/journal" className="w-fit hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-white after:transition-all hover:after:w-full">Journal</Link>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="font-serif text-sm font-semibold text-white tracking-wider uppercase">Aide</h3>
              <div className="flex flex-col gap-2.5 text-[11px] text-white/60">
                <Link href="/faq" className="w-fit hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-white after:transition-all hover:after:w-full">FAQ</Link>
                <Link href="/livraison" className="w-fit hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-white after:transition-all hover:after:w-full">Livraison</Link>
                <Link href="/retours" className="w-fit hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-white after:transition-all hover:after:w-full">Retours</Link>
                <Link href="/guide-des-tailles" className="w-fit hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-white after:transition-all hover:after:w-full">Guide des tailles</Link>
                <Link href="/contact" className="w-fit hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-white after:transition-all hover:after:w-full">Contact</Link>
              </div>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-4 bg-white/5 rounded-3xl p-8 border border-white/10 text-center lg:text-left shadow-sm">
            <h3 className="font-serif text-[22px] font-medium text-white mb-3">Rejoins l'univers DILYA</h3>
            <p className="text-[11px] leading-relaxed text-white/80 max-w-xs mx-auto lg:mx-0">
              Sois la première informée des nouveautés et offres exclusives.
            </p>
            <form className="mt-6 flex flex-col sm:flex-row gap-3" onSubmit={handleSubscribe}>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ton e-mail"
                className="h-12 rounded-xl border-white/20 bg-white/10 text-white placeholder:text-white/60 focus-visible:ring-white/40 text-[11px] px-5"
                disabled={isLoading}
              />
              <Button 
                type="submit" 
                variant="secondary" 
                disabled={isLoading}
                className="h-12 rounded-xl px-8 font-semibold text-[11px] uppercase tracking-wider bg-[#d47885] text-white hover:bg-[#c26774] border-none shadow-sm transition-colors"
              >
                {isLoading ? "En cours..." : "S'inscrire"}
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between border-t border-white/15 pt-8 text-xs text-white/60 sm:flex-row">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-center sm:text-left mb-4 sm:mb-0">
            <p>© {new Date().getFullYear()} DILYA — Tous droits réservés.</p>
            <p>
              Fait avec amour au Sénégal. {' '}
              <a href="https://wockytech.xyz" target="_blank" rel="noopener noreferrer" className="font-medium hover:text-white underline underline-offset-2 transition-colors">
                WockyTech
              </a>
            </p>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-6 sm:mt-0">
            <Link href="/mentions-legales" className="hover:text-white">Mentions légales</Link>
            <Link href="/confidentialite" className="hover:text-white">Confidentialité</Link>
            <Link href="/cgv" className="hover:text-white">Conditions générales</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
