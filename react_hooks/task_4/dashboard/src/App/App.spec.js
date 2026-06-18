import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import App from './App';

jest.mock('axios');

const mockNotifications = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', value: 'Urgent notification' },
];

beforeEach(() => {
  axios.get.mockResolvedValue({ data: mockNotifications });
});

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

  test('handleDisplayDrawer shows notification drawer', async () => {
    render(<App />);
    await waitFor(() => screen.getAllByRole('listitem'));
    const titles = screen.getAllByText(/Your notifications/i);
    fireEvent.click(titles[0]);
    expect(screen.getByText(/Here is the list of notifications/i)).toBeInTheDocument();
  });

  test('handleHideDrawer hides notification drawer', async () => {
    render(<App />);
    await waitFor(() => screen.getAllByRole('listitem'));
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    expect(screen.queryByText(/Here is the list of notifications/i)).not.toBeInTheDocument();
  });

  test('logIn updates user state', async () => {
    render(<App />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitBtn = screen.getByRole('button', { name: /OK/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitBtn);

    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  test('logOut resets user state', async () => {
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

  test('clicking a notification item removes it and logs the message', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<App />);

    await waitFor(() => screen.getAllByRole('listitem'));
    const items = screen.getAllByRole('listitem');
    const initialCount = items.length;

    fireEvent.click(items[0]);

    expect(consoleSpy).toHaveBeenCalledWith('Notification 1 has been marked as read');
    expect(screen.getAllByRole('listitem')).toHaveLength(initialCount - 1);

    consoleSpy.mockRestore();
  });
});