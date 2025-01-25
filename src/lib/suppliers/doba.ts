import axios from 'axios';
import type { Supplier } from '../../types';

const API_KEY = process.env.DOBA_API_KEY;
const BASE_URL = 'https://api.doba.com/v2';

export async function fetchDobaProducts(options: {
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

    return response.data.products.map(formatDobaProduct);
  } catch (error) {
    console.error('Doba API error:', error);
    throw error;
  }
}

export async function createDobaOrder(items: any[], shippingAddress: any) {
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
    console.error('Doba order creation error:', error);
    throw error;
  }
}

function formatDobaProduct(product: any) {
  return {
    name: product.name,
    description: product.description,
    price: product.retail_price,
    cost_price: product.wholesale_price,
    images: product.images,
    sku: product.sku,
    inventory_count: product.quantity_available,
    supplier_product_id: product.id,
    weight: product.weight,
    dimensions: product.dimensions,
    category_id: product.category_id
  };
}