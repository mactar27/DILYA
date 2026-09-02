'use client'

import { UploadDropzone } from '@/utils/uploadthing'
import { toast } from 'sonner'
import '@uploadthing/react/styles.css'

interface ImageUploadProps {
  onClientUploadComplete: (url: string) => void
  endpoint?: "imageUploader"
}

export function ImageUpload({ onClientUploadComplete, endpoint = "imageUploader" }: ImageUploadProps) {
  return (
    <div className="border border-dashed rounded-lg bg-secondary/20 hover:bg-secondary/40 transition-colors">
      <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          if (res && res.length > 0) {
            res.forEach(file => onClientUploadComplete(file.url))
            toast.success(res.length > 1 ? `${res.length} images ajoutées avec succès` : 'Image ajoutée avec succès')
          }
        }}
        onUploadError={(error: Error) => {
          toast.error(`Erreur d'upload: ${error.message}`)
        }}
        appearance={{
          container: "p-4 w-full cursor-pointer focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 outline-none",
          uploadIcon: "w-8 h-8 text-muted-foreground",
          label: "text-foreground font-medium hover:text-primary",
          allowedContent: "text-muted-foreground text-xs mt-2",
          button: "bg-primary text-primary-foreground hover:bg-primary/90 mt-4 rounded-md text-sm font-medium",
        }}
        content={{
          label: "Cliquez ou glissez une image ici",
          allowedContent: "Image (Max 4Mo)"
        }}
      />
    </div>
  )
}
