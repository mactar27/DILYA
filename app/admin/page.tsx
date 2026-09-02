import { prisma } from '@/lib/db'
import { formatPrice } from '@/lib/format'
import { DashboardChart } from '@/components/admin/dashboard-chart'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ShoppingBag, CreditCard, MessageSquare, Package } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AdminDashboardPage() {
  // Récupérer les stats clés
  const totalOrders = await prisma.order.count()
  
  const allOrders = await prisma.order.findMany({
    select: { subtotal: true, createdAt: true }
  })
  
  const totalRevenue = allOrders.reduce((acc, order) => acc + order.subtotal, 0)
  
  const pendingReviews = await prisma.review.count({
    where: { status: 'PENDING' }
  })
  
  const totalProducts = await prisma.product.count()

  // Construire les données du graphique (7 derniers jours)
  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    return d.toISOString().split('T')[0]
  })

  const chartData = last7Days.map(dateStr => {
    const dayOrders = allOrders.filter(o => o.createdAt.toISOString().split('T')[0] === dateStr)
    const dayRevenue = dayOrders.reduce((acc, o) => acc + o.subtotal, 0)
    return {
      date: new Date(dateStr).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' }),
      ventes: dayRevenue
    }
  })

  return (
    <div className="p-8">
      <h1 className="font-serif text-3xl font-medium mb-8">Tableau de bord</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Revenus totaux</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
          <div className="text-2xl font-bold">{formatPrice(totalRevenue)}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Commandes</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{totalOrders}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avis en attente</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingReviews}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Produits actifs</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Évolution des ventes (7 derniers jours)</CardTitle>
        </CardHeader>
        <CardContent>
          <DashboardChart data={chartData} />
        </CardContent>
      </Card>
    </div>
  )
}
