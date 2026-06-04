import { render, screen } from '@testing-library/react';
import CourseListRow from './CourseListRow';

describe('CourseListRow component', () => {
  test('renders one columnheader with colspan=2 when isHeader=true and textSecondCell=null', () => {
    render(
      <table><tbody>
        <CourseListRow isHeader={true} textFirstCell="Available courses" />
      </tbody></table>
    );
    const th = screen.getByRole('columnheader');
    expect(th).toHaveAttribute('colspan', '2');
  });

  test('renders two th cells when isHeader=true and textSecondCell is not null', () => {
    render(
      <table><tbody>
        <CourseListRow isHeader={true} textFirstCell="Course name" textSecondCell="Credit" />
      </tbody></table>
    );
    const headers = screen.getAllByRole('columnheader');
    expect(headers).toHaveLength(2);
  });

  test('renders two td elements within a tr when isHeader=false', () => {
    render(
      <table><tbody>
        <CourseListRow textFirstCell="ES6" textSecondCell="60" />
      </tbody></table>
    );
    const cells = screen.getAllByRole('cell');
    expect(cells).toHaveLength(2);
  });
});