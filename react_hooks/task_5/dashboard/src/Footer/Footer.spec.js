import { render, screen } from '@testing-library/react';
import newContext from '../Context/context.js';
import Footer from './Footer';

describe('Footer component', () => {
  test("Vérification que le texte de Copyright s'affiche, mais pas le link quand isLoggedIn est false.", () => {
    render(
      <newContext.Provider value={{ user: { isLoggedIn: false } }}>
        <Footer />
      </newContext.Provider>
    );
    const footerp = screen.getByText(/Copyright \d{4} - holberton School/i);
    expect(footerp).toBeInTheDocument();

    const footerLink = screen.queryByRole('link', { name: /Contact us/i });
    expect(footerLink).not.toBeInTheDocument();
  });

  test("Vérification que le texte de Copyright et le link s'affichent quand isLoggedIn est true.", () => {
    render(
      <newContext.Provider value={{ user: { isLoggedIn: true } }}>
        <Footer />
      </newContext.Provider>
    );
    const footerp = screen.getByText(/Copyright \d{4} - holberton School/i);
    expect(footerp).toBeInTheDocument();

    const footerLink = screen.queryByRole('link', { name: /Contact us/i });
    expect(footerLink).toBeInTheDocument();
  });
});
