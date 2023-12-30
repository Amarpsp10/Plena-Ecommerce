import {Instance, SnapshotOut, types} from 'mobx-state-tree';
import {ProductStoreModel} from './ProductStore';
import {AccountStoreModel} from './AccountStore';

/**
 * A RootStore model.
 */
export const RootStoreModel = types
  .model('RootStore')
  .props({
    productStore: types.optional(ProductStoreModel, {}),
    accountStore: types.optional(AccountStoreModel, {}),
  })
  .actions(self => ({
    reset() {
      self.productStore = ProductStoreModel.create({});
    },
  }));

/**
 * The RootStore instance.
 */
export type RootStore = Instance<typeof RootStoreModel>;
/**
 * The data of a RootStore.
 */
export type RootStoreSnapshot = SnapshotOut<typeof RootStoreModel>;

export const RootStore = RootStoreModel.create({});
