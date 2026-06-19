import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import axios from 'axios';
import App from './App';

jest.mock('axios');

const mockNotifications = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', value: 'Urgent notification' },
];

const mockCourses = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 },
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

  test('notifications are fetched on initial render', async () => {
    render(<App />);
    await waitFor(() => expect(axios.get).toHaveBeenCalledWith('/notifications.json'));
    const title = screen.getByText(/Your notifications/i);
    fireEvent.click(title);
    await waitFor(() => expect(screen.getAllByRole('listitem')).toHaveLength(3));
  });

  test('courses are fetched when user state changes', async () => {
    axios.get.mockImplementation((url) => {
      if (url === '/notifications.json') return Promise.resolve({ data: mockNotifications });
      if (url === '/courses.json') return Promise.resolve({ data: mockCourses });
      return Promise.resolve({ data: [] });
    });

    render(<App />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitBtn = screen.getByRole('button', { name: /OK/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitBtn);

    await waitFor(() => expect(axios.get).toHaveBeenCalledWith('/courses.json'));
    await waitFor(() => expect(screen.getByRole('table')).toBeInTheDocument());
  });

  test('handleDisplayDrawer shows notification drawer', async () => {
    render(<App />);
    await waitFor(() => expect(axios.get).toHaveBeenCalled());
    const title = screen.getByText(/Your notifications/i);
    fireEvent.click(title);
    await waitFor(() => expect(screen.getByText(/Here is the list of notifications/i)).toBeInTheDocument());
  });

  test('handleHideDrawer hides notification drawer', async () => {
    render(<App />);
    await waitFor(() => expect(axios.get).toHaveBeenCalled());
    const title = screen.getByText(/Your notifications/i);
    fireEvent.click(title);
    await waitFor(() => screen.getByRole('button', { name: /close/i }));
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(screen.queryByText(/Here is the list of notifications/i)).not.toBeInTheDocument();
  });

  test('logOut resets user state', async () => {
    axios.get.mockImplementation((url) => {
      if (url === '/notifications.json') return Promise.resolve({ data: mockNotifications });
      if (url === '/courses.json') return Promise.resolve({ data: mockCourses });
      return Promise.resolve({ data: [] });
    });

    render(<App />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitBtn = screen.getByRole('button', { name: /OK/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitBtn);

    await waitFor(() => screen.getByText(/logout/i));
    fireEvent.click(screen.getByText(/logout/i));

    expect(screen.getByText(/Login to access the full dashboard/i)).toBeInTheDocument();
  });

  test('clicking a notification item removes it and logs the message', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<App />);

    await waitFor(() => expect(axios.get).toHaveBeenCalled());
    const title = screen.getByText(/Your notifications/i);
    fireEvent.click(title);

    await waitFor(() => screen.getAllByRole('listitem'));
    const items = screen.getAllByRole('listitem');
    const initialCount = items.length;

    fireEvent.click(items[0]);

    expect(consoleSpy).toHaveBeenCalledWith('Notification 1 has been marked as read');
    expect(screen.getAllByRole('listitem')).toHaveLength(initialCount - 1);

    consoleSpy.mockRestore();
  });
});