import reducer, { initialState, resetUserOrders } from './slice';
import { getUserOrders } from './action';
import { order } from '../../test-utils/mocks';

describe('userOrders reducer', () => {
  it('sets loading=true on request', () => {
    const state = reducer(initialState, getUserOrders.pending('', undefined));

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('stores orders and loading=false on success', () => {
    const state = reducer(
      { ...initialState, isLoading: true },
      getUserOrders.fulfilled([order], '', undefined)
    );

    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual([order]);
  });

  it('stores error and loading=false on failed request', () => {
    const state = reducer(
      { ...initialState, isLoading: true },
      getUserOrders.rejected(
        new Error('Ошибка загрузки заказов'),
        '',
        undefined,
        {
          message: 'Ошибка загрузки заказов'
        }
      )
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки заказов');
  });

  it('resets user orders', () => {
    const state = reducer(
      { ...initialState, orders: [order], isLoading: true, error: 'x' },
      resetUserOrders()
    );

    expect(state).toEqual(initialState);
  });
});
