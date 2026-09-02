'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface ProductGalleryProps {
  images: string[]
  productName: string
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  // If there's no images, fallback to a placeholder
  const imagesList = images.length > 0 ? images : ['/placeholder.svg']

  return (
    <div className="flex flex-col-reverse gap-4 lg:flex-row lg:gap-6">
      {/* Thumbnails */}
      {imagesList.length > 1 && (
        <div className="flex gap-4 overflow-auto pb-2 lg:flex-col lg:pb-0">
          {imagesList.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={cn(
                "relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-secondary transition-all",
                activeIndex === idx ? "ring-2 ring-primary ring-offset-2" : "opacity-70 hover:opacity-100"
              )}
              aria-label={`Voir l'image ${idx + 1}`}
            >
              <Image
                src={img}
                alt={`${productName} - miniature ${idx + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main Image */}
      <div className="relative aspect-square flex-1 overflow-hidden rounded-2xl bg-secondary">
        <Image
          src={imagesList[activeIndex]}
          alt={productName}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
    </div>
  )
}
