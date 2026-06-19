import { render, screen, act } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import mockAxios from 'jest-mock-axios';
import App from './App';
import { getLatestNotification } from '../utils/utils';

const notificationsList = [
  {id: 1, type: 'default', value: 'New course available'},
  {id: 2, type: 'urgent', value: 'New resume available'},
  {id: 3, type: 'urgent', html: getLatestNotification()}
];

const coursesList = [
  { id: 1, name: 'ES6', credit: '60'},
  { id: 2, name: 'Webpack', credit: '20'},
  { id: 3, name: 'React', credit: '40'}
];

describe('App component', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  test('Vérification texte h1 App-header', () => {
    render(<App />);
    const headerh1 = screen.getByRole('heading', { level: 1, name: /School dashboard/i });
    expect(headerh1).toBeInTheDocument();
  });

  test('Vérification texte App-body', () => {
    render(<App />);
    const bodyp = screen.getByText(/Login to access the full dashboard/i);
    expect(bodyp).toBeInTheDocument();
  });

  test('Vérification texte App-footer', () => {
    render(<App />);
    const footerp = screen.getByText(/Copyright \d{4} - holberton School/i);
    expect(footerp).toBeInTheDocument();
  });

  test('Vérification alt image App-header', () => {
    render(<App />);
    const headerImgAlt = screen.getByAltText(/holberton logo/i);
    expect(headerImgAlt).toBeInTheDocument();
  });

  // Tests Composant Login
  test('Vérification de la présence du composant Login quand LoggedIn est false (Comportement par défaut)', () => {
    render(<App />);
    const loginText = screen.getByText(/login to access the full dashboard/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const formButton = screen.getByRole('button', { name: /OK/i });
    expect(loginText).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(formButton).toBeInTheDocument();
  });

  // Tests CourseList
  test('Vérification de la présence du composant CourseList quand isLoggedIn est true', async () => {
    render(<App />);
    const user = userEvent.setup();

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.type(emailInput, 'fallen.albaz@gmail.com');
    await user.type(passwordInput, 'Azertyuiop');

    const formButton = screen.getByRole('button', { name: /OK/i });
    await user.click(formButton);

    const tableElement = screen.getByRole('table');
    expect(tableElement).toBeInTheDocument();
  });

  // Tests BodySection
  test('Vérification de la présence des éléments du composant BodySection (h2 & paragraph)', () => {
    render(<App />);
    const BodySectionh2 = screen.getByRole('heading', { level: 2, name: /News from the School/i });
    // const BodySectionp = screen.getByText(/Holberton School News goes here/i);
    const BodySectionp = screen.getByText(/ipsum Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique, asperiores architecto blanditiis fuga doloribus sit illum aliquid ea distinctio minus accusantium, impedit quo voluptatibus ut magni dicta. Recusandae, quia dicta?/i);
    expect(BodySectionh2).toBeInTheDocument();
    expect(BodySectionp).toBeInTheDocument();
  });

  // Test intégration avec le composant Header (Gestion Logout)
  test('Vérification de la présence des bons éléments quand on est connecté ou déconnecté', async () => {
    render(<App />);
    const user = userEvent.setup();

    // Simulation de la connexion
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.type(emailInput, 'fallen.albaz@gmail.com');
    await user.type(passwordInput, 'Azertyuiop');
    const formButton = screen.getByRole('button', { name: /OK/i });
    await user.click(formButton);

    // Vérification de la présence des bons éléments une fois connecté
    const section = document.querySelector('#logoutSection');
    expect(section).toBeInTheDocument();

    // Simulation de la déconnexion
    const logoutLink = screen.getByRole('link', { name: /logout/i });
    await user.click(logoutLink);

    // Vérification de la présence des bons éléments une fois déconnecté.
    expect(section).not.toBeInTheDocument();
    const loginText = screen.getByText(/login to access the full dashboard/i);
    expect(loginText).toBeInTheDocument();
  });

  // Tests liés au Notification Panel
  test("Vérification que le panel s'ouvre quand on clique sur 'Your notifications'", async () => {
    render(<App />);
    // Simulation de l'appel à Axios pour récupérer les données des fichiers json
    await act(async () => {
      mockAxios.mockResponse({ data: notificationsList });
      mockAxios.mockResponse({ data: coursesList });
    });

    // Simumation du clic pour ouvrir le panel
    const user = userEvent.setup();
    const yourNotifElem = screen.getByText(/Your notifications/i);
    await user.click(yourNotifElem);

    const panelTitle = await screen.findByText(/Here is the list of notifications/i);
    expect(panelTitle).toBeInTheDocument();
  });

  test("Vérification que le panel se ferme quand on clique sur la croix du panel", async () => {
    render(<App />);
    // Simulation de l'appel à Axios pour récupérer les données des fichiers json
    await act(async () => {
      mockAxios.mockResponse({ data: notificationsList });
      mockAxios.mockResponse({ data: coursesList });
    });

    // Simumation du clic pour ouvrir le panel
    const user = userEvent.setup();
    const yourNotifElem = screen.getByText(/Your notifications/i);
    await user.click(yourNotifElem);

    const panelTitle = await screen.findByText(/Here is the list of notifications/i);
    expect(panelTitle).toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: /close/i });
    await user.click(closeButton);
    expect(panelTitle).not.toBeInTheDocument();
  });

  test("Vérification que la notification cliquée soit bien retirée avec un message le confirmant dans la console", async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    render(<App />);
    // Simulation de l'appel à Axios pour récupérer les données des fichiers json
    await act(async () => {
      mockAxios.mockResponse({ data: notificationsList });
      mockAxios.mockResponse({ data: coursesList });
    });

    // Simumation du clic pour ouvrir le panel
    const user = userEvent.setup();
    const yourNotifElem = screen.getByText(/Your notifications/i);
    await user.click(yourNotifElem);

    const panelTitle = await screen.findByText(/Here is the list of notifications/i);
    expect(panelTitle).toBeInTheDocument();

    // Simulation du clic sur une notification pour vérifier qu'elle disparaîsse et que le message est bien log dans la console
    const panelElement = screen.getByText(/New resume available/i);
    await user.click(panelElement);
    expect(panelElement).not.toBeInTheDocument();
    expect(consoleSpy).toHaveBeenCalledWith('Notification 2 has been marked as read');

    consoleSpy.mockRestore();
  });

  // Tests liés au Login et Logout
  test("Vérification que le state user se met bien à jour quand on se logIn", async () => {
    render(<App />);
    const user = userEvent.setup();

    // Simulation de la connexion
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.type(emailInput, 'fallen.albaz@gmail.com');
    await user.type(passwordInput, 'Azertyuiop');
    const formButton = screen.getByRole('button', { name: /OK/i });
    await user.click(formButton);

    // Vérification de la présence des bons éléments une fois connecté (user.isLoggedIn: true)
    const section = document.querySelector('#logoutSection');
    expect(section).toBeInTheDocument();

    // Vérification de la mise à jour du state user.email
    const userEmail = screen.getByText(/fallen\.albaz@gmail\.com/i)
    expect(userEmail).toBeInTheDocument();
  });

  test("Vérification que le state user se met bien à jour quand on se logIn, puis se logOut", async () => {
    render(<App />);
    const user = userEvent.setup();

    // Simulation de la connexion
    let emailInput = screen.getByLabelText(/email/i);
    let passwordInput = screen.getByLabelText(/password/i);

    await user.type(emailInput, 'fallen.albaz@gmail.com');
    await user.type(passwordInput, 'Azertyuiop');
    const formButton = screen.getByRole('button', { name: /OK/i });
    await user.click(formButton);

    // Vérification de la présence des bons éléments une fois connecté
    const section = document.querySelector('#logoutSection');
    expect(section).toBeInTheDocument();

    // Simulation de la déconnexion
    const logoutLink = screen.getByRole('link', { name: /logout/i });
    await user.click(logoutLink);

    // Vérification de la présence des bons éléments une fois déconnecté (user.isLoggedIn: false).
    expect(section).not.toBeInTheDocument();

    // Vérification de la mise à jour du state user.email et user.password
    emailInput = screen.getByLabelText(/email/i);
    passwordInput = screen.getByLabelText(/password/i);
    expect(emailInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
  });

  // Tests pour vérifier les appels Axios
  test("Vérification que les données de notifications.json sont bien récupérées au chargelent initial", async () => {
    render(<App />);
    // Simulation de l'appel à Axios pour récupérer les données des fichiers json
    await act(async () => {
      mockAxios.mockResponse({ data: notificationsList });
      mockAxios.mockResponse({ data: coursesList });
    });

    // Simumation du clic pour ouvrir le panel
    const user = userEvent.setup();
    const yourNotifElem = screen.getByText(/Your notifications/i);
    await user.click(yourNotifElem);

    const panelNotification = await screen.findByText(/New course available/i);
    expect(panelNotification).toBeInTheDocument();
  });

  test("Vérification que les données de courses.json sont bien récupérées quand le state d'user change", async () => {
    render(<App />);
    // Simulation de l'appel à Axios pour récupérer les données des fichiers json
    await act(async () => {
      mockAxios.mockResponse({ data: notificationsList });
      mockAxios.mockResponse({ data: coursesList });
    });
    // Initialisation de l'user
    const user = userEvent.setup();

    // Simulation de la connexion
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.type(emailInput, 'fallen.albaz@gmail.com');
    await user.type(passwordInput, 'Azertyuiop');
    const formButton = screen.getByRole('button', { name: /OK/i });
    await user.click(formButton);

    // Vérification de récupération des données de courses.json quand le state de l'user change
    await act(async () => {
      mockAxios.mockResponse({ data: coursesList });
    });

    const courses = await screen.findByText(/Webpack/i);
    expect(courses).toBeInTheDocument();
  });
});
