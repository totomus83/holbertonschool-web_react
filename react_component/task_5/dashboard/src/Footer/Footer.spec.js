import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer component', () => {
  test('Vérification texte App-footer', () => {
    render(<Footer />);
    const footerp = screen.getByText(/Copyright \d{4} - holberton School/i);
    expect(footerp).toBeInTheDocument();
  });
});