import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import Login from './Login';

describe('App component', () => {
  test('Vérification texte App-body', () => {
    render(<Login />);
    const bodyp = screen.getByText(/Login to access the full dashboard/i);
    expect(bodyp).toBeInTheDocument();
  });

  test('Vérification des inputs associés aux labels', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  test('Vérification du texte des labels', () => {
    render(<Login />);
    const emailLabel = screen.getByLabelText(/email/i);
    const passwordLabel = screen.getByLabelText(/password/i);
    expect(emailLabel).toBeInTheDocument();
    expect(passwordLabel).toBeInTheDocument();
  });

  test('Vérification de la présence du bouton', () => {
    render(<Login />);
    const formButton = screen.getByRole('button', { name: /OK/i });
    expect(formButton).toBeInTheDocument();
  });

  test("Vérification du focus sur l'imput associé au label sélectionné", async () => {
    render(<Login />);
    const user = userEvent.setup();

    const emailLabel = screen.getByText(/email/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordLabel = screen.getByText(/password/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.click(emailLabel);
    expect(emailInput).toHaveFocus();

    await user.click(passwordLabel);
    expect(passwordInput).toHaveFocus();
  });

  test('Vérification que le bouton soit désactivé par défaut', () => {
    render(<Login />);
    const formButton = screen.getByRole('button', { name: /OK/i });
    expect(formButton).toBeDisabled();
  });

  test("Vérification que le bouton soit désactivé quand l'email est invalide", async () => {
      render(<Login />);
      const user = userEvent.setup();
      // Déclaration des différentes valeurs invalides
      const invalidEmails = [
        'Raidraptors',
        'fallen@',
        'fallen@albaz',
        'hakuyoku.Ciel@.c',
        '@gmail.com'
      ]
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const formButton = screen.getByRole('button', { name: /OK/i });

      await user.type(passwordInput, 'Azertyuiop');

      for (const invalidEmail of invalidEmails) {
        await user.clear(emailInput);
        await user.type(emailInput, invalidEmail);
        expect(formButton).toBeDisabled();
      }

      await user.clear(emailInput);
      await user.type(emailInput, 'fallen.albaz@gmail.com');
      expect(formButton).toBeEnabled();
    });

    test("Vérification que le bouton soit désactivé quand le password fait moins de 8 caractères", async () => {
      render(<Login />);
      const user = userEvent.setup();

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const formButton = screen.getByRole('button', { name: /OK/i });

      await user.type(emailInput, 'fallen.albaz@gmail.com');
      // Test avec 7 caractères
      await user.type(passwordInput, 'Azertyu');
      expect(formButton).toBeDisabled();

      // On rajoute 3 caractères, ce qui fait un total de 10 caractères.
      await user.type(passwordInput, 'iop');
      expect(formButton).toBeEnabled();
    });

  test('Vérification que le bouton soit activé quand les champs sont correctement remplis', async () => {
    render(<Login />);
    const user = userEvent.setup();

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.type(emailInput, 'fallen.albaz@gmail.com');
    await user.type(passwordInput, 'Azertyuiop');

    const formButton = screen.getByRole('button', { name: /OK/i });
    expect(formButton).toBeEnabled();
  });

  test('Vérification que la méthode props logIn est bien appelée quand le bouton est cliqué', async () => {
    const logInSpy = jest.fn();
    render(<Login logIn={logInSpy} />);

    // Simumation de la connexion
    const user = userEvent.setup();

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.type(emailInput, 'fallen.albaz@gmail.com');
    await user.type(passwordInput, 'Azertyuiop');

    const formButton = screen.getByRole('button', { name: /OK/i });
    await user.click(formButton);

    expect(logInSpy).toHaveBeenCalledTimes(1);
    expect(logInSpy).toHaveBeenCalledWith('fallen.albaz@gmail.com', 'Azertyuiop');
  });
});