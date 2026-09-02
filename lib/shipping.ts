/**
 * Zones et tarifs de livraison configurables. Cette structure est pensée pour
 * être gérée depuis l'administration : on peut ajouter des pays, des zones et
 * des tarifs sans toucher au reste du code. Les montants sont en FCFA.
 */
export type ShippingZone = {
  id: string
  name: string
  countries: string[]
  fee: number
  estimate: string
}

export const shippingZones: ShippingZone[] = [
  {
    id: 'local',
    name: 'Livraison locale',
    countries: ['Sénégal'],
    fee: 2000,
    estimate: '1 à 3 jours ouvrés',
  },
  {
    id: 'afrique-ouest',
    name: 'Afrique de l’Ouest',
    countries: ["Côte d'Ivoire", 'Mali', 'Guinée', 'Burkina Faso', 'Bénin', 'Togo'],
    fee: 6000,
    estimate: '3 à 7 jours ouvrés',
  },
  {
    id: 'afrique',
    name: 'Reste de l’Afrique',
    countries: ['Maroc', 'Cameroun', 'Gabon', 'Congo'],
    fee: 9000,
    estimate: '5 à 10 jours ouvrés',
  },
  {
    id: 'international',
    name: 'International',
    countries: ['France', 'Belgique', 'Canada', 'États-Unis', 'Autre pays'],
    fee: 15000,
    estimate: '7 à 15 jours ouvrés',
  },
]

export const countries: { name: string; zoneId: string }[] = shippingZones.flatMap(
  (zone) => zone.countries.map((name) => ({ name, zoneId: zone.id })),
)

export function getZoneForCountry(country: string): ShippingZone | undefined {
  return shippingZones.find((z) => z.countries.includes(country))
}

export function getShippingFee(country: string): number | null {
  const zone = getZoneForCountry(country)
  return zone ? zone.fee : null
}
