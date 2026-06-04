import { render, screen } from '@testing-library/react';
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom';
import BodySection from './BodySection';

describe('BodySectionWithMarginBottom component', () => {
  test('renders a div with class bodySectionWithMargin', () => {
    const { container } = render(<BodySectionWithMarginBottom title="test" />);
    expect(container.firstChild).toHaveClass('bodySectionWithMargin');
  });

  test('renders the BodySection component', () => {
    render(<BodySectionWithMarginBottom title="test title"><p>child</p></BodySectionWithMarginBottom>);
    expect(screen.getByRole('heading', { level: 2, name: /test title/i })).toBeInTheDocument();
    expect(screen.getByText('child')).toBeInTheDocument();
  });
});