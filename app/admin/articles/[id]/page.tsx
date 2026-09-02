import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import { ArticleForm } from '@/components/admin/article-form'

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditArticlePage({ params }: Props) {
  const { id } = await params
  const article = await prisma.article.findUnique({ where: { id } })
  if (!article) notFound()

  return (
    <div className="p-8">
      <h1 className="font-serif text-3xl font-medium mb-8">Modifier l'article</h1>
      <ArticleForm
        article={{
          id: article.id,
          slug: article.slug,
          title: article.title,
          excerpt: article.excerpt,
          content: article.content,
          category: article.category,
          readTime: article.readTime,
          image: article.image,
          isPublished: article.isPublished,
        }}
      />
    </div>
  )
}
