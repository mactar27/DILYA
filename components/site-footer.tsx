'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

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
  const pathname = usePathname()
  if (pathname?.startsWith('/admin')) return null

  return (
    <footer className="mt-16 bg-[#e2959c] text-white overflow-hidden relative rounded-t-[32px] md:rounded-t-[48px]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Logo Column */}
          <div className="lg:col-span-2 flex flex-col items-center lg:items-start text-center lg:text-left mb-6 lg:mb-0">
            <Link href="/" className="flex items-center gap-1 relative inline-block">
              <span className="font-script text-[4.5rem] text-white font-normal leading-none drop-shadow-sm">Dilya</span>
              <span className="text-3xl relative top-2 opacity-90 drop-shadow-sm">🌸</span>
            </Link>
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-6">
            <div>
              <h3 className="font-sans text-sm font-semibold text-white">Boutique</h3>
              <ul className="mt-4 flex flex-col gap-3 text-xs text-primary-foreground/70">
                <li><Link href="/categorie/everyday" className="hover:text-white">Everyday</Link></li>
                <li><Link href="/categorie/night" className="hover:text-white">Night</Link></li>
                <li><Link href="/categorie/accessories" className="hover:text-white">Accessories</Link></li>
                <li><Link href="/categorie/nouveautes" className="hover:text-white">Nouveautés</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-sans text-sm font-semibold text-white">À propos</h3>
              <ul className="mt-4 flex flex-col gap-3 text-xs text-primary-foreground/70">
                <li><Link href="/notre-histoire" className="hover:text-white">Notre histoire</Link></li>
                <li><Link href="/valeurs" className="hover:text-white">Nos valeurs</Link></li>
                <li><Link href="/journal" className="hover:text-white">Journal</Link></li>
                <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-sans text-sm font-semibold text-white">Aide</h3>
              <ul className="mt-4 flex flex-col gap-3 text-xs text-primary-foreground/70">
                <li><Link href="/livraison" className="hover:text-white">Livraison</Link></li>
                <li><Link href="/retours" className="hover:text-white">Retours</Link></li>
                <li><Link href="/guide-des-tailles" className="hover:text-white">Guide des tailles</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div className="flex flex-col items-center sm:items-start">
              <h3 className="font-sans text-[13px] font-bold uppercase tracking-wider text-white relative inline-block">
                Nous suivre
                <span className="absolute -bottom-10 -right-16 text-3xl font-script text-white/40 rotate-[-15deg]">Merci ♡</span>
              </h3>
              <div className="mt-5 flex gap-3 text-white">
                <a href="https://www.instagram.com/im_laicha/" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 hover:bg-white hover:text-[#e2959c] transition-colors"><InstagramIcon className="h-4 w-4" /></a>
                <a href="https://www.tiktok.com/@laicha.xo" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 hover:bg-white hover:text-[#e2959c] transition-colors"><TikTokIcon className="h-4 w-4" /></a>
                <a href="https://www.snapchat.com/@laichastar" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 hover:bg-white hover:text-[#e2959c] transition-colors"><SnapchatIcon className="h-[18px] w-[18px]" /></a>
              </div>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-4 bg-white/5 rounded-3xl p-8 lg:ml-auto border border-white/10 text-center lg:text-left shadow-sm">
            <h3 className="font-serif text-[22px] font-medium text-white mb-3">Rejoins l'univers DILYA</h3>
            <p className="text-[11px] leading-relaxed text-white/80 max-w-xs mx-auto lg:mx-0">
              Sois la première informée des nouveautés et offres exclusives.
            </p>
            <form className="mt-6 flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
              <Input
                type="email"
                required
                placeholder="Ton e-mail"
                className="h-12 rounded-xl border-white/20 bg-white/10 text-white placeholder:text-white/60 focus-visible:ring-white/40 text-[11px] px-5"
              />
              <Button type="submit" variant="secondary" className="h-12 rounded-xl px-8 font-semibold text-[11px] uppercase tracking-wider bg-[#d47885] text-white hover:bg-[#c26774] border-none shadow-sm transition-colors">
                S'inscrire
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between border-t border-white/15 pt-8 text-[9px] text-white/60 sm:flex-row">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-center sm:text-left mb-4 sm:mb-0">
            <p>© {new Date().getFullYear()} DILYA — Tous droits réservés.</p>
            <p>
              Fait avec amour au Sénégal.
              <a href="https://wockytech.xyz" target="_blank" rel="noopener noreferrer" className="hover:text-white underline underline-offset-2 transition-colors">
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
