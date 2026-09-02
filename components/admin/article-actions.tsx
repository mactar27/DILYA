'use client'

import { useState, useTransition } from 'react'
import { deleteArticle, toggleArticlePublished } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Trash2, Eye, EyeOff, Loader2 } from 'lucide-react'

export function DeleteArticleButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition()
  const [confirm, setConfirm] = useState(false)

  function handleDelete() {
    if (!confirm) { setConfirm(true); return }
    startTransition(async () => {
      const result = await deleteArticle(id)
      if (result.error) toast.error(result.error)
      else toast.success('Article supprimé.')
    })
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className={confirm ? 'text-destructive' : 'text-muted-foreground hover:text-destructive'}
      onClick={handleDelete}
      disabled={isPending}
      title={confirm ? 'Confirmer la suppression' : 'Supprimer'}
    >
      {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
    </Button>
  )
}

export function TogglePublishButton({ id, isPublished }: { id: string; isPublished: boolean }) {
  const [isPending, startTransition] = useTransition()

  function handleToggle() {
    startTransition(async () => {
      const result = await toggleArticlePublished(id, !isPublished)
      if (result.error) toast.error(result.error)
      else toast.success(isPublished ? 'Article dépublié.' : 'Article publié !')
    })
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className={isPublished ? 'text-green-600 hover:text-green-800' : 'text-muted-foreground hover:text-foreground'}
      onClick={handleToggle}
      disabled={isPending}
      title={isPublished ? 'Dépublier' : 'Publier'}
    >
      {isPending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : isPublished ? (
        <Eye className="h-4 w-4" />
      ) : (
        <EyeOff className="h-4 w-4" />
      )}
    </Button>
  )
}
