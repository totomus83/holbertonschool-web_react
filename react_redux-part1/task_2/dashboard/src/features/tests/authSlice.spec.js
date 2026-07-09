// src/features/tests/authSlice.spec.js
import mockAxios from 'jest-mock-axios';
import authReducer, { login, logout } from '../auth/authSlice';

afterEach(() => {
  mockAxios.reset();
});

describe('authSlice', () => {
  const initialState = {
    user: {
      email: '',
      password: ''
    },
    isLoggedIn: false
  };

  test('should return the initial state by default', () => {
    const state = authReducer(undefined, { type: undefined });
    expect(state).toEqual(initialState);
  });

  test('should handle login', () => {
    const action = login({ email: 'fallen.albaz@gmail.com', password: 'Azertyuiop' });
    const state = authReducer(initialState, action);

    expect(state.user.email).toBe('fallen.albaz@gmail.com');
    expect(state.user.password).toBe('Azertyuiop');
    expect(state.isLoggedIn).toBe(true);
  });

  test('should handle logout', () => {
    const loggedInState = {
      user: {
        email: 'fallen.albaz@gmail.com',
        password: 'Azertyuiop'
      },
      isLoggedIn: true
    };

    const state = authReducer(loggedInState, logout());

    expect(state.user.email).toBe('');
    expect(state.user.password).toBe('');
    expect(state.isLoggedIn).toBe(false);
  });
});