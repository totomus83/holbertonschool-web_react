import { render, screen, fireEvent } from '@testing-library/react';
import NotificationItem from './NotificationItem';

describe('NotificationItem component', () => {
  test('Vérification que le texte en data-notification-type: default soit bleu', () => {
    render(<NotificationItem type="default" value="New course available" />);
    const liElement = screen.getByRole('listitem');
    expect(liElement).toHaveAttribute('data-notification-type', 'default');
    expect(liElement).toHaveStyle({ color: 'blue' });
  });

  test('Vérification que le texte en data-notification-type: urgent soit rouge', () => {
    render(<NotificationItem type="urgent" value="New resume available" />);
    const liElement = screen.getByRole('listitem');
    expect(liElement).toHaveAttribute('data-notification-type', 'urgent');
    expect(liElement).toHaveStyle({ color: 'red' });
  });

  test('markAsRead is called with the correct id when clicked', () => {
    const markAsRead = jest.fn();
    render(<NotificationItem type="default" value="New course available" id={1} markAsRead={markAsRead} />);
    const liElement = screen.getByRole('listitem');
    fireEvent.click(liElement);
    expect(markAsRead).toHaveBeenCalledWith(1);
  });
});