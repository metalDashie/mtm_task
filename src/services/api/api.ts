import {
  IProductAdditionalTextResponse,
  IProductsResponse,
} from './api.types.ts';
import Config from 'react-native-config';

const API_BASE_URL = Config.API_BASE_URL;

export class ApiService {
  static async fetchRandomItems(): Promise<IProductsResponse> {
    const response = await fetch(`${API_BASE_URL}/items/random`);
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }
    return response.json();
  }

  static async fetchProductText(
    productId: string,
  ): Promise<IProductAdditionalTextResponse> {
    const response = await fetch(`${API_BASE_URL}/texts/${productId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch product text: ${response.status}`);
    }
    return response.json();
  }

  static getImageCorrectUrl(imageRelativePath: string): string {
    return `${API_BASE_URL}${imageRelativePath}`;
  }
}
