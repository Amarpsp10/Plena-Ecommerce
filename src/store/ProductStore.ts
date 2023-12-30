import {Instance, SnapshotOut, types} from 'mobx-state-tree';
import {withSetPropAction} from './helpers/withSetPropAction';
import {ProductModel} from './models/ProductModel';
import {PRODUCT_LIMIT, getProductList} from '../APIs/productList';
import {ToastAndroid} from 'react-native';

export const ProductStoreModel = types
  .model('ProductStore')
  .props({
    products: types.array(ProductModel),
    loading: types.optional(types.boolean, false),
    hasMoreProducts: types.optional(types.boolean, true),
    totalProducts: types.optional(types.number, 0),
  })
  .views(store => ({
    get productsCount() {
      return store.products.length;
    },
  }))
  .actions(withSetPropAction)
  .actions(store => ({
    async refreshProducts() {
      store.setProp('loading', true);
      const data = await getProductList(0);
      if ('error' in data) {
        store.setProp('loading', false);
        return ToastAndroid.show(data.error, ToastAndroid.SHORT);
      }
      const products = data.products.map(product =>
        ProductModel.create(product),
      );
      if (products.length < PRODUCT_LIMIT) {
        store.setProp('hasMoreProducts', false);
      } else {
        store.setProp('hasMoreProducts', true);
      }

      store.setProp('products', products);
      store.setProp('totalProducts', data.total);
      store.setProp('loading', false);
    },
    async loadMoreProducts() {
      const data = await getProductList(store.productsCount);
      if ('error' in data) {
        return;
      }
      const products = data.products.map(product =>
        ProductModel.create(product),
      );

      if (products.length < PRODUCT_LIMIT) {
        store.setProp('hasMoreProducts', false);
      } else {
        store.setProp('hasMoreProducts', true);
      }

      store.setProp('products', [...store.products, ...products]);
      store.setProp('totalProducts', data.total);
      store.setProp('loading', false);
    },
  }));

export type ProductStore = Instance<typeof ProductStoreModel>;
export type ProductStoreSnapshot = SnapshotOut<typeof ProductStoreModel>;
