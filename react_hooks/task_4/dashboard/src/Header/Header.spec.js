import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';
import newContext from '../Context/context';

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

  test('logoutSection is not rendered with default context value', () => {
    render(<Header />);
    expect(document.getElementById('logoutSection')).not.toBeInTheDocument();
  });

  test('logoutSection is rendered when isLoggedIn is true', () => {
    const contextValue = {
      user: { email: 'test@example.com', password: 'password123', isLoggedIn: true },
      logOut: () => {},
    };
    render(
      <newContext.Provider value={contextValue}>
        <Header />
      </newContext.Provider>
    );
    expect(document.getElementById('logoutSection')).toBeInTheDocument();
  });

  test('clicking on logout link calls the logOut function', () => {
    const logOutSpy = jest.fn();
    const contextValue = {
      user: { email: 'test@example.com', password: 'password123', isLoggedIn: true },
      logOut: logOutSpy,
    };
    render(
      <newContext.Provider value={contextValue}>
        <Header />
      </newContext.Provider>
    );
    const logoutLink = screen.getByText(/logout/i);
    fireEvent.click(logoutLink);
    expect(logOutSpy).toHaveBeenCalledTimes(1);
  });
});