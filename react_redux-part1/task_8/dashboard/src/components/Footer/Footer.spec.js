import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Footer from './Footer';
import rootReducer from '../../app/rootReducer';

function renderWithStore(preloadedState) {
  const store = configureStore({ reducer: rootReducer, preloadedState });
  return render(
    <Provider store={store}>
      <Footer />
    </Provider>
  );
}

test('displays copyright text', () => {
  renderWithStore();

  const footerText = screen.getByText(/copyright/i);
  expect(footerText).toHaveTextContent(new RegExp(`copyright ${(new Date()).getFullYear()}`, 'i'));
  expect(footerText).toHaveTextContent(/holberton school/i);
});

test('displays Contact us link when isLoggedIn is true', () => {
  renderWithStore({
    auth: { user: { email: 'test@test.com', password: 'password123' }, isLoggedIn: true }
  });

  expect(screen.getByText(/contact us/i)).toBeInTheDocument();
});

test('does not display Contact us link when isLoggedIn is false', () => {
  renderWithStore({
    auth: { user: { email: '', password: '' }, isLoggedIn: false }
  });

  expect(screen.queryByText(/contact us/i)).not.toBeInTheDocument();
});