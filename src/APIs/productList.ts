import {AxiosError} from 'axios';
import Api from '.';
import {Product} from './productDetail';

export const PRODUCT_LIMIT = 30;

export const getProductList = async (
  skip = 0,
): Promise<
  | {
      total: number;
      products: Product[];
    }
  | {error: string}
> => {
  try {
    const response = await Api.get('/products', {
      params: {
        limit: PRODUCT_LIMIT,
        skip,
      },
    });
    return response.data;
  } catch (e) {
    return {error: (e as AxiosError).message};
  }
};
