import {AxiosError} from 'axios';
import Api from '.';

export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  disountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};

export const getProductDetails = async (
  id: number,
): Promise<Product | {error: string}> => {
  try {
    const response = await Api.get(`/products/${id}`);
    return response.data;
  } catch (e) {
    return {error: (e as AxiosError).message};
  }
};
