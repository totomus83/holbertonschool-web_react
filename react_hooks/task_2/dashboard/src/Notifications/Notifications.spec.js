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
    render(<Notifications notifications={notificationsList} displayDrawer={true} />);
    const notifTitle = screen.getByText(/Here is the list of notifications/i);
    expect(notifTitle).toBeInTheDocument();
  });

  test('Vérification de la présence du bouton close', () => {
    render(<Notifications notifications={notificationsList} displayDrawer={true} />);
    const closeButton = screen.getByRole('button');
    expect(closeButton).toBeInTheDocument();
  });

  test('Vérification de la présence des 3 li', () => {
    render(<Notifications notifications={notificationsList} displayDrawer={true} />);
    const liElements = screen.getAllByRole('listitem');
    expect(liElements).toHaveLength(3);
  });

  test("Vérification de l'eventHandler 'click' sur le bouton", () => {
    render(<Notifications notifications={notificationsList} displayDrawer={true} />);
    const consoleSpy = jest.spyOn(console, 'log');
    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);
    expect(consoleSpy).toHaveBeenCalledWith('Close button has been clicked');
    consoleSpy.mockRestore();
  });

  test('markNotificationAsRead prop is called when a notification is clicked', () => {
    const markNotificationAsRead = jest.fn();
    render(
      <Notifications
        notifications={notificationsList}
        displayDrawer={true}
        markNotificationAsRead={markNotificationAsRead}
      />
    );
    const items = screen.getAllByRole('listitem');
    fireEvent.click(items[0]);
    expect(markNotificationAsRead).toHaveBeenCalledWith(1);
  });

  test('clicking on "Your notifications" calls handleDisplayDrawer', () => {
    const handleDisplayDrawer = jest.fn();
    render(
      <Notifications
        notifications={notificationsList}
        displayDrawer={false}
        handleDisplayDrawer={handleDisplayDrawer}
      />
    );
    const title = screen.getByText(/Your notifications/i);
    fireEvent.click(title);
    expect(handleDisplayDrawer).toHaveBeenCalledTimes(1);
  });

  test('clicking the close button calls handleHideDrawer', () => {
    const handleHideDrawer = jest.fn();
    render(
      <Notifications
        notifications={notificationsList}
        displayDrawer={true}
        handleHideDrawer={handleHideDrawer}
      />
    );
    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);
    expect(handleHideDrawer).toHaveBeenCalledTimes(1);
  });
});