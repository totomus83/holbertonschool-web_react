import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import newContext from '../Context/context';

describe('Footer component', () => {
  test('Vérification texte App-footer', () => {
    render(<Footer />);
    const footerp = screen.getByText(/Copyright \d{4} - holberton School/i);
    expect(footerp).toBeInTheDocument();
  });

  test('Contact us link is not displayed when user is logged out', () => {
    const contextValue = {
      user: { email: '', password: '', isLoggedIn: false },
      logOut: () => {},
    };
    render(
      <newContext.Provider value={contextValue}>
        <Footer />
      </newContext.Provider>
    );
    expect(screen.queryByText(/Contact us/i)).not.toBeInTheDocument();
  });

  test('Contact us link is displayed when user is logged in', () => {
    const contextValue = {
      user: { email: 'test@example.com', password: 'password123', isLoggedIn: true },
      logOut: () => {},
    };
    render(
      <newContext.Provider value={contextValue}>
        <Footer />
      </newContext.Provider>
    );
    expect(screen.getByText(/Contact us/i)).toBeInTheDocument();
  });
});