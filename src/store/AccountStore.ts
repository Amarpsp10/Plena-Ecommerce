import {Instance, SnapshotOut, types} from 'mobx-state-tree';
import {withSetPropAction} from './helpers/withSetPropAction';
import {ProductModel, Product} from './models/ProductModel';
import deepCopy from '../utils/deepCopy';

export const AccountStoreModel = types
  .model('AccountStore')
  .props({
    cartProducts: types.array(ProductModel),
    // json object with product id as key and count as value
    cartProductsProductCount: types.optional(types.frozen(), {}),
    favouriteProducts: types.array(ProductModel),
  })
  .views(store => ({
    get cartProductsCount() {
      return store.cartProducts.length;
    },
    get favouriteProductsCount() {
      return store.favouriteProducts.length;
    },
    get cartProductsTotalPrice() {
      return store.cartProducts.reduce(
        (acc, product) =>
          acc + product.price * store.cartProductsProductCount[product.id],
        0,
      );
    },
  }))
  .actions(withSetPropAction)
  .actions(store => ({
    addProductTocartProducts(product: Product) {
      if (store.cartProducts.find(item => item.id === product.id)) {
        return;
      }
      store.setProp('cartProducts', [
        ...store.cartProducts,
        ProductModel.create(deepCopy(product)),
      ]);
      // add product count to cartProductsProductCount
      store.setProp('cartProductsProductCount', {
        ...store.cartProductsProductCount,
        [product.id]: 1,
      });
    },
    removeProductFromcartProducts(product: Product) {
      store.setProp(
        'cartProducts',
        store.cartProducts.filter(item => item.id !== product.id),
      );
      // remove product count from cartProductsProductCount
      const {[product.id]: _, ...rest} = store.cartProductsProductCount;
      store.setProp('cartProductsProductCount', rest);
    },
    isAddedTocartProducts(product: Product) {
      const item = store.cartProducts.find(item => item.id === product.id);
      return Boolean(item);
    },
    increaseProductCount(product: Product) {
      store.setProp('cartProductsProductCount', {
        ...store.cartProductsProductCount,
        [product.id]: store.cartProductsProductCount[product.id] + 1,
      });
    },
    decreaseProductCount(product: Product) {
      store.setProp('cartProductsProductCount', {
        ...store.cartProductsProductCount,
        [product.id]: store.cartProductsProductCount[product.id] - 1,
      });
    },
    addProductTofavouriteProducts(product: Product) {
      if (store.favouriteProducts.find(item => item.id === product.id)) {
        return;
      }
      store.setProp('favouriteProducts', [
        ...store.favouriteProducts,
        ProductModel.create(deepCopy(product)),
      ]);
    },
    removeProductFromfavouriteProducts(product: Product) {
      store.setProp(
        'favouriteProducts',
        store.favouriteProducts.filter(item => item.id !== product.id),
      );
    },
    isAddedTofavouriteProducts(product: Product) {
      const item = store.favouriteProducts.find(item => item.id === product.id);
      return Boolean(item);
    },
  }));

export type AccountStore = Instance<typeof AccountStoreModel>;
export type AccountStoreSnapshot = SnapshotOut<typeof AccountStoreModel>;
