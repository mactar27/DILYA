import { prisma } from '@/lib/db'
import Link from 'next/link'
import { Plus, Edit, Clock, Tag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DeleteArticleButton, TogglePublishButton } from '@/components/admin/article-actions'

export const dynamic = 'force-dynamic'

export default async function AdminArticlesPage() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-serif text-3xl font-medium">Articles du journal</h1>
        <Link href="/admin/articles/nouveau">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nouvel article
          </Button>
        </Link>
      </div>

      <div className="rounded-xl border bg-card overflow-hidden">
        {articles.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">
            <p className="text-lg mb-2">Aucun article pour le moment.</p>
            <p className="text-sm">Créez votre premier article pour alimenter le journal.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-secondary/50 text-muted-foreground uppercase text-xs">
                <tr>
                  <th className="px-6 py-4 font-medium">Titre</th>
                  <th className="px-6 py-4 font-medium">Catégorie</th>
                  <th className="px-6 py-4 font-medium">Lecture</th>
                  <th className="px-6 py-4 font-medium">Statut</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {articles.map((article) => (
                  <tr key={article.id} className="hover:bg-secondary/20 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-foreground">{article.title}</p>
                        <p className="text-xs text-muted-foreground font-mono mt-0.5">
                          /journal/{article.slug}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{article.category}</td>
                    <td className="px-6 py-4 text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {article.readTime}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {article.isPublished ? (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Publié
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                          Brouillon
                        </Badge>
                      )}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground text-xs">
                      {article.createdAt.toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end items-center gap-1">
                        <TogglePublishButton id={article.id} isPublished={article.isPublished} />
                        <Link
                          href={`/admin/articles/${article.id}`}
                          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Modifier</span>
                        </Link>
                        <DeleteArticleButton id={article.id} />
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
