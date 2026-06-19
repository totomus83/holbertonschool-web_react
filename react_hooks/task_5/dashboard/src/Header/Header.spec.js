import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import newContext from '../Context/context.js';
import Header from './Header';

const userTest = {
  email: 'fallen.albaz@gmail.com',
  password: 'azertyuiop',
  isLoggedIn: true,
}

describe('Header component', () => {
  test('Vérification texte h1 App-header', () => {
    render(<Header />);
    const headerh1 = screen.getByRole('heading', { level: 1, name: /School dashboard/i });
    expect(headerh1).toBeInTheDocument();
  });

  test('Vérification alt image App-header', () => {
    render(<Header />);
    const headerImgAlt = screen.getByAltText(/holberton logo/i);
    expect(headerImgAlt).toBeInTheDocument();
  });

  // Tests avec le contexte
  test("Vérification de l'absence de la section #logoutSection par défaut", () => {
    render(<Header />);
    const section = document.querySelector('#logoutSection');
    expect(section).not.toBeInTheDocument();
  });

  test("Vérification de la présence de la section #logoutSection quand le contexte de l'user a isLoggedIn à true.", () => {
    render(
      <newContext.Provider value={{user: userTest, logOut: () => {}}}>
        <Header />
      </newContext.Provider>
    );
    const section = document.querySelector('#logoutSection');
    expect(section).toBeInTheDocument();
  });

  test("Vérification de l'appel à la fonction logOut quand on clique sur '(logout)' quand le contexte de l'user a isLoggedIn à true", async () => {
    const user = userEvent.setup();

    const logOutSpy = jest.fn();
    render(
      <newContext.Provider value={{user: userTest, logOut: logOutSpy}}>
        <Header />
      </newContext.Provider>
    );
    const section = document.querySelector('#logoutSection');
    expect(section).toBeInTheDocument();

    const logoutLink = screen.getByRole('link', { name: /logout/i });
    await user.click(logoutLink);

    expect(logOutSpy).toHaveBeenCalledTimes(1);
  });
});
