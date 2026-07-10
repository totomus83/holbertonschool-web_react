import { render, screen } from '@testing-library/react';
import NotificationItem from './NotificationItem';

test('renders default type notification in blue', () => {
  render(<NotificationItem id={1} type="default" value="New course available" markAsRead={() => {}} />);

  const liElement = screen.getByRole('listitem');
  expect(liElement).toHaveAttribute('data-notification-type', 'default');
});

test('renders urgent type notification in red', () => {
  render(<NotificationItem id={2} type="urgent" value="New resume available" markAsRead={() => {}} />);

  const liElement = screen.getByRole('listitem');
  expect(liElement).toHaveAttribute('data-notification-type', 'urgent');
});