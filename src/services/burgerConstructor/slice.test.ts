import reducer, {
  addIngredient,
  initialState,
  moveIngredient,
  removeIngredient,
  setBun
} from './slice';
import { bun, main, sauce } from '../../test-utils/mocks';

describe('burgerConstructor reducer', () => {
  it('adds an ingredient', () => {
    const state = reducer(initialState, addIngredient(main));

    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toMatchObject(main);
    expect(state.ingredients[0].id).toEqual(expect.any(String));
  });

  it('removes an ingredient', () => {
    const stateWithItems = reducer(
      reducer(initialState, addIngredient(main)),
      addIngredient(sauce)
    );
    const ingredientId = stateWithItems.ingredients[0].id;

    const state = reducer(stateWithItems, removeIngredient(ingredientId));

    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0].name).toBe(sauce.name);
  });

  it('changes the order of ingredients in filling', () => {
    const stateWithItems = reducer(
      reducer(initialState, addIngredient(main)),
      addIngredient(sauce)
    );

    const state = reducer(stateWithItems, moveIngredient({ from: 0, to: 1 }));

    expect(state.ingredients[0].name).toBe(sauce.name);
    expect(state.ingredients[1].name).toBe(main.name);
  });

  it('sets bun separately', () => {
    const state = reducer(initialState, setBun(bun));

    expect(state.bun).toEqual(bun);
  });
});
