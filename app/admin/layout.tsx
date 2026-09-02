import { ReactNode } from 'react'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { MobileAdminNav } from '@/components/admin/mobile-admin-nav'

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
      <AdminSidebar />
      <MobileAdminNav />
      <div className="flex-1 md:pl-64">
        {children}
      </div>
    </div>
  )
}
