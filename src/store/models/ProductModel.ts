import {Instance, types} from 'mobx-state-tree';
import {withSetPropAction} from '../helpers/withSetPropAction';
import {getProductDetails} from '../../APIs/productDetail';

export const ProductModel = types
  .model('Product', {
    id: types.identifierNumber,
    title: types.string,
    description: types.maybeNull(types.string),
    price: types.number,
    discountPercentage: types.maybeNull(types.number),
    rating: types.maybeNull(types.number),
    stock: types.maybeNull(types.number),
    brand: types.maybeNull(types.string),
    category: types.maybeNull(types.string),
    thumbnail: types.maybeNull(types.string),
    images: types.maybeNull(types.array(types.string)),
  })
  .views(self => ({
    get fullName() {
      return `${self.title}`;
    },
  }))
  .actions(withSetPropAction)
  .actions(self => ({
    async fetchProductDetails() {
      const data = await getProductDetails(self.id);
      if ('error' in data) {
        return;
      }
    },
  }));

export type Product = Instance<typeof ProductModel>;
