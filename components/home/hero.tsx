import Image from 'next/image'
import { ButtonLink } from '@/components/ui/button-link'
import { ArrowRight } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-background">
      {/* Video Background */}
      <video 
        src="/floral_hero.mov" 
        autoPlay 
        loop 
        muted 
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      {/* Gradient overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/10 bg-gradient-to-t from-black/30 via-transparent to-black/10"></div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 mt-16 w-full max-w-4xl">
        <h1 className="font-script text-[6rem] md:text-[10rem] font-normal text-white drop-shadow-lg mb-0 md:mb-2">
          Dilya
        </h1>
        <p className="text-[11px] md:text-sm font-semibold tracking-[0.2em] text-white drop-shadow-md mb-8 uppercase">
          L'élégance à chaque instant.
        </p>
        <ButtonLink href="/boutique" size="lg" className="h-12 md:h-14 rounded-full px-8 md:px-10 text-xs md:text-sm font-bold uppercase tracking-widest shadow-xl bg-primary text-white hover:bg-primary/90 transition-transform hover:scale-105 border-none">
          Découvrir la collection
        </ButtonLink>

        {/* Scroll indicator for desktop */}
        <div className="hidden md:flex absolute -bottom-32 left-1/2 -translate-x-1/2 flex-col items-center animate-bounce">
          <span className="text-[10px] text-white/80 uppercase tracking-widest mb-2">Défiler</span>
          <div className="h-10 w-px bg-white/50"></div>
        </div>
      </div>
    </section>
  )
}
