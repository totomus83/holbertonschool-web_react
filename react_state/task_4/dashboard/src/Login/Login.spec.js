test('logIn is called with email and password when form is submitted', () => {
  const logIn = jest.fn();
  render(<Login logIn={logIn} />);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const formButton = screen.getByRole('button', { name: /OK/i });

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });
  fireEvent.click(formButton);

  expect(logIn).toHaveBeenCalledWith('test@example.com', 'password123');
});