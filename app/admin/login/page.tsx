'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { loginAdmin } from '@/app/actions'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import Link from 'next/link'

export default function AdminLoginPage() {
  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!code) return

    setIsLoading(true)
    try {
      const result = await loginAdmin(code)
      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success('Connexion réussie')
        router.push('/admin')
      }
    } catch (err) {
      toast.error('Erreur de connexion')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
      <Link href="/" className="mb-12 inline-block transition-transform hover:scale-105 active:scale-95">
        <span className="font-script text-5xl font-normal tracking-tight text-[#e2959c]">Dilya</span>
        <span className="text-3xl relative top-2 opacity-90">🌸</span>
      </Link>

      <div className="w-full max-w-sm bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-neutral-100">
        <h1 className="text-center font-serif text-2xl font-bold mb-6 text-foreground">Accès Réservé</h1>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <Input
              type="password"
              placeholder="Code d'accès"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="h-12 rounded-xl text-center tracking-widest text-lg focus-visible:ring-[#e2959c]"
              autoFocus
              disabled={isLoading}
            />
          </div>
          <Button 
            type="submit" 
            disabled={isLoading}
            className="h-12 rounded-xl font-semibold text-[13px] uppercase tracking-wider bg-foreground text-background hover:bg-foreground/90 transition-colors"
          >
            {isLoading ? 'Vérification...' : 'Déverrouiller'}
          </Button>
        </form>
      </div>
    </div>
  )
}
