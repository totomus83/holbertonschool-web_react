import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';

describe('Login component', () => {
  test('submit button is disabled by default', () => {
    render(<Login />);
    const submitBtn = screen.getByRole('button', { name: /OK/i });
    expect(submitBtn).toBeDisabled();
  });

  test('submit button becomes enabled after valid email and password are entered', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitBtn = screen.getByRole('button', { name: /OK/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(submitBtn).toBeEnabled();
  });

  test('logIn is called with email and password when form is submitted', () => {
    const logIn = jest.fn();
    render(<Login logIn={logIn} />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitBtn = screen.getByRole('button', { name: /OK/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitBtn);

    expect(logIn).toHaveBeenCalledWith('test@example.com', 'password123');
  });
});