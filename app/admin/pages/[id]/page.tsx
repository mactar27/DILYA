import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import { PageForm } from './page-form'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function EditPage({ params }: { params: { id: string } }) {
  let page = null

  if (params.id !== 'nouveau') {
    page = await prisma.page.findUnique({
      where: { id: params.id }
    })
    
    if (!page) {
      notFound()
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8 flex items-center gap-4">
        <Link href="/admin/pages" className="p-2 hover:bg-secondary rounded-full transition-colors">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <h1 className="font-serif text-3xl font-medium">
          {page ? 'Éditer la page' : 'Nouvelle page'}
        </h1>
      </div>
      
      <div className="rounded-xl border bg-card p-6">
        <PageForm initialData={page} />
      </div>
    </div>
  )
}
