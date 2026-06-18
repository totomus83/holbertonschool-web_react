import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  test('renders header with School dashboard', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1, name: /School dashboard/i })).toBeInTheDocument();
  });

  test('renders Login by default', () => {
    render(<App />);
    expect(screen.getByText(/Login to access the full dashboard/i)).toBeInTheDocument();
  });

  test('renders footer', () => {
    render(<App />);
    expect(screen.getByText(/Copyright \d{4} - holberton School/i)).toBeInTheDocument();
  });

  test('handleDisplayDrawer sets displayDrawer to true', () => {
    render(<App />);
    const title = screen.getByText(/Your notifications/i);
    fireEvent.click(title);
    expect(screen.getByText(/Here is the list of notifications/i)).toBeInTheDocument();
  });

  test('handleHideDrawer sets displayDrawer to false', () => {
    render(<App />);
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    expect(screen.queryByText(/Here is the list of notifications/i)).not.toBeInTheDocument();
  });

  test('logIn updates user state with email, password and isLoggedIn true', () => {
    render(<App />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitBtn = screen.getByRole('button', { name: /OK/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitBtn);

    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.queryByText(/Login to access the full dashboard/i)).not.toBeInTheDocument();
  });

  test('logOut resets user state', () => {
    render(<App />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitBtn = screen.getByRole('button', { name: /OK/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitBtn);

    const logoutLink = screen.getByText(/logout/i);
    fireEvent.click(logoutLink);

    expect(screen.getByText(/Login to access the full dashboard/i)).toBeInTheDocument();
  });

  test('clicking a notification item removes it and logs the message', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<App />);

    const items = screen.getAllByRole('listitem');
    const initialCount = items.length;

    fireEvent.click(items[0]);

    expect(consoleSpy).toHaveBeenCalledWith('Notification 1 has been marked as read');
    expect(screen.getAllByRole('listitem')).toHaveLength(initialCount - 1);

    consoleSpy.mockRestore();
  });
});