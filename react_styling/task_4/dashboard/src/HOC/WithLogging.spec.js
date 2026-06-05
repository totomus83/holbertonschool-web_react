import React from 'react';
import { render, cleanup } from '@testing-library/react';
import WithLogging from './WithLogging';

class MockApp extends React.Component {
  render() {
    return (
      <h1>Hello from Mock App Component</h1>
    );
  }
}

const MockAppWithLogging = WithLogging(MockApp);

describe('WithLogging HOC', () => {
  afterEach(() => {
    cleanup();
  });

  test('renders the wrapped component correctly', () => {
    const { getByRole } = render(<MockAppWithLogging />);
    expect(getByRole('heading', { level: 1, name: /Hello from Mock App Component/i })).toBeInTheDocument();
  });

  test('logs mounted message on componentDidMount', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    render(<MockAppWithLogging />);
    expect(consoleSpy).toHaveBeenCalledWith('Component MockApp is mounted');
    consoleSpy.mockRestore();
  });

  test('logs unmount message on componentWillUnmount', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const { unmount } = render(<MockAppWithLogging />);
    unmount();
    expect(consoleSpy).toHaveBeenCalledWith('Component MockApp is going to unmount');
    consoleSpy.mockRestore();
  });

  test('displayName is set correctly', () => {
    expect(MockAppWithLogging.displayName).toBe('WithLogging(MockApp)');
  });
});