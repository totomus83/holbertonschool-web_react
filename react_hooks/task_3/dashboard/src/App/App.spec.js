test('clicking a notification item removes it and logs the message', () => {
  const consoleSpy = jest.spyOn(console, 'log');
  render(<App />);

  const notifTitle = screen.getByText(/Your notifications/i);
  fireEvent.click(notifTitle);

  const items = screen.getAllByRole('listitem');
  const initialCount = items.length;

  fireEvent.click(items[0]);

  expect(consoleSpy).toHaveBeenCalledWith('Notification 1 has been marked as read');
  expect(screen.getAllByRole('listitem')).toHaveLength(initialCount - 1);

  consoleSpy.mockRestore();
});