import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import { CategoryForm } from '@/components/admin/category-form'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  const category = await prisma.category.findUnique({
    where: { id }
  })

  if (!category) {
    notFound()
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8 flex items-center gap-4">
        <Link 
          href="/admin/categories" 
          className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </Link>
        <h1 className="font-serif text-3xl font-medium">Modifier : {category.name}</h1>
      </div>
      
      <CategoryForm initialData={category} />
    </div>
  )
}
