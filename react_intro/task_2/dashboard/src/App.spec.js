import { render, screen } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  test('renders email and password inputs', () => {
    render(<App />);

    const inputs = screen.getAllByRole('textbox');
    const passwordInput = screen.getByLabelText(/password/i);

    expect(inputs.length).toBe(1); // email is textbox
    expect(passwordInput).toBeInTheDocument();
  });

  test('renders Email and Password labels', () => {
    render(<App />);

    const emailLabel = screen.getByText(/email/i);
    const passwordLabel = screen.getByText(/password/i);

    expect(emailLabel).toBeInTheDocument();
    expect(passwordLabel).toBeInTheDocument();
  });

  test("renders OK button", () => {
    render(<App />);

    const button = screen.getByRole('button', { name: /ok/i });
    expect(button).toBeInTheDocument();
  });
});