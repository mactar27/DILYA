import { CategoryForm } from '@/components/admin/category-form'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export default function NewCategoryPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8 flex items-center gap-4">
        <Link 
          href="/admin/categories" 
          className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </Link>
        <h1 className="font-serif text-3xl font-medium">Nouvelle Catégorie</h1>
      </div>
      
      <CategoryForm />
    </div>
  )
}
