import { prisma } from '@/lib/db'
import { formatPrice } from '@/lib/format'

export const dynamic = 'force-dynamic'

export default async function LivraisonPage() {
  const rules = await prisma.shippingRule.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-serif text-3xl font-medium">Frais de livraison</h1>
      </div>
      
      <div className="rounded-xl border bg-card overflow-hidden">
        {rules.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            Aucune règle de livraison configurée.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-secondary/50 text-muted-foreground uppercase text-xs">
                <tr>
                  <th className="px-6 py-4 font-medium">Nom</th>
                  <th className="px-6 py-4 font-medium">Zone</th>
                  <th className="px-6 py-4 font-medium">Prix</th>
                  <th className="px-6 py-4 font-medium">Panier min.</th>
                  <th className="px-6 py-4 font-medium">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {rules.map((rule) => (
                  <tr key={rule.id} className="hover:bg-secondary/20 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground">{rule.name}</td>
                    <td className="px-6 py-4 text-muted-foreground">{rule.zone}</td>
                    <td className="px-6 py-4">{formatPrice(rule.price)}</td>
                    <td className="px-6 py-4">{rule.minOrderVal ? formatPrice(rule.minOrderVal) : '-'}</td>
                    <td className="px-6 py-4">{rule.isActive ? 'Actif' : 'Inactif'}</td>
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
