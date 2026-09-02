import { prisma } from '@/lib/db'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Edit } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const dynamic = 'force-dynamic'

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { products: true }
      }
    }
  })

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-serif text-3xl font-medium">Catégories</h1>
        <Link href="/admin/categories/nouveau">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle catégorie
          </Button>
        </Link>
      </div>
      
      <div className="rounded-xl border bg-card overflow-hidden">
        {categories.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            Aucune catégorie pour le moment.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-secondary/50 text-muted-foreground uppercase text-xs">
                <tr>
                  <th className="px-6 py-4 font-medium">Image</th>
                  <th className="px-6 py-4 font-medium">Nom</th>
                  <th className="px-6 py-4 font-medium">Slogan</th>
                  <th className="px-6 py-4 font-medium">Produits</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {categories.map((category) => (
                  <tr key={category.id} className="hover:bg-secondary/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="relative h-12 w-12 rounded-md overflow-hidden bg-secondary/20">
                        {category.image && (
                          <Image src={category.image} alt={category.name} fill className="object-cover" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-foreground">
                      {category.name}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground max-w-[200px] truncate">
                      {category.tagline}
                    </td>
                    <td className="px-6 py-4">
                      {category._count.products}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link 
                        href={`/admin/categories/${category.id}`}
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Modifier</span>
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
