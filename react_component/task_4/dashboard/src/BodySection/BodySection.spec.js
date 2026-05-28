import { render, screen } from '@testing-library/react';
import BodySection from './BodySection';

describe('BodySection component', () => {
  test('renders the heading with the title prop', () => {
    render(<BodySection title="test title" />);
    expect(screen.getByRole('heading', { level: 2, name: /test title/i })).toBeInTheDocument();
  });

  test('renders children passed to it', () => {
    render(
      <BodySection title="test">
        <p>child paragraph</p>
        <p>another child</p>
      </BodySection>
    );
    expect(screen.getByText('child paragraph')).toBeInTheDocument();
    expect(screen.getByText('another child')).toBeInTheDocument();
  });
});