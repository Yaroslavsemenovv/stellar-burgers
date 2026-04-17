import { rootReducer } from './store';
import { initialState as ingredientsInitialState } from './burgerIngredients/slice';
import { initialState as burgerConstructorInitialState } from './burgerConstructor/slice';
import { initialState as createOrderInitialState } from './createOrder/slice';
import { initialState as publicOrdersInitialState } from './publicOrders/slice';
import { initialState as userDataInitialState } from './userData/slice';
import { initialState as passwordRecoveryInitialState } from './passwordRecovery/slice';
import { initialState as userOrdersInitialState } from './userOrders/slice';
import { initialState as orderByNumberInitialState } from './orderInfo/slice';

describe('rootReducer', () => {
  it('correctly initializes the store', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual({
      ingredientsSlice: ingredientsInitialState,
      burgerConstructor: burgerConstructorInitialState,
      createOrderSlice: createOrderInitialState,
      publicOrdersSlice: publicOrdersInitialState,
      userDataSlice: userDataInitialState,
      passwordRecoverySlice: passwordRecoveryInitialState,
      userOrdersSlice: userOrdersInitialState,
      orderByNumberSlice: orderByNumberInitialState
    });
  });
});
