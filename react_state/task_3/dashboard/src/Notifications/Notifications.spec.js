test('clicking on "Your notifications" calls handleDisplayDrawer', () => {
  const handleDisplayDrawer = jest.fn();
  render(
    <Notifications
      notifications={notificationsList}
      displayDrawer={false}
      handleDisplayDrawer={handleDisplayDrawer}
    />
  );
  const title = screen.getByText(/Your notifications/i);
  fireEvent.click(title);
  expect(handleDisplayDrawer).toHaveBeenCalledTimes(1);
});

test('clicking on the close button calls handleHideDrawer', () => {
  const handleHideDrawer = jest.fn();
  render(
    <Notifications
      notifications={notificationsList}
      displayDrawer={true}
      handleHideDrawer={handleHideDrawer}
    />
  );
  const closeButton = screen.getByRole('button');
  fireEvent.click(closeButton);
  expect(handleHideDrawer).toHaveBeenCalledTimes(1);
});