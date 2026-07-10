import mockAxios from 'jest-mock-axios';
import coursesReducer, { fetchCourses } from '../courses/coursesSlice';
import { logout } from '../auth/authSlice';

afterEach(() => {
  mockAxios.reset();
});

describe('coursesSlice', () => {
  const initialState = {
    courses: []
  };

  test('should return the initial state by default', () => {
    const state = coursesReducer(undefined, { type: undefined });
    expect(state).toEqual(initialState);
  });

  test('should handle fetchCourses.fulfilled', () => {
    const fetchedCourses = [
      { id: 1, name: 'ES6', credit: 60 },
      { id: 2, name: 'Webpack', credit: 20 },
      { id: 3, name: 'React', credit: 40 }
    ];

    const action = {
      type: fetchCourses.fulfilled.type,
      payload: fetchedCourses
    };
    const state = coursesReducer(initialState, action);

    expect(state.courses).toEqual(fetchedCourses);
  });

  test('should reset courses to empty array when logout is dispatched', () => {
    const stateWithCourses = {
      courses: [
        { id: 1, name: 'ES6', credit: 60 },
        { id: 2, name: 'Webpack', credit: 20 }
      ]
    };

    const state = coursesReducer(stateWithCourses, logout());

    expect(state.courses).toEqual([]);
  });

  test('fetchCourses thunk dispatches fulfilled action with correct data on successful API call', async () => {
    const dispatch = jest.fn();
    const thunk = fetchCourses();

    const promise = thunk(dispatch, () => {}, undefined);

    mockAxios.mockResponse({
      data: {
        courses: [
          { id: 1, name: 'ES6', credit: 60 },
          { id: 2, name: 'Webpack', credit: 20 },
          { id: 3, name: 'React', credit: 40 }
        ]
      }
    });

    await promise;

    const fulfilledCall = dispatch.mock.calls.find(
      (call) => call[0].type === fetchCourses.fulfilled.type
    );

    expect(fulfilledCall).toBeDefined();
    expect(fulfilledCall[0].payload).toEqual([
      { id: 1, name: 'ES6', credit: 60 },
      { id: 2, name: 'Webpack', credit: 20 },
      { id: 3, name: 'React', credit: 40 }
    ]);
  });
});