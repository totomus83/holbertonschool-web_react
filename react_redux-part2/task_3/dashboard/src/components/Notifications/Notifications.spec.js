import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import mockAxios from 'jest-mock-axios';
import Notifications from './Notifications';
import rootReducer from '../../app/rootReducer';
import { fetchNotifications } from '../../features/notifications/notificationsSlice';

afterEach(() => {
  mockAxios.reset();
});

function renderWithStore(preloadedState) {
  const store = configureStore({ reducer: rootReducer, preloadedState });
  return {
    store,
    ...render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    )
  };
}

const mockNotifications = [
  { id: '1', type: 'default', isRead: false, value: 'Default notification' },
  { id: '2', type: 'urgent', isRead: false, value: 'Urgent notification' },
];

test('displays loading indicator while fetching', () => {
  renderWithStore({ notifications: { notifications: [], loading: true } });
  const menuItem = screen.getByText(/Your notifications/i);
  fireEvent.click(menuItem);
  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
});

test('toggles drawer visibility using visible style on click', () => {
  renderWithStore({ notifications: { notifications: [], loading: false } });
  const menuItem = screen.getByText(/Your notifications/i);
  const drawer = menuItem.nextSibling;
  expect(drawer.className).not.toContain('visible');
  fireEvent.click(menuItem);
  expect(drawer.className).toContain('visible');
  fireEvent.click(menuItem);
  expect(drawer.className).not.toContain('visible');
});

test('displays all notifications by default', () => {
  renderWithStore({
    notifications: { notifications: mockNotifications, loading: false }
  });
  const menuItem = screen.getByText(/Your notifications/i);
  fireEvent.click(menuItem);
  expect(screen.getByText(/Default notification/i)).toBeInTheDocument();
  expect(screen.getByText(/Urgent notification/i)).toBeInTheDocument();
});

test('filters urgent notifications when urgent button clicked', () => {
  renderWithStore({
    notifications: { notifications: mockNotifications, loading: false }
  });
  const menuItem = screen.getByText(/Your notifications/i);
  fireEvent.click(menuItem);
  fireEvent.click(screen.getByText('‼️'));
  expect(screen.queryByText(/Default notification/i)).not.toBeInTheDocument();
  expect(screen.getByText(/Urgent notification/i)).toBeInTheDocument();
});

test('filters default notifications when default button clicked', () => {
  renderWithStore({
    notifications: { notifications: mockNotifications, loading: false }
  });
  const menuItem = screen.getByText(/Your notifications/i);
  fireEvent.click(menuItem);
  fireEvent.click(screen.getByText('??'));
  expect(screen.getByText(/Default notification/i)).toBeInTheDocument();
  expect(screen.queryByText(/Urgent notification/i)).not.toBeInTheDocument();
});

test('marks a notification as read and removes it', () => {
  const { store } = renderWithStore({
    notifications: { notifications: mockNotifications, loading: false }
  });
  fireEvent.click(screen.getByText(/Default notification/i));
  expect(store.getState().notifications.notifications).toHaveLength(1);
});

test('fetches notifications from API', async () => {
  const { store } = renderWithStore();
  store.dispatch(fetchNotifications());
  mockAxios.mockResponse({
    data: [
      { id: '1', context: { isRead: false, type: 'default', value: 'Test' } }
    ]
  });
  await waitFor(() => {
    expect(store.getState().notifications.notifications).toHaveLength(1);
  });
});