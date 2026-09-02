import { prisma } from '@/lib/db'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Edit } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DeleteProductButton } from '@/components/admin/delete-product-button'
import { formatPrice } from '@/lib/format'

export const dynamic = 'force-dynamic'

export default async function ProduitsPage() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
      images: {
        take: 1
      }
    },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-serif text-3xl font-medium">Produits</h1>
        <Link href="/admin/produits/nouveau">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nouveau produit
          </Button>
        </Link>
      </div>
      
      <div className="rounded-xl border bg-card overflow-hidden">
        {products.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            Aucun produit pour le moment.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-secondary/50 text-muted-foreground uppercase text-xs">
                <tr>
                  <th className="px-6 py-4 font-medium">Image</th>
                  <th className="px-6 py-4 font-medium">Nom</th>
                  <th className="px-6 py-4 font-medium">Catégorie</th>
                  <th className="px-6 py-4 font-medium">Prix</th>
                  <th className="px-6 py-4 font-medium">Statut</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-secondary/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="relative h-12 w-12 rounded-md overflow-hidden bg-secondary/20 border">
                        {product.images[0] && (
                          <Image src={product.images[0].url} alt={product.name} fill className="object-cover" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-foreground">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {product.category.name}
                    </td>
                    <td className="px-6 py-4 font-medium">
                      {formatPrice(product.price)}
                      {product.oldPrice && <span className="text-xs text-muted-foreground line-through ml-2">{formatPrice(product.oldPrice)}</span>}
                    </td>
                    <td className="px-6 py-4">
                      {product.inStock ? (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">En stock ({product.stock})</Badge>
                      ) : (
                        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Rupture</Badge>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end items-center gap-2">
                        <Link 
                          href={`/admin/produits/${product.id}`}
                          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Modifier</span>
                        </Link>
                        <DeleteProductButton id={product.id} />
                      </div>
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
