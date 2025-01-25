import { test, expect } from 'vitest';
import { calculateTax, validateTaxExemption } from '../../lib/tax';

test('tax calculation system', async () => {
  const orderDetails = {
    subtotal: 99.99,
    shipping: 9.99,
    address: {
      country: 'US',
      state: 'CA',
      zip: '90210'
    }
  };

  // Test basic tax calculation
  const tax = await calculateTax(orderDetails);
  expect(tax.amount).toBeGreaterThan(0);
  expect(tax.rate).toBeGreaterThan(0);
  expect(tax.breakdown).toBeDefined();

  // Test tax exemption validation
  const exemption = await validateTaxExemption({
    taxId: 'TEST123456',
    businessName: 'Test Business',
    country: 'US'
  });
  expect(exemption.valid).toBeDefined();
  expect(exemption.expirationDate).toBeDefined();
});