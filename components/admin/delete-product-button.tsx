'use client'

import { useState } from 'react'
import { Trash2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { deleteProduct } from '@/app/actions'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export function DeleteProductButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm('Voulez-vous vraiment supprimer ce produit ?')) return
    
    setIsDeleting(true)
    const result = await deleteProduct(id)
    setIsDeleting(false)
    
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Produit supprimé')
      // router.refresh() handles updating the server component data
      router.refresh()
    }
  }

  return (
    <Button 
      variant="ghost" 
      size="icon"
      className="h-9 w-9 text-destructive hover:bg-destructive/10 hover:text-destructive"
      onClick={handleDelete}
      disabled={isDeleting}
    >
      {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
      <span className="sr-only">Supprimer</span>
    </Button>
  )
}
