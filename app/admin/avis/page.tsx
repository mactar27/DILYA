import { prisma } from '@/lib/db'
import { ReviewActions } from '@/components/admin/review-actions'
import { Badge } from '@/components/ui/badge'
import { Star } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AdminReviewsPage() {
  const reviews = await prisma.review.findMany({
    orderBy: { date: 'desc' },
    include: { product: true }
  })

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-serif text-3xl font-medium">Gestion des avis</h1>
      </div>

      <div className="rounded-xl border bg-card">
        {reviews.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            Aucun avis n'a encore été posté.
          </div>
        ) : (
          <div className="divide-y">
            {reviews.map((review) => (
              <div key={review.id} className="p-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  
                  {/* Contenu de l'avis */}
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-medium">{review.author}</span>
                      <span className="text-sm text-muted-foreground">
                        sur <span className="font-medium text-foreground">{review.product.name}</span>
                      </span>
                      <span className="text-sm text-muted-foreground">
                        • {new Date(review.date).toLocaleDateString('fr-FR')}
                      </span>
                      {review.status === 'PENDING' && <Badge variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-100">En attente</Badge>}
                      {review.status === 'PUBLISHED' && <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">Publié</Badge>}
                      {review.status === 'REJECTED' && <Badge variant="secondary" className="bg-destructive/10 text-destructive hover:bg-destructive/10">Rejeté</Badge>}
                    </div>

                    <div className="flex items-center gap-0.5 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < review.rating ? 'fill-current' : 'fill-muted text-muted-foreground'}`}
                        />
                      ))}
                    </div>

                    <p className="text-foreground text-sm mt-2">{review.text}</p>
                  </div>

                  {/* Actions de modération */}
                  <ReviewActions reviewId={review.id} currentStatus={review.status} />

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
