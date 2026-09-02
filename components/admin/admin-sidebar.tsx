'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, ShoppingBag, Users, Package, Settings, LogOut, MessageSquare, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'

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

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed bottom-0 left-0 top-0 z-40 hidden w-64 flex-col border-r bg-background md:flex">
      <div className="flex h-14 items-center border-b px-6">
        <Link href="/" className="inline-flex items-center">
          <span className="font-script text-3xl text-primary font-normal">Dilya</span>
        </Link>
      </div>

      <div className="flex flex-1 flex-col overflow-y-auto px-3 py-4">
        <nav className="flex flex-1 flex-col gap-1">
          {navItems.map((item) => {
            const active = pathname === item.href
            const Icon = item.icon
            
            return (
              <Link
                key={item.href}
                href={item.href}
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
          <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
            <LogOut className="h-4 w-4" />
            Déconnexion
          </button>
        </div>
      </div>
    </aside>
  )
}
