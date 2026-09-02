import { ArticleForm } from '@/components/admin/article-form'

export default function NouvelArticlePage() {
  return (
    <div className="p-8">
      <h1 className="font-serif text-3xl font-medium mb-8">Nouvel article</h1>
      <ArticleForm />
    </div>
  )
}
