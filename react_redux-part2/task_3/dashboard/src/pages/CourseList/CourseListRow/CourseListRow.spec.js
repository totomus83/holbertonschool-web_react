import { render, screen, within, fireEvent } from '@testing-library/react';
import CourseListRow from './CourseListRow';

test('renders as header with one cell spanning two columns', () => {
  render(
    <table>
      <tbody>
        <CourseListRow isHeader={true} textFirstCell="First" textSecondCell={null} />
      </tbody>
    </table>
  );

  const thElement = screen.getByRole('columnheader');
  expect(thElement).toHaveAttribute('colSpan', '2');
});

test('renders as header with two cells', () => {
  render(
    <table>
      <tbody>
        <CourseListRow isHeader={true} textFirstCell="First" textSecondCell="Second" />
      </tbody>
    </table>
  );

  const thElements = screen.getAllByRole('columnheader');
  expect(thElements).toHaveLength(2);
  expect(thElements[0]).toHaveTextContent('First');
  expect(thElements[1]).toHaveTextContent('Second');
});

test('renders as a regular row with two cells', () => {
  render(
    <table>
      <tbody>
        <CourseListRow isHeader={false} textFirstCell="Data1" textSecondCell="Data2" />
      </tbody>
    </table>
  );

  const trElement = screen.getByRole('row');
  const tdElements = within(trElement).getAllByRole('cell');
  expect(tdElements).toHaveLength(3);
});
test('calls changeRow with correct id and checked value when checkbox is changed', () => {
  const changeRow = jest.fn();
  render(
    <table>
      <tbody>
        <CourseListRow
          isHeader={false}
          textFirstCell="Data1"
          textSecondCell="Data2"
          id="1"
          changeRow={changeRow}
        />
      </tbody>
    </table>
  );
  const checkbox = screen.getByRole('checkbox');
  fireEvent.click(checkbox);
  expect(changeRow).toHaveBeenCalledWith('1', true);
});
