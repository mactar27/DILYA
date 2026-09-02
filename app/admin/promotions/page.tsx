import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function PromotionsPage() {
  const promos = await prisma.promotion.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-serif text-3xl font-medium">Promotions</h1>
      </div>
      
      <div className="rounded-xl border bg-card overflow-hidden">
        {promos.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            Aucune promotion en cours.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-secondary/50 text-muted-foreground uppercase text-xs">
                <tr>
                  <th className="px-6 py-4 font-medium">Code</th>
                  <th className="px-6 py-4 font-medium">Type</th>
                  <th className="px-6 py-4 font-medium">Valeur</th>
                  <th className="px-6 py-4 font-medium">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {promos.map((promo) => (
                  <tr key={promo.id} className="hover:bg-secondary/20 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground">{promo.code}</td>
                    <td className="px-6 py-4 text-muted-foreground">{promo.discountType}</td>
                    <td className="px-6 py-4">{promo.discountValue}</td>
                    <td className="px-6 py-4">{promo.isActive ? 'Actif' : 'Inactif'}</td>
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
