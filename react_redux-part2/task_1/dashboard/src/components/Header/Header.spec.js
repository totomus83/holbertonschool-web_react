import { render, screen, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Header from './Header';
import rootReducer from '../../app/rootReducer';
import { login, logout } from '../../features/auth/authSlice';

function renderWithStore(preloadedState) {
  const store = configureStore({ reducer: rootReducer, preloadedState });
  return {
    store,
    ...render(
      <Provider store={store}>
        <Header />
      </Provider>
    )
  };
}

test('displays logout link when isLoggedIn is true', () => {
  renderWithStore({
    auth: { user: { email: 'test@test.com', password: 'password123' }, isLoggedIn: true }
  });

  expect(screen.getByText(/logout/i)).toBeInTheDocument();
});

test('displays welcome message with entered email after login action', () => {
  const { store } = renderWithStore({
    auth: { user: { email: '', password: '' }, isLoggedIn: false }
  });

  act(() => {
    store.dispatch(login({ email: 'test@test.com', password: 'password123' }));
  });

  expect(screen.getByText('test@test.com')).toBeInTheDocument();
});

test('sets isLoggedIn to false when logout is clicked', () => {
  const { store } = renderWithStore({
    auth: { user: { email: 'test@test.com', password: 'password123' }, isLoggedIn: true }
  });

  fireEvent.click(screen.getByText(/logout/i));

  expect(store.getState().auth.isLoggedIn).toBe(false);
});