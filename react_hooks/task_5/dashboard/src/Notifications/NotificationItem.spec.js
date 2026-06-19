import { render, screen, fireEvent } from '@testing-library/react';
import NotificationItem from './NotificationItem';

describe('NotificationItem component', () => {
  test('Vérification que le texte en data-notification-type: default a la bonne classe', () => {
    render(<NotificationItem type="default" value="New course available" />);
    const liElement = screen.getByRole('listitem');
    expect(liElement).toHaveAttribute('data-notification-type', 'default');
    expect(liElement.className).toContain('text-(--default-notification-item)');
  });

  test('Vérification que le texte en data-notification-type: urgent a la bonne classe', () => {
    render(<NotificationItem type="urgent" value="New resume available" />);
    const liElement = screen.getByRole('listitem');
    expect(liElement).toHaveAttribute('data-notification-type', 'urgent');
    expect(liElement.className).toContain('text-(--urgent-notification-item)');
  });

  test('markAsRead is called with the correct id when clicked', () => {
    const markAsRead = jest.fn();
    render(<NotificationItem type="default" value="New course available" id={1} markAsRead={markAsRead} />);
    const liElement = screen.getByRole('listitem');
    fireEvent.click(liElement);
    expect(markAsRead).toHaveBeenCalledWith(1);
  });
});