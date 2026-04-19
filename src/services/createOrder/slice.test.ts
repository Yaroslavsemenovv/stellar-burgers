import reducer, { clearOrderModal, initialState } from './slice';
import { createOrder } from './action';
import { order } from '../../test-utils/mocks';

describe('createOrder reducer', () => {
  it('sets orderRequest=true on request', () => {
    const state = reducer(initialState, createOrder.pending('', []));

    expect(state.orderRequest).toBe(true);
    expect(state.error).toBeNull();
  });

  it('stores order and orderRequest=false on success', () => {
    const state = reducer(
      { ...initialState, orderRequest: true },
      createOrder.fulfilled({ success: true, name: order.name, order }, '', [])
    );

    expect(state.orderRequest).toBe(false);
    expect(state.orderModalData).toEqual(order);
  });

  it('stores error and orderRequest=false on failed request', () => {
    const state = reducer(
      { ...initialState, orderRequest: true },
      createOrder.rejected(new Error('Ошибка создания заказа'), '', [], {
        message: 'Ошибка создания заказа'
      })
    );

    expect(state.orderRequest).toBe(false);
    expect(state.error).toBe('Ошибка создания заказа');
  });

  it('clears order modal data', () => {
    const state = reducer(
      { orderRequest: true, orderModalData: order, error: 'error' },
      clearOrderModal()
    );

    expect(state).toEqual(initialState);
  });
});
