import { render, screen, fireEvent } from '@testing-library/react';
import NotificationItem from './NotificationItem';

test('renders with correct type and value', () => {
  render(<NotificationItem type="default" value="Test notification" id="1" markAsRead={() => {}} />);
  const li = screen.getByRole('listitem');
  expect(li).toHaveAttribute('data-notification-type', 'default');
  expect(li).toHaveTextContent('Test notification');
});

test('applies blue color for default type', () => {
  render(<NotificationItem type="default" value="Default" id="1" markAsRead={() => {}} />);
  const li = screen.getByRole('listitem');
  expect(li).toHaveStyle({ color: 'blue' });
});

test('applies red color for urgent type', () => {
  render(<NotificationItem type="urgent" value="Urgent" id="1" markAsRead={() => {}} />);
  const li = screen.getByRole('listitem');
  expect(li).toHaveStyle({ color: 'red' });
});

test('calls markAsRead with correct id when clicked', () => {
  const markAsRead = jest.fn();
  render(<NotificationItem type="default" value="Test" id="1" markAsRead={markAsRead} />);
  fireEvent.click(screen.getByRole('listitem'));
  expect(markAsRead).toHaveBeenCalledWith('1');
});