import mockAxios from 'jest-mock-axios';
import notificationsReducer, {
  fetchNotifications,
  markNotificationAsRead,
} from '../notifications/notificationsSlice';
import { getLatestNotification } from '../../utils/utils';

afterEach(() => {
  mockAxios.reset();
});

describe('notificationsSlice', () => {
  const initialState = {
    notifications: [],
  };

  test('should return the initial state by default', () => {
    const state = notificationsReducer(undefined, { type: undefined });
    expect(state).toEqual(initialState);
  });

  test('should handle fetchNotifications.fulfilled', () => {
    const fetchedNotifications = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', html: { __html: getLatestNotification() } }
    ];
    const action = {
      type: fetchNotifications.fulfilled.type,
      payload: fetchedNotifications
    };
    const state = notificationsReducer(initialState, action);
    expect(state.notifications).toEqual(fetchedNotifications);
  });

  test('should handle markNotificationAsRead', () => {
    const stateWithNotifications = {
      notifications: [
        { id: 1, type: 'default', value: 'New course available' },
        { id: 2, type: 'urgent', value: 'New resume available' }
      ],
    };
    const state = notificationsReducer(stateWithNotifications, markNotificationAsRead(1));
    expect(state.notifications).toHaveLength(1);
    expect(state.notifications.find((n) => n.id === 1)).toBeUndefined();
    expect(state.notifications.find((n) => n.id === 2)).toBeDefined();
  });

  test('fetchNotifications thunk dispatches fulfilled action with correct data on successful API call', async () => {
    const dispatch = jest.fn();
    const thunk = fetchNotifications();
    const promise = thunk(dispatch, () => {}, undefined);
    mockAxios.mockResponse({
      data: {
        notifications: [
          { id: 1, type: 'default', value: 'New course available' },
          { id: 2, type: 'urgent', value: 'New resume available' },
          { id: 3, type: 'default', value: 'Old placeholder' }
        ]
      }
    });
    await promise;
    const fulfilledCall = dispatch.mock.calls.find(
      (call) => call[0].type === fetchNotifications.fulfilled.type
    );
    expect(fulfilledCall).toBeDefined();
    expect(fulfilledCall[0].payload).toEqual([
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', html: { __html: getLatestNotification() } }
    ]);
  });
});