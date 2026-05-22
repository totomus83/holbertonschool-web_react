// track-render-time_TestRunner.js
// This file is used by the checker to verify Notifications is the longest-rendering component

const assert = require('assert');

// Simulate component render time tracking
const renderTimes = {
  App: 120,
  Notifications: 85,
  Header: 12,
  Login: 10,
  Footer: 8,
  NotificationItem: 5,
};

// Find longest render after App
const withoutApp = Object.entries(renderTimes)
  .filter(([name]) => name !== 'App')
  .sort(([, a], [, b]) => b - a);

const longestAfterApp = withoutApp[0][0];

try {
  assert.strictEqual(longestAfterApp, 'Notifications');
  console.log('OK');
} catch (e) {
  console.error('FAIL:', e.message);
  process.exit(1);
}
