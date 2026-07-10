import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import mockAxios from 'jest-mock-axios';
import CourseList from './CourseList';
import rootReducer from '../../app/rootReducer';
import { logout } from '../../features/auth/authSlice';
import { fetchCourses } from '../../features/courses/coursesSlice';

afterEach(() => {
  mockAxios.reset();
});

function renderWithStore(preloadedState) {
  const store = configureStore({ reducer: rootReducer, preloadedState });
  return {
    store,
    ...render(
      <Provider store={store}>
        <CourseList />
      </Provider>
    )
  };
}

test('displays courses fetched from the API', async () => {
  const { store } = renderWithStore();

  store.dispatch(fetchCourses());

  mockAxios.mockResponse({
    data: {
      courses: [
        { id: 1, name: 'ES6', credit: 60 },
        { id: 2, name: 'Webpack', credit: 20 }
      ]
    }
  });

  await waitFor(() => {
    expect(screen.getByText('ES6')).toBeInTheDocument();
    expect(screen.getByText('Webpack')).toBeInTheDocument();
  });
});

test('resets courses array when logout action is dispatched', () => {
  const { store } = renderWithStore({
    courses: { courses: [{ id: 1, name: 'ES6', credit: 60 }] }
  });

  expect(screen.getByText('ES6')).toBeInTheDocument();

  store.dispatch(logout());

  expect(store.getState().courses.courses).toEqual([]);
});