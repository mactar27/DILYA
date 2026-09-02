'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { saveArticle } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ImageUpload } from '@/components/admin/image-upload'
import { toast } from 'sonner'
import { Loader2, Eye, EyeOff, X } from 'lucide-react'
import Image from 'next/image'

interface Props {
  article?: {
    id: string
    slug: string
    title: string
    excerpt: string
    content: string
    category: string
    readTime: string
    image: string
    isPublished: boolean
  }
}

export function ArticleForm({ article }: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const [form, setForm] = useState({
    slug: article?.slug ?? '',
    title: article?.title ?? '',
    excerpt: article?.excerpt ?? '',
    content: article?.content ?? '',
    category: article?.category ?? '',
    readTime: article?.readTime ?? '5 min',
    image: article?.image ?? '',
    isPublished: article?.isPublished ?? false,
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  // Auto-generate slug from title
  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const title = e.target.value
    const slug = title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
    setForm((prev) => ({ ...prev, title, slug: article ? prev.slug : slug }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    startTransition(async () => {
      const result = await saveArticle(article?.id ?? null, form)
      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success(article ? 'Article mis à jour !' : 'Article créé !')
        router.push('/admin/articles')
        router.refresh()
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">Titre *</Label>
        <Input
          id="title"
          name="title"
          value={form.title}
          onChange={handleTitleChange}
          placeholder="5 rituels beauté inspirés de l'océan"
          required
        />
      </div>

      {/* Slug */}
      <div className="space-y-2">
        <Label htmlFor="slug">Slug (URL) *</Label>
        <Input
          id="slug"
          name="slug"
          value={form.slug}
          onChange={handleChange}
          placeholder="rituels-beaute-ocean"
          required
        />
        <p className="text-xs text-muted-foreground">
          URL publique : /journal/<span className="font-mono">{form.slug || '...'}</span>
        </p>
      </div>

      {/* Category + ReadTime */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Catégorie</Label>
          <Input
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Soins naturels"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="readTime">Temps de lecture</Label>
          <Input
            id="readTime"
            name="readTime"
            value={form.readTime}
            onChange={handleChange}
            placeholder="5 min"
          />
        </div>
      </div>

      {/* Excerpt */}
      <div className="space-y-2">
        <Label htmlFor="excerpt">Résumé court *</Label>
        <Textarea
          id="excerpt"
          name="excerpt"
          value={form.excerpt}
          onChange={handleChange}
          rows={3}
          placeholder="Accroche affichée sur la page listing du journal..."
          required
        />
      </div>

      {/* Image upload */}
      <div className="space-y-2">
        <Label>Image de couverture</Label>
        {form.image ? (
          <div className="relative w-full max-w-sm rounded-xl overflow-hidden border">
            <Image
              src={form.image}
              alt="Aperçu"
              width={400}
              height={300}
              className="w-full object-cover aspect-video"
            />
            <button
              type="button"
              onClick={() => setForm((prev) => ({ ...prev, image: '' }))}
              className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full p-1 transition-colors"
              title="Supprimer l'image"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <ImageUpload
            onClientUploadComplete={(url) =>
              setForm((prev) => ({ ...prev, image: url }))
            }
          />
        )}
      </div>

      {/* Content */}
      <div className="space-y-2">
        <Label htmlFor="content">Contenu de l'article *</Label>
        <Textarea
          id="content"
          name="content"
          value={form.content}
          onChange={handleChange}
          rows={18}
          placeholder="Écrivez le contenu complet de votre article ici..."
          required
          className="font-mono text-sm"
        />
        <p className="text-xs text-muted-foreground">
          Markdown supporté : **gras**, *italique*, ## Titre, - liste, {'>'} citation
        </p>
      </div>

      {/* Published */}
      <div className="flex items-center gap-3 rounded-lg border p-4">
        <button
          type="button"
          onClick={() => setForm((prev) => ({ ...prev, isPublished: !prev.isPublished }))}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
            form.isPublished ? 'bg-primary' : 'bg-muted'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
              form.isPublished ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
        <div>
          <p className="text-sm font-medium">
            {form.isPublished ? (
              <span className="flex items-center gap-1.5 text-green-700">
                <Eye className="h-4 w-4" /> Publié — visible sur le site
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <EyeOff className="h-4 w-4" /> Brouillon — non visible
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {article ? 'Enregistrer les modifications' : 'Créer l\'article'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/admin/articles')}
          disabled={isPending}
        >
          Annuler
        </Button>
      </div>
    </form>
  )
}
