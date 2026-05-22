import { render, screen } from '@testing-library/react';
import Header from './Header';

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
});