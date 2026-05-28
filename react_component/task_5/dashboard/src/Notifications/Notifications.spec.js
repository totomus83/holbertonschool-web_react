import Notifications from './Notifications';
import { render, screen, fireEvent } from '@testing-library/react';
import { getLatestNotification } from '../utils/utils';

const notificationsList = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', html: getLatestNotification() },
];

describe('Notifications component', () => {
  test("Vérification de la présence du message 'Here is the list of notifications'", () => {
    render(<Notifications notifications={notificationsList} />);
    const notifTitle = screen.getByText(/Here is the list of notifications/i);
    expect(notifTitle).toBeInTheDocument();
  });

  test('Vérification de la présence du bouton close', () => {
    render(<Notifications notifications={notificationsList} />);
    const closeButton = screen.getByRole('button');
    expect(closeButton).toBeInTheDocument();
  });

  test('Vérification de la présence des 3 li', () => {
    render(<Notifications notifications={notificationsList} />);
    const liElements = screen.getAllByRole('listitem');
    expect(liElements).toHaveLength(3);
  });

  test("Vérification de l'eventHandler 'click' sur le bouton", () => {
    render(<Notifications notifications={notificationsList} />);
    const consoleSpy = jest.spyOn(console, 'log');
    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);
    expect(consoleSpy).toHaveBeenCalledWith('Close button has been clicked');
    consoleSpy.mockRestore();
  });

  test('markAsRead logs the correct message when a notification is clicked', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<Notifications listNotifications={notificationsList} displayDrawer={true} />);
    const items = screen.getAllByRole('listitem');
    fireEvent.click(items[0]);
    expect(consoleSpy).toHaveBeenCalledWith('Notification 1 has been marked as read');
    consoleSpy.mockRestore();
  });

  test('does not re-render when the length of notifications prop stays the same', () => {
    const sameList = [{ id: 1, type: 'default', value: 'New course available' }];
    const { rerender } = render(<Notifications listNotifications={sameList} />);
    const listItemsBefore = screen.getAllByRole('listitem');
    rerender(<Notifications listNotifications={[{ id: 1, type: 'urgent', value: 'Changed value' }]} />);
    const listItemsAfter = screen.getAllByRole('listitem');
    expect(listItemsBefore.length).toBe(listItemsAfter.length);
  });

  test('re-renders when the length of notifications prop changes', () => {
    const { rerender } = render(<Notifications listNotifications={[{ id: 1, type: 'default', value: 'One' }]} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(1);
    rerender(<Notifications listNotifications={[
      { id: 1, type: 'default', value: 'One' },
      { id: 2, type: 'urgent', value: 'Two' },
    ]} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });
});