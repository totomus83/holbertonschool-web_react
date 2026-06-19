import React from 'react';
import WithLogging from './WithLogging';
import { render, screen, cleanup } from '@testing-library/react';

class MockApp extends React.Component {
  render () {
    return (
      <h1>
        Hello from Mock App Component
      </h1>
    )
  }
}

const MockAppWrapped = WithLogging(MockApp);

describe('WithLogging component', () => {
  afterEach( () => {
    cleanup();
  })

  test("Vérification que le HOC renvoie un élément h1 avec le texte : 'Hello from Mock App Component'.", () => {
    render(<MockAppWrapped />);
    const MockAppHeading = screen.getByRole('heading', { level: 1, name: /Hello from Mock App Component/i });
    expect(MockAppHeading).toBeInTheDocument();
  });
});
