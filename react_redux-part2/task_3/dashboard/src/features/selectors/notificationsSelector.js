import { createSelector } from '@reduxjs/toolkit';

const getNotifications = (state) => state.notifications.notifications;

export const getFilteredNotifications = createSelector(
  [getNotifications, (_, filter) => filter],
  (notifications, filter) => {
    if (filter === 'all') return notifications;
    return notifications.filter((n) => n.type === filter);
  }
);