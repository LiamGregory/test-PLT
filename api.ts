// Api.ts

import axios from 'axios';
import { Product } from './types';

export async function fetchProducts(): Promise<Product[]> {
  const res = await axios.get('https://my-json-server.typicode.com/benirvingplt/products/products');
  return res.data;
}
