import { render, screen } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  test('Vérification texte h1 holberton-header', () => {
    render(<App />);
    const headerh1 = screen.getByRole('heading', { level: 1, name: /School dashboard/i });
    expect(headerh1).toBeInTheDocument();
  });

  test('Vérification texte holberton-body', () => {
    render(<App />);
    const bodyp = screen.getByText(/Login to access the full dashboard/i);
    expect(bodyp).toBeInTheDocument();
  });

  test('Vérification texte holberton-footer', () => {
    render(<App />);
    const footerp = screen.getByText(/Copyright \d{4} - holberton School/i);
    expect(footerp).toBeInTheDocument();
  });

  test('Vérification alt image holberton-header', () => {
    render(<App />);
    const headerImgAlt = screen.getByAltText(/holberton logo/i);
    expect(headerImgAlt).toBeInTheDocument();
  });
});