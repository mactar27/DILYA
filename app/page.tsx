import { Hero } from '@/components/home/hero'
import { CategoryGrid } from '@/components/home/category-grid'
import { FeaturedProducts } from '@/components/home/featured-products'
import { Journal } from '@/components/home/journal'
import { TrustBar } from '@/components/home/trust-bar'

export const dynamic = 'force-dynamic'

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <FeaturedProducts />
      <Journal />
    </>
  )
}
