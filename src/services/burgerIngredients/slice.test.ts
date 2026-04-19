import reducer, { initialState } from './slice';
import { getIngredients } from './actions';
import { ingredients } from '../../test-utils/mocks';

describe('burgerIngredients reducer', () => {
  it('sets loading=true on request', () => {
    const state = reducer(initialState, getIngredients.pending('', undefined));

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('stores ingredients and loading=false on success', () => {
    const state = reducer(
      { ...initialState, isLoading: true },
      getIngredients.fulfilled(ingredients, '', undefined)
    );

    expect(state.isLoading).toBe(false);
    expect(state.ingredients).toEqual(ingredients);
  });

  it('stores error and loading=false on failed request', () => {
    const state = reducer(
      { ...initialState, isLoading: true },
      getIngredients.rejected(new Error('Ошибка загрузки'), '', undefined, {
        message: 'Ошибка загрузки'
      })
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки');
  });
});
