import Notifications from './Notifications';
import { getLatestNotification } from '../utils/utils';
import { render, screen, fireEvent } from '@testing-library/react';

// Déclaration de notificaionsList
const notificationsList = [
  {id: 1, type: 'default', value: 'New course available'},
  {id: 2, type: 'urgent', value: 'New resume available'},
  {id: 3, type: 'urgent', html: getLatestNotification()}
];

const notificationsList2 = [
  {id: 1, type: 'default', value: 'Fallen of Albaz'},
  {id: 2, type: 'default', value: 'Dragon/effect'},
  {id: 3, type: 'urgent', value: 'The new Branded Deck'}
];

const notificationsList3 = [
  {id: 1, type: 'default', value: 'Fallen of Albaz'},
  {id: 2, type: 'urgent', value: 'The new Branded Deck'}
];

describe('Notifications component', () => {
  test("Vérification de la présence du message 'Here is the list of notifications'", () => {
    render(<Notifications notifications={notificationsList} displayDrawer={true}/>);
    const notifTitle = screen.getByText(/Here is the list of notifications/i);
    expect(notifTitle).toBeInTheDocument();
  });

  test('Vérification de la présence du bouton close', () => {
    render(<Notifications notifications={notificationsList} displayDrawer={true}/>);
    const closeButton = screen.getByRole('button');
    expect(closeButton).toBeInTheDocument();
  });

  test('Vérification de la présence des 3 li', () => {
    render(<Notifications notifications={notificationsList} displayDrawer={true} />);
    const liElements = screen.getAllByRole('listitem');
    expect(liElements).toHaveLength(3);
  });

  test('Vérification du texte des 3 li', () => {
    render(<Notifications notifications={notificationsList} displayDrawer={true} />);
    const liElements = screen.getAllByRole('listitem');
    expect(liElements[0]).toHaveTextContent(/New course available/i);
    expect(liElements[1]).toHaveTextContent(/New resume available/i);
    expect(liElements[2]).toHaveTextContent(/Urgent requirement - complete by EOD/i);
  });

  test("Vérification que les éléments de notifications-item s'affichent quand displayDrawer est true et que notifications n'est pas vide", () => {
    render(<Notifications notifications={notificationsList} displayDrawer={true}/>);
    const notificationText = screen.getByText(/Your notifications/i);
    expect(notificationText).toBeInTheDocument();
    // Vérification des éléments qui doivent s'afficher
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText(/Here is the list of notifications/i)).toBeInTheDocument();
    const liElements = screen.getAllByRole('listitem');
    expect(liElements[0]).toHaveTextContent(/New course available/i);
    expect(liElements[1]).toHaveTextContent(/New resume available/i);
    expect(liElements[2]).toHaveTextContent(/Urgent requirement - complete by EOD/i);
  });

  test("Vérification de l'affichage du message 'No new notification for now' quand displayDrawer est true et que notifications est vide", () => {
    render(<Notifications notifications={[]} displayDrawer={true}/>);
    const notificationText = screen.getByText(/Your notifications/i);
    expect(notificationText).toBeInTheDocument();
    // Vérification des éléments qui doivent s'afficher ou non
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.queryByText(/Here is the list of notifications/i)).not.toBeInTheDocument();
    const noNotifMessage = screen.getByText(/No new notification for now/i);
    expect(noNotifMessage).toBeInTheDocument();
  });

  test("Vérification que les éléments de notifications-item ne s'affichent pas quand displayDrawer est false", () => {
    render(<Notifications notifications={notificationsList} displayDrawer={false}/>);
    const notificationText = screen.getByText(/Your notifications/i);
    expect(notificationText).toBeInTheDocument();
    // Vérification des éléments qui ne doivent pas s'afficher
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
    expect(screen.queryByText(/Here is the list of notifications/i)).not.toBeInTheDocument();
  });

  test("Vérification de l'eventHandler 'click' sur la notification", () => {
    const readSpy = jest.fn();
    render(<Notifications notifications={notificationsList} displayDrawer={true} markNotificationAsRead={readSpy} />);
    const notificationText = screen.getByText(/New resume available/i);
    fireEvent.click(notificationText);
    expect(readSpy).toHaveBeenCalledWith(2);
  });

  test("Vérification que le composant ne se re-rende pas si la longueur de notificationsList ne change pas", () => {
      const { rerender } = render(<Notifications notifications={notificationsList} displayDrawer={true} />);
      let liElements = screen.getAllByRole('listitem');
      expect(liElements[0]).toHaveTextContent(/New course available/i);
      expect(liElements[1]).toHaveTextContent(/New resume available/i);
      expect(liElements[2]).toHaveTextContent(/Urgent requirement - complete by EOD/i);

      rerender(<Notifications notifications={notificationsList2} displayDrawer={true} />);
      liElements = screen.getAllByRole('listitem');
      expect(liElements[0]).toHaveTextContent(/New course available/i);
      expect(liElements[1]).toHaveTextContent(/New resume available/i);
      expect(liElements[2]).toHaveTextContent(/Urgent requirement - complete by EOD/i);
    });

  test("Vérification que le composant se re-rende si la longueur de notificationsList change", () => {
    const { rerender } = render(<Notifications notifications={notificationsList} displayDrawer={true} />);
    let liElements = screen.getAllByRole('listitem');
    expect(liElements).toHaveLength(3);
    expect(liElements[0]).toHaveTextContent(/New course available/i);
    expect(liElements[1]).toHaveTextContent(/New resume available/i);
    expect(liElements[2]).toHaveTextContent(/Urgent requirement - complete by EOD/i);

    rerender(<Notifications notifications={notificationsList3} displayDrawer={true} />);
    liElements = screen.getAllByRole('listitem');
    expect(liElements).toHaveLength(2);
    expect(liElements[0]).toHaveTextContent(/Fallen of Albaz/i);
    expect(liElements[1]).toHaveTextContent(/The new Branded Deck/i);
  });

  // Tests sur les Event Handler liés à l'affichage du Display Drawer
  test("Vérification de l'eventHandler 'click' sur le bouton", () => {
    const hideDrawerSpy = jest.fn();
    render(<Notifications notifications={notificationsList} displayDrawer={true} handleHideDrawer={hideDrawerSpy} />);
    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);
    expect(hideDrawerSpy).toHaveBeenCalledTimes(1);
    hideDrawerSpy.mockReset();
  });

  test("Vérification de l'eventHandler 'click' sur le paragraphe 'Your notifications'", () => {
    const displayDrawerSpy = jest.fn();
    render(<Notifications notifications={notificationsList} displayDrawer={true} handleDisplayDrawer={displayDrawerSpy} />);
    const yourNotifications = screen.getByText(/Your notifications/i);
    fireEvent.click(yourNotifications);
    expect(displayDrawerSpy).toHaveBeenCalledTimes(1);
    displayDrawerSpy.mockReset();
  });
});
