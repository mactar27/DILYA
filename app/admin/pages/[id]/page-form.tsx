'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { savePage, deletePage } from '@/app/actions'

type PageData = {
  id?: string
  title: string
  slug: string
  content: string
  isPublished: boolean
}

export function PageForm({ initialData }: { initialData?: PageData | null }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    content: initialData?.content || '',
    isPublished: initialData?.isPublished ?? true,
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    
    try {
      const result = await savePage(initialData?.id || null, formData)
      if (result.error) {
        alert(result.error)
      } else {
        router.push('/admin/pages')
      }
    } catch (err) {
      alert('Une erreur est survenue.')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete() {
    if (!initialData?.id) return
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette page ?')) return
    
    setIsDeleting(true)
    try {
      const result = await deletePage(initialData.id)
      if (result.error) {
        alert(result.error)
      } else {
        router.push('/admin/pages')
      }
    } catch (err) {
      alert('Une erreur est survenue.')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Titre</Label>
          <Input 
            id="title" 
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">Slug (URL)</Label>
          <Input 
            id="slug" 
            value={formData.slug}
            onChange={(e) => setFormData({...formData, slug: e.target.value})}
            required
            placeholder="ex: a-propos"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="content">Contenu (HTML autorisé)</Label>
        <textarea 
          id="content"
          rows={12}
          value={formData.content}
          onChange={(e) => setFormData({...formData, content: e.target.value})}
          className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          required
        />
      </div>

      <div className="flex items-center gap-2">
        <input 
          type="checkbox" 
          id="isPublished"
          checked={formData.isPublished}
          onChange={(e) => setFormData({...formData, isPublished: e.target.checked})}
          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
        />
        <Label htmlFor="isPublished">Publié en ligne</Label>
      </div>

      <div className="flex items-center justify-between pt-4 border-t">
        {initialData?.id ? (
          <Button type="button" variant="destructive" onClick={handleDelete} disabled={isDeleting || loading}>
            {isDeleting ? 'Suppression...' : 'Supprimer'}
          </Button>
        ) : (
          <div></div>
        )}
        
        <div className="flex gap-4">
          <Button type="button" variant="outline" onClick={() => router.push('/admin/pages')} disabled={loading}>
            Annuler
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Enregistrement...' : 'Enregistrer'}
          </Button>
        </div>
      </div>
    </form>
  )
}
