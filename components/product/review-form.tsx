'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { submitReview } from '@/app/actions'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export function ReviewForm({ productId }: { productId: string }) {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  async function handleSubmit(formData: FormData) {
    if (rating === 0) {
      toast.error('Veuillez sélectionner une note')
      return
    }

    setIsSubmitting(true)
    formData.append('rating', rating.toString())
    
    const result = await submitReview(productId, formData)
    
    if (result?.error) {
      toast.error(result.error)
      setIsSubmitting(false)
    } else {
      setIsSubmitted(true)
      setIsSubmitting(false)
      toast.success('Votre avis a été soumis et est en attente de modération')
    }
  }

  if (isSubmitted) {
    return (
      <div className="rounded-lg border bg-secondary/50 p-6 text-center">
        <h3 className="font-serif text-xl font-medium text-foreground">Merci pour votre avis !</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Il sera publié sur la page produit après avoir été modéré par notre équipe.
        </p>
      </div>
    )
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-5 rounded-lg border p-6">
      <h3 className="font-serif text-xl font-medium">Laisser un avis</h3>
      
      <div className="flex flex-col gap-2">
        <Label>Note</Label>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className="p-1"
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(star)}
            >
              <Star
                className={cn(
                  'h-6 w-6 transition-colors',
                  (hoverRating || rating) >= star
                    ? 'fill-amber-500 text-amber-500'
                    : 'fill-muted text-muted-foreground'
                )}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="author">Votre nom</Label>
        <Input 
          id="author" 
          name="author" 
          placeholder="ex: Marie D." 
          required 
          className="max-w-xs bg-background"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="text">Votre avis</Label>
        <Textarea 
          id="text" 
          name="text" 
          placeholder="Partagez votre expérience avec ce produit..." 
          required 
          className="min-h-[100px] bg-background"
        />
      </div>

      <Button type="submit" disabled={isSubmitting || rating === 0} className="w-fit">
        {isSubmitting ? 'Envoi en cours...' : 'Envoyer mon avis'}
      </Button>
    </form>
  )
}
