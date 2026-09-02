import { prisma } from '@/lib/db'
import { ProductForm } from '@/components/admin/product-form'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({
    select: { id: true, name: true }
  })

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8 flex items-center gap-4">
        <Link 
          href="/admin/produits" 
          className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </Link>
        <h1 className="font-serif text-3xl font-medium">Nouveau Produit</h1>
      </div>
      
      <ProductForm categories={categories} />
    </div>
  )
}
