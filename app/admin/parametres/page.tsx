import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function ParametresPage() {
  const settings = await prisma.setting.findMany()

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-serif text-3xl font-medium">Paramètres</h1>
      </div>
      
      <div className="rounded-xl border bg-card overflow-hidden">
        {settings.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            Aucun paramètre configuré.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-secondary/50 text-muted-foreground uppercase text-xs">
                <tr>
                  <th className="px-6 py-4 font-medium">Clé</th>
                  <th className="px-6 py-4 font-medium">Valeur</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {settings.map((setting) => (
                  <tr key={setting.id} className="hover:bg-secondary/20 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground">{setting.key}</td>
                    <td className="px-6 py-4 text-muted-foreground">{setting.value}</td>
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
