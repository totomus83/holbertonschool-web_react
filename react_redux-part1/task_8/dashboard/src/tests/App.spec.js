import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import mockAxios from 'jest-mock-axios';
import App from '../App';
import rootReducer from '../app/rootReducer';

afterEach(() => {
  mockAxios.reset();
});

function renderWithStore(preloadedState) {
  const store = configureStore({ reducer: rootReducer, preloadedState });
  return {
    store,
    ...render(
      <Provider store={store}>
        <App />
      </Provider>
    )
  };
}

const mockNotificationsResponse = {
  data: {
    notifications: [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', html: { __html: '' } }
    ]
  }
};

test('displays Login when isLoggedIn is false', async () => {
  renderWithStore({
    auth: { user: { email: '', password: '' }, isLoggedIn: false }
  });

  mockAxios.mockResponse(mockNotificationsResponse);

  await waitFor(() => {
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });
});

test('displays CourseList when isLoggedIn is true', async () => {
  renderWithStore({
    auth: { user: { email: 'test@test.com', password: 'password123' }, isLoggedIn: true }
  });

  mockAxios.mockResponse(mockNotificationsResponse);

  await waitFor(() => {
    expect(screen.getByRole('table')).toBeInTheDocument();
  });
});

test('fetches and displays notifications on mount', async () => {
  renderWithStore({
    auth: { user: { email: '', password: '' }, isLoggedIn: false }
  });

  mockAxios.mockResponse(mockNotificationsResponse);

  await waitFor(() => {
    const yourNotifElem = screen.getByText(/Your notifications/i);
    fireEvent.click(yourNotifElem);
  });

  await waitFor(() => {
    expect(screen.getByText(/New course available/i)).toBeInTheDocument();
  });
});

test('does NOT fetch courses when isLoggedIn is false', async () => {
  renderWithStore({
    auth: { user: { email: '', password: '' }, isLoggedIn: false }
  });

  mockAxios.mockResponse(mockNotificationsResponse);

  await waitFor(() => {
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  const coursesCall = mockAxios.get.mock.calls.find(
    (call) => call[0].includes('courses.json')
  );
  expect(coursesCall).toBeUndefined();
});

test('fetches courses only when isLoggedIn is true', async () => {
  renderWithStore({
    auth: { user: { email: 'test@test.com', password: 'password123' }, isLoggedIn: true }
  });

  mockAxios.mockResponse(mockNotificationsResponse);

  await waitFor(() => {
    const coursesCall = mockAxios.get.mock.calls.find(
      (call) => call[0].includes('courses.json')
    );
    expect(coursesCall).toBeDefined();
  });
});