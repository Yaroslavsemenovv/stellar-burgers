import reducer, { clearOrder, initialState } from './slice';
import { getOrderByNumber } from './action';
import { order } from '../../test-utils/mocks';

describe('orderInfo reducer', () => {
  it('sets loading=true on request', () => {
    const state = reducer(initialState, getOrderByNumber.pending('', 12345));

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('stores order and loading=false on success', () => {
    const state = reducer(
      { ...initialState, isLoading: true },
      getOrderByNumber.fulfilled(order, '', 12345)
    );

    expect(state.isLoading).toBe(false);
    expect(state.order).toEqual(order);
  });

  it('stores error and loading=false on failed request', () => {
    const state = reducer(
      { ...initialState, isLoading: true },
      getOrderByNumber.rejected(
        new Error('Ошибка получения заказа'),
        '',
        12345,
        {
          message: 'Ошибка получения заказа'
        }
      )
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка получения заказа');
  });

  it('clears order state', () => {
    const state = reducer(
      { ...initialState, order, isLoading: true, error: 'x' },
      clearOrder()
    );

    expect(state).toEqual(initialState);
  });
});
