import { render, screen } from '@testing-library/react';
import Login from './Login';

describe('App component', () => {
  test('Vérification texte App-body', () => {
    render(<Login />);
    const bodyp = screen.getByText(/Login to access the full dashboard/i);
    expect(bodyp).toBeInTheDocument();
  });

  test('Vérification des inputs associés aux labels', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  test('Vérification du texte des labels', () => {
    render(<Login />);
    const emailLabel = screen.getByLabelText(/email/i);
    const passwordLabel = screen.getByLabelText(/password/i);
    expect(emailLabel).toBeInTheDocument();
    expect(passwordLabel).toBeInTheDocument();
  });

  test('Vérification du bouton', () => {
    render(<Login />);
    const formButton = screen.getByRole('button', { name: /OK/i });
    expect(formButton).toBeInTheDocument();
  });
});