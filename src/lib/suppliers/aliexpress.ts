import axios from 'axios';
import type { Supplier } from '../../types';

const API_KEY = process.env.ALIEXPRESS_API_KEY;
const API_SECRET = process.env.ALIEXPRESS_API_SECRET;
const BASE_URL = 'https://api.aliexpress.com/v2';

export async function fetchAliExpressProducts(options: {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
}) {
  try {
    const response = await axios.get(`${BASE_URL}/products`, {
      params: {
        api_key: API_KEY,
        category: options.category,
        min_price: options.minPrice,
        max_price: options.maxPrice,
        page: options.page || 1,
        limit: options.limit || 50
      }
    });

    return response.data.products.map(formatAliExpressProduct);
  } catch (error) {
    console.error('AliExpress API error:', error);
    throw error;
  }
}

export async function createAliExpressOrder(items: any[], shippingAddress: any) {
  try {
    const response = await axios.post(`${BASE_URL}/orders`, {
      api_key: API_KEY,
      items: items.map(item => ({
        product_id: item.product.supplier_product_id,
        quantity: item.quantity,
        shipping_address: shippingAddress
      }))
    });

    return response.data;
  } catch (error) {
    console.error('AliExpress order creation error:', error);
    throw error;
  }
}

function formatAliExpressProduct(product: any) {
  return {
    name: product.title,
    description: product.description,
    price: product.price,
    cost_price: product.wholesale_price,
    images: product.images,
    sku: product.product_id,
    inventory_count: product.inventory,
    supplier_product_id: product.product_id,
    weight: product.weight,
    dimensions: product.dimensions,
    category_id: product.category_id
  };
}