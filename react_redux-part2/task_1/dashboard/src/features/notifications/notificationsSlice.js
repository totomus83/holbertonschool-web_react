import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getLatestNotification } from '../../utils/utils';

const API_BASE_URL = 'http://localhost:5173';
const ENDPOINTS = {
  notifications: `${API_BASE_URL}/notifications.json`
};

const initialState = {
  notifications: [],
};

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async () => {
    const response = await axios.get(ENDPOINTS.notifications);
    const currentNotifications = response.data.notifications;

    const latestNotif = {
      id: 3,
      type: 'urgent',
      html: { __html: getLatestNotification() }
    };

    const indexToReplace = currentNotifications.findIndex(
      (notification) => notification.id === 3
    );

    const updatedNotifications = [...currentNotifications];
    if (indexToReplace !== -1) {
      updatedNotifications[indexToReplace] = latestNotif;
    } else {
      updatedNotifications.push(latestNotif);
    }

    return updatedNotifications;
  }
);

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    markNotificationAsRead: (state, action) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
      console.log(`Notification ${action.payload} has been marked as read`);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      state.notifications = action.payload;
    });
  }
});

export const { markNotificationAsRead } = notificationsSlice.actions;
export default notificationsSlice.reducer;