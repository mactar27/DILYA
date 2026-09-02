import { prisma } from '@/lib/db'
import Link from 'next/link'
import { formatPrice } from '@/lib/format'
import { Badge } from '@/components/ui/badge'
import { Eye } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function CommandesPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: { items: true }
      }
    }
  })

  return (
    <div className="p-8">
      <h1 className="font-serif text-3xl font-medium mb-8">Commandes</h1>
      
      <div className="rounded-xl border bg-card overflow-hidden">
        {orders.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            Aucune commande pour le moment.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-secondary/50 text-muted-foreground uppercase text-xs">
                <tr>
                  <th className="px-6 py-4 font-medium">Commande</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Client</th>
                  <th className="px-6 py-4 font-medium">Statut</th>
                  <th className="px-6 py-4 font-medium">Total</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-secondary/20 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground">
                      #{order.id.slice(-6).toUpperCase()}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4">
                      {order.firstName} {order.lastName}
                    </td>
                    <td className="px-6 py-4">
                      {order.status === 'PENDING' && <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">En attente</Badge>}
                      {order.status === 'CONFIRMED' && <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Confirmée</Badge>}
                      {order.status === 'SHIPPED' && <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Expédiée</Badge>}
                      {order.status === 'DELIVERED' && <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Livrée</Badge>}
                      {order.status === 'CANCELLED' && <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Annulée</Badge>}
                    </td>
                    <td className="px-6 py-4 font-medium">
                      {formatPrice(order.subtotal)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link 
                        href={`/admin/commandes/${order.id}`}
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">Voir les détails</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
