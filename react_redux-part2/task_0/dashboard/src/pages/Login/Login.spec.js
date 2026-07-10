import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Login from './Login';
import rootReducer from '../../app/rootReducer';

function renderWithStore() {
  const store = configureStore({ reducer: rootReducer });
  return {
    store,
    ...render(
      <Provider store={store}>
        <Login />
      </Provider>
    )
  };
}

test('renders login form with email, password fields and submit button', () => {
  renderWithStore();

  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /ok/i })).toBeInTheDocument();
});

test('sets isLoggedIn to true when submitting valid credentials', async () => {
  const { store } = renderWithStore();

  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@test.com' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
  fireEvent.click(screen.getByRole('button', { name: /ok/i }));

  await waitFor(() => {
    expect(store.getState().auth.isLoggedIn).toBe(true);
  });
});

test('keeps isLoggedIn false when submitting invalid credentials', async () => {
  const { store } = renderWithStore();

  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid-email' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '123' } });

  const submitButton = screen.getByRole('button', { name: /ok/i });
  expect(submitButton).toBeDisabled();
  expect(store.getState().auth.isLoggedIn).toBe(false);
});