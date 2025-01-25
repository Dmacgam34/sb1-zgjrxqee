import { getDB } from './db';

interface ShippingZone {
  id: string;
  name: string;
  countries: string[];
  base_rate: number;
  rate_per_kg: number;
}

interface ShippingRate {
  total: number;
  base_rate: number;
  weight_charge: number;
  estimated_days: number;
}

export async function calculateShippingRate(
  weight: number,
  countryCode: string
): Promise<ShippingRate> {
  const db = await getDB();
  const [zone] = await db.execO<ShippingZone[]>(
    `SELECT * FROM shipping_zones WHERE ? = ANY(countries)`,
    [countryCode]
  );

  if (!zone) {
    throw new Error('No shipping available to this country');
  }

  const weightCharge = weight * zone.rate_per_kg;
  const total = zone.base_rate + weightCharge;

  return {
    total: parseFloat(total.toFixed(2)),
    base_rate: zone.base_rate,
    weight_charge: parseFloat(weightCharge.toFixed(2)),
    estimated_days: getEstimatedDays(countryCode)
  };
}

function getEstimatedDays(countryCode: string): number {
  const zones = {
    US: { min: 3, max: 5 },
    CA: { min: 4, max: 7 },
    GB: { min: 5, max: 8 },
    // Add more countries as needed
  };

  return zones[countryCode]?.max || 10;
}