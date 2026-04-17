import reducer, { initialState } from './slice';
import { getUser, loginUser, logoutUser } from './action';
import { user } from '../../test-utils/mocks';

describe('userData reducer', () => {
  it('sets loading=true on request', () => {
    const state = reducer(
      initialState,
      loginUser.pending('', { email: 'test@example.com', password: '123456' })
    );

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('stores user and auth state on success', () => {
    const state = reducer(
      { ...initialState, isLoading: true },
      getUser.fulfilled(user, '', undefined)
    );

    expect(state.isLoading).toBe(false);
    expect(state.isAuthChecked).toBe(true);
    expect(state.user).toEqual(user);
  });

  it('stores error and loading=false on failed request', () => {
    const state = reducer(
      { ...initialState, isLoading: true },
      getUser.rejected(new Error('Not authorized'), '', undefined, {
        message: 'Not authorized'
      })
    );

    expect(state.isLoading).toBe(false);
    expect(state.isAuthChecked).toBe(true);
    expect(state.error).toBe('Not authorized');
  });

  it('clears user on logout success', () => {
    const state = reducer(
      { ...initialState, user, isLoading: true, isAuthChecked: true },
      logoutUser.fulfilled(undefined, '', undefined)
    );

    expect(state.user).toBeNull();
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });
});
