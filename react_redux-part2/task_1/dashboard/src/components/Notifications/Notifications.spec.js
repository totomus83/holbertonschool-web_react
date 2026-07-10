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

test('displays notification items fetched from the API', async () => {
  const { store } = renderWithStore();

  store.dispatch(fetchNotifications());

  mockAxios.mockResponse({
    data: {
      notifications: [
        { id: 1, type: 'default', value: 'New course available' },
        { id: 2, type: 'urgent', value: 'New resume available' }
      ]
    }
  });

  await waitFor(() => {
    fireEvent.click(screen.getByText(/Your notifications/i));
  });

  await waitFor(() => {
    expect(screen.getByText(/New course available/i)).toBeInTheDocument();
  });
});

test('toggles drawer visibility using visible style on click', () => {
  renderWithStore({
    notifications: { notifications: [] }
  });

  const menuItem = screen.getByText(/Your notifications/i);
  const drawer = menuItem.nextSibling;

  expect(drawer.className).not.toContain('visible');
  fireEvent.click(menuItem);
  expect(drawer.className).toContain('visible');
  fireEvent.click(menuItem);
  expect(drawer.className).not.toContain('visible');
});

test('close button toggles drawer visibility', () => {
  renderWithStore({
    notifications: {
      notifications: [
        { id: 1, type: 'default', value: 'New course available' },
      ]
    }
  });

  const menuItem = screen.getByText(/Your notifications/i);
  fireEvent.click(menuItem);

  const closeButton = screen.getByRole('button', { name: /close/i });
  fireEvent.click(closeButton);

  const drawer = menuItem.nextSibling;
  expect(drawer.className).not.toContain('visible');
});

test('marks a notification as read and removes it from the list', () => {
  const { store } = renderWithStore({
    notifications: {
      notifications: [
        { id: 1, type: 'default', value: 'New course available' },
        { id: 2, type: 'urgent', value: 'New resume available' }
      ]
    }
  });

  fireEvent.click(screen.getByText(/New course available/i));

  expect(store.getState().notifications.notifications).toHaveLength(1);
  expect(store.getState().notifications.notifications[0].id).toBe(2);
});