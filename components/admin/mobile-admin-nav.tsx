'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, ShoppingBag, Users, Package, Settings, LogOut, MessageSquare, Menu, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { logoutAdmin } from '@/app/actions'
import { toast } from 'sonner'

const navItems = [
  { href: '/admin', label: 'Tableau de bord', icon: LayoutDashboard },
  { href: '/admin/produits', label: 'Produits', icon: Package },
  { href: '/admin/articles', label: 'Articles', icon: FileText },
  { href: '/admin/avis', label: 'Avis clients', icon: MessageSquare },
  { href: '/admin/categories', label: 'Catégories', icon: LayoutDashboard },
  { href: '/admin/commandes', label: 'Commandes', icon: ShoppingBag },
  { href: '/admin/clients', label: 'Clients', icon: Users },
  { href: '/admin/promotions', label: 'Promotions', icon: LayoutDashboard },
  { href: '/admin/livraison', label: 'Livraison', icon: Package },
  { href: '/admin/pages', label: 'Pages', icon: LayoutDashboard },
  { href: '/admin/parametres', label: 'Paramètres', icon: Settings },
]

export function MobileAdminNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await logoutAdmin()
      toast.success('Déconnecté')
      setOpen(false)
      router.push('/admin/login')
      router.refresh()
    } catch (err) {
      toast.error('Erreur lors de la déconnexion')
    }
  }

  return (
    <div className="md:hidden border-b bg-background flex items-center justify-between p-4 sticky top-0 z-40">
      <Link href="/" className="inline-flex items-center">
        <span className="font-script text-3xl text-primary font-normal">Dilya</span>
      </Link>
      
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SheetHeader className="border-b p-4 text-left">
            <SheetTitle className="font-script text-3xl font-normal text-primary">Dilya Admin</SheetTitle>
          </SheetHeader>
          <div className="flex flex-1 flex-col overflow-y-auto px-3 py-4 h-[calc(100vh-5rem)]">
            <nav className="flex flex-1 flex-col gap-1">
              {navItems.map((item) => {
                const active = pathname === item.href
                const Icon = item.icon
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      active 
                        ? "bg-primary text-primary-foreground" 
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                )
              })}
            </nav>
            <div className="mt-auto pt-4">
              <button 
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <LogOut className="h-4 w-4" />
                Déconnexion
              </button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
