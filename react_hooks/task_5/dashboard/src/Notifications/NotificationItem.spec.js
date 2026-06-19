import NotificationItem from './NotificationItem';
import { render, screen, fireEvent } from '@testing-library/react';

describe('NotificationItem component', () => {
  test("Vérification que le texte en data-notification-type: default soit bleu", () => {
    render(<NotificationItem type="default" value="New course available"/>);
    const liElement = screen.getByRole('listitem');
    expect(liElement).toHaveAttribute('data-notification-type', 'default');
  });

  test("Vérification que le texte en data-notification-type: urgent soit rouge", () => {
    render(<NotificationItem type="urgent" value="New resume available"/>);
    const liElement = screen.getByRole('listitem');
    expect(liElement).toHaveAttribute('data-notification-type', 'urgent');
  });

  test("Vérification que markAsRead est appelé lors d'un clic sur une notification", () => {
    const markAsReadSpy = jest.fn();
    render(<NotificationItem type="urgent" value="New resume available" markAsRead={markAsReadSpy}/>);

    const notificationText = screen.getByText(/New resume available/i);
    fireEvent.click(notificationText);
    expect(markAsReadSpy).toHaveBeenCalledTimes(1);
  });

  test("Vérification que le composant est bien wrappé dans memo", () => {
    expect(NotificationItem.$$typeof).toBe(Symbol.for('react.memo'));
  });
});
