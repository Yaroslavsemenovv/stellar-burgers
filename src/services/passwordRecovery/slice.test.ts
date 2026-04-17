import reducer, { initialState, resetRecoveryState } from './slice';
import { forgotPassword, resetPassword } from './action';

describe('passwordRecovery reducer', () => {
  it('sets loading=true on forgotPassword request', () => {
    const state = reducer(
      initialState,
      forgotPassword.pending('', { email: 'test@example.com' })
    );

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('stores forgotPassword success state', () => {
    const state = reducer(
      { ...initialState, isLoading: true },
      forgotPassword.fulfilled({ success: true }, '', {
        email: 'test@example.com'
      })
    );

    expect(state.isLoading).toBe(false);
    expect(state.success).toBe(true);
    expect(state.resetAllowed).toBe(true);
    expect(state.step).toBe('forgotSuccess');
  });

  it('stores error and loading=false on failed resetPassword request', () => {
    const state = reducer(
      { ...initialState, isLoading: true },
      resetPassword.rejected(
        new Error('Ошибка сброса пароля'),
        '',
        { password: '123456', token: 'token' },
        { message: 'Ошибка сброса пароля' }
      )
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка сброса пароля');
    expect(state.success).toBe(false);
  });

  it('resets state', () => {
    const dirtyState = {
      isLoading: true,
      success: true,
      step: 'forgotSuccess' as const,
      error: 'error',
      resetAllowed: true
    };

    expect(reducer(dirtyState, resetRecoveryState())).toEqual(initialState);
  });
});
