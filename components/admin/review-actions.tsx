'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { updateReviewStatus, deleteReview } from '@/app/actions'
import { toast } from 'sonner'
import { Check, X, Trash2 } from 'lucide-react'

interface ReviewActionsProps {
  reviewId: string
  currentStatus: string
}

export function ReviewActions({ reviewId, currentStatus }: ReviewActionsProps) {
  const [isUpdating, setIsUpdating] = useState(false)

  const handleStatusChange = async (status: 'PUBLISHED' | 'REJECTED' | 'PENDING') => {
    setIsUpdating(true)
    const result = await updateReviewStatus(reviewId, status)
    setIsUpdating(false)
    
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success(`Le statut a été mis à jour avec succès`)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Voulez-vous vraiment supprimer cet avis ?')) return
    
    setIsUpdating(true)
    const result = await deleteReview(reviewId)
    setIsUpdating(false)
    
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('L\'avis a été supprimé')
    }
  }

  return (
    <div className="flex items-center gap-2">
      {currentStatus !== 'PUBLISHED' && (
        <Button 
          size="sm" 
          variant="outline" 
          className="bg-green-50 hover:bg-green-100 text-green-700 hover:text-green-800 border-green-200"
          onClick={() => handleStatusChange('PUBLISHED')}
          disabled={isUpdating}
        >
          <Check className="w-4 h-4 mr-1" />
          Publier
        </Button>
      )}
      
      {currentStatus !== 'REJECTED' && (
        <Button 
          size="sm" 
          variant="outline" 
          className="bg-amber-50 hover:bg-amber-100 text-amber-700 hover:text-amber-800 border-amber-200"
          onClick={() => handleStatusChange('REJECTED')}
          disabled={isUpdating}
        >
          <X className="w-4 h-4 mr-1" />
          Rejeter
        </Button>
      )}
      
      <Button 
        size="sm" 
        variant="ghost" 
        className="text-destructive hover:bg-destructive/10"
        onClick={handleDelete}
        disabled={isUpdating}
      >
        <Trash2 className="w-4 h-4" />
        <span className="sr-only">Supprimer</span>
      </Button>
    </div>
  )
}
