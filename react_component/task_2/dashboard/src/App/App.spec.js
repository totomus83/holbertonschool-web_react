import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  test('Vérification texte h1 App-header', () => {
    render(<App />);
    const headerh1 = screen.getByRole('heading', { level: 1, name: /School dashboard/i });
    expect(headerh1).toBeInTheDocument();
  });

  test('Vérification texte App-body', () => {
    render(<App />);
    const bodyp = screen.getByText(/Login to access the full dashboard/i);
    expect(bodyp).toBeInTheDocument();
  });

  test('Vérification texte App-footer', () => {
    render(<App />);
    const footerp = screen.getByText(/Copyright \d{4} - holberton School/i);
    expect(footerp).toBeInTheDocument();
  });

  test('Vérification alt image App-header', () => {
    render(<App />);
    const headerImgAlt = screen.getByAltText(/holberton logo/i);
    expect(headerImgAlt).toBeInTheDocument();
  });

  test('Vérification des inputs associés aux labels', () => {
    render(<App />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  test('Vérification du texte des labels', () => {
    render(<App />);
    const emailLabel = screen.getByLabelText(/email/i);
    const passwordLabel = screen.getByLabelText(/password/i);
    expect(emailLabel).toBeInTheDocument();
    expect(passwordLabel).toBeInTheDocument();
  });

  test('Vérification du bouton', () => {
    render(<App />);
    const formButton = screen.getByRole('button', { name: /OK/i });
    expect(formButton).toBeInTheDocument();
  });

  test('renders Login when isLoggedIn is false', () => {
    render(<App isLoggedIn={false} />);
    expect(screen.getByText(/Login to access the full dashboard/i)).toBeInTheDocument();
  });

  test('renders CourseList when isLoggedIn is true', () => {
    render(<App isLoggedIn={true} />);
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  test('logOut is called when Ctrl+H is pressed', () => {
    const logOut = jest.fn();
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    render(<App logOut={logOut} />);
    fireEvent.keyDown(window, { key: 'h', ctrlKey: true });
    expect(logOut).toHaveBeenCalledTimes(1);
    alertMock.mockRestore();
  });

  test('alert is called with "Logging you out" when Ctrl+H is pressed', () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    render(<App />);
    fireEvent.keyDown(window, { key: 'h', ctrlKey: true });
    expect(alertMock).toHaveBeenCalledWith('Logging you out');
    alertMock.mockRestore();
  });
});