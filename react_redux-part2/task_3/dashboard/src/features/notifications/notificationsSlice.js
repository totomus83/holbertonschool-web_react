import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5173';
const ENDPOINTS = {
  notifications: `${API_BASE_URL}/notifications.json`
};

const initialState = {
  notifications: [],
  loading: false,
};

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async () => {
    const response = await axios.get(ENDPOINTS.notifications);
    return response.data
      .filter((n) => n.context.isRead === false)
      .map((n) => ({
        id: n.id,
        type: n.context.type,
        isRead: n.context.isRead,
        value: n.context.value,
      }));
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
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state) => {
        state.loading = false;
      });
  }
});

export const { markNotificationAsRead } = notificationsSlice.actions;
export default notificationsSlice.reducer;