import Notifications from './Notifications';
import { render, screen, fireEvent } from '@testing-library/react';

describe('Notifications component', () => {
  test("Vérification de la présence du message 'Here is the list of notifications'", () => {
    render(<Notifications />);
    const notifTitle = screen.getByText(/Here is the list of notifications/i);
    expect(notifTitle).toBeInTheDocument();
  });

  test('Vérification de la présence du bouton close', () => {
    render(<Notifications />);
    const closeButton = screen.getByRole('button');
    expect(closeButton).toBeInTheDocument();
  });

  test('Vérification de la présence des 3 li', () => {
    render(<Notifications />);
    const liElements = screen.getAllByRole('listitem');
    expect(liElements).toHaveLength(3);
  });

  test("Vérification de l'eventHandler 'click' sur le bouton", () => {
    render(<Notifications />);
    const consoleSpy = jest.spyOn(console, 'log')
    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);
    expect(consoleSpy).toHaveBeenCalledWith('Close button has been clicked');
    consoleSpy.mockRestore();
  });
});