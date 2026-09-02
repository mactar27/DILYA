'use client'

import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { updateOrderStatus } from '@/app/actions'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

interface OrderStatusUpdaterProps {
  orderId: string
  currentStatus: 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'
}

export function OrderStatusUpdater({ orderId, currentStatus }: OrderStatusUpdaterProps) {
  const [status, setStatus] = useState(currentStatus)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleUpdate = async () => {
    if (status === currentStatus) return

    setIsUpdating(true)
    const result = await updateOrderStatus(orderId, status)
    setIsUpdating(false)

    if (result.error) {
      toast.error(result.error)
      setStatus(currentStatus) // Revert on error
    } else {
      toast.success('Statut de la commande mis à jour')
    }
  }

  return (
    <div className="flex items-center gap-3">
      <Select value={status} onValueChange={(val: any) => setStatus(val)} disabled={isUpdating}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Statut" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="PENDING">En attente</SelectItem>
          <SelectItem value="CONFIRMED">Confirmée</SelectItem>
          <SelectItem value="SHIPPED">Expédiée</SelectItem>
          <SelectItem value="DELIVERED">Livrée</SelectItem>
          <SelectItem value="CANCELLED">Annulée</SelectItem>
        </SelectContent>
      </Select>
      <Button 
        onClick={handleUpdate} 
        disabled={isUpdating || status === currentStatus}
        variant={status === currentStatus ? "secondary" : "default"}
      >
        {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Enregistrer
      </Button>
    </div>
  )
}
