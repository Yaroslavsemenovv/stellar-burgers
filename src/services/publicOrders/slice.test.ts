import reducer, { initialState } from './slice';
import { getPublicOrders } from './action';
import { order } from '../../test-utils/mocks';

describe('publicOrders reducer', () => {
  it('sets loading=true on request', () => {
    const state = reducer(initialState, getPublicOrders.pending('', undefined));

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('stores orders and loading=false on success', () => {
    const payload = {
      success: true,
      orders: [order],
      total: 10,
      totalToday: 5
    };
    const state = reducer(
      { ...initialState, isLoading: true },
      getPublicOrders.fulfilled(payload, '', undefined)
    );

    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual([order]);
    expect(state.feed).toEqual({ total: 10, totalToday: 5 });
  });

  it('stores error and loading=false on failed request', () => {
    const state = reducer(
      { ...initialState, isLoading: true },
      getPublicOrders.rejected(
        new Error('Ошибка загрузки ленты'),
        '',
        undefined,
        {
          message: 'Ошибка загрузки ленты'
        }
      )
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки ленты');
  });
});
