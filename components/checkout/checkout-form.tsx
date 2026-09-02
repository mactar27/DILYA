'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check, ChevronRight, Loader2, ChevronsUpDown } from 'lucide-react'
import { toast } from 'sonner'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { useCart } from '@/lib/cart-context'
import { formatPrice } from '@/lib/format'
import { COUNTRIES } from '@/lib/countries'
import { createOrder } from '@/app/actions'

export function CheckoutForm() {
  const router = useRouter()
  const [selectedCountry, setSelectedCountry] = useState('')
  const [openCountry, setOpenCountry] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { subtotal, items, clear } = useCart()
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    city: '',
    address: '',
    complement: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const phonePrefix = COUNTRIES.find(c => c.code === selectedCountry)?.prefix || '+...'

  if (items.length === 0) {
    return null
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
        <div className="flex-1">
          <div className="flex flex-col gap-6">
              <h3 className="font-medium">Informations personnelles</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input id="firstName" value={formData.firstName} onChange={handleChange} placeholder="Votre prénom" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom complet</Label>
                  <Input id="lastName" value={formData.lastName} onChange={handleChange} placeholder="Votre nom" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <div className="flex">
                    <span className="inline-flex items-center rounded-l-md border border-input border-r-0 bg-muted/50 px-3 text-sm text-muted-foreground">
                      {phonePrefix}
                    </span>
                    <Input id="phone" type="tel" value={formData.phone} onChange={handleChange} className="rounded-l-none" placeholder="6 00 00 00 00" />
                  </div>
                </div>
              </div>

              <h3 className="mt-4 font-medium">Adresse</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <Label>Pays</Label>
                  <Popover open={openCountry} onOpenChange={setOpenCountry}>
                    <PopoverTrigger 
                      className={cn(buttonVariants({ variant: "outline" }), "w-full justify-between")}
                      role="combobox"
                      aria-expanded={openCountry}
                    >
                        {selectedCountry
                          ? COUNTRIES.find((country) => country.code === selectedCountry)?.name
                          : "Sélectionnez un pays..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </PopoverTrigger>
                    <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                      <Command
                        filter={(value, search) => {
                          const normalizedValue = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
                          const normalizedSearch = search.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
                          return normalizedValue.includes(normalizedSearch) ? 1 : 0
                        }}
                      >
                        <CommandInput placeholder="Rechercher un pays..." />
                        <CommandList>
                          <CommandEmpty>Aucun pays trouvé.</CommandEmpty>
                          <CommandGroup>
                            {COUNTRIES.map((country) => (
                              <CommandItem
                                key={country.code}
                                value={country.name}
                                onSelect={() => {
                                  setSelectedCountry(country.code)
                                  setOpenCountry(false)
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    selectedCountry === country.code ? "opacity-100" : "opacity-0"
                                  )}
                                />
                                {country.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">Ville / Quartier</Label>
                  <Input id="city" value={formData.city} onChange={handleChange} placeholder="Dakar, Plateau..." />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="address">Adresse complète</Label>
                  <Input id="address" value={formData.address} onChange={handleChange} placeholder="N° et nom de rue" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="complement">Informations complémentaires (facultatif)</Label>
                  <Input id="complement" value={formData.complement} onChange={handleChange} placeholder="Bâtiment, étage, interphone..." />
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-6 rounded-xl border bg-card p-6">
                <div>
                  <h3 className="font-medium">Livraison et Paiement</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Livraison standard (3 à 5 jours). Paiement en espèces à la livraison.
                  </p>
                </div>
                
                <Button 
                  size="lg"
                  className="w-full"
                  onClick={async () => {
                    if (!formData.firstName || !formData.lastName || !formData.phone || !formData.city || !formData.address || !selectedCountry) {
                      toast.error('Veuillez remplir tous les champs obligatoires.')
                      return
                    }

                    setIsSubmitting(true)
                    
                    const countryName = COUNTRIES.find(c => c.code === selectedCountry)?.name || selectedCountry

                    const orderResult = await createOrder({
                      ...formData,
                      country: countryName,
                      subtotal: subtotal,
                      items: items
                    })

                    setIsSubmitting(false)

                    if (orderResult.error) {
                      toast.error(orderResult.error)
                      return
                    }

                    clear()
                    toast.success("Commande confirmée avec succès !")
                    router.push('/')
                  }}
                  disabled={isSubmitting}
                >
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Confirmer la commande
                </Button>
              </div>
            </div>
        </div>

        {/* Desktop Mini-summary on the right */}
        <div className="hidden w-80 shrink-0 lg:block">
          <div className="sticky top-24 rounded-2xl border bg-card p-6">
            <h3 className="mb-4 font-medium">Votre commande</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Sous-total</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Livraison</span>
                <span>Gratuit</span>
              </div>
              <Separator className="my-2" />
              <div className="flex items-center justify-between font-medium">
                <span>Total</span>
                <span className="text-lg">{formatPrice(subtotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
