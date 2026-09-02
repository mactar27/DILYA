import { prisma } from '@/lib/db'
import { formatPrice } from '@/lib/format'

export const dynamic = 'force-dynamic'

export default async function ClientsPage() {
  // Get unique clients from orders
  const orders = await prisma.order.findMany({
    select: {
      email: true,
      firstName: true,
      lastName: true,
      phone: true,
      createdAt: true,
      subtotal: true,
    },
    orderBy: { createdAt: 'desc' }
  })

  // Group by email
  const clientsMap = new Map()
  orders.forEach(order => {
    if (!clientsMap.has(order.email)) {
      clientsMap.set(order.email, {
        email: order.email,
        name: `${order.firstName} ${order.lastName}`,
        phone: order.phone,
        firstOrder: order.createdAt,
        lastOrder: order.createdAt,
        totalSpent: order.subtotal,
        orderCount: 1
      })
    } else {
      const client = clientsMap.get(order.email)
      client.totalSpent += order.subtotal
      client.orderCount += 1
      if (order.createdAt < client.firstOrder) client.firstOrder = order.createdAt
      if (order.createdAt > client.lastOrder) client.lastOrder = order.createdAt
    }
  })

  const clients = Array.from(clientsMap.values())

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-serif text-3xl font-medium">Clients</h1>
      </div>
      
      <div className="rounded-xl border bg-card overflow-hidden">
        {clients.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            Aucun client pour le moment.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-secondary/50 text-muted-foreground uppercase text-xs">
                <tr>
                  <th className="px-6 py-4 font-medium">Nom complet</th>
                  <th className="px-6 py-4 font-medium">Email & Tél</th>
                  <th className="px-6 py-4 font-medium">Commandes</th>
                  <th className="px-6 py-4 font-medium">Total dépensé</th>
                  <th className="px-6 py-4 font-medium">Dernière commande</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {clients.map((client) => (
                  <tr key={client.email} className="hover:bg-secondary/20 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground">
                      {client.name}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      <div className="flex flex-col">
                        <a href={`mailto:${client.email}`} className="hover:underline">{client.email}</a>
                        <span className="text-xs">{client.phone}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {client.orderCount}
                    </td>
                    <td className="px-6 py-4 font-medium">
                      {formatPrice(client.totalSpent)}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {new Date(client.lastOrder).toLocaleDateString('fr-FR')}
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
