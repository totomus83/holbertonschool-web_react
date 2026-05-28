import { render, screen } from '@testing-library/react';
import CourseList from './CourseList';

const courses = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 },
];

describe('CourseList component', () => {
  test('renders 5 rows when courses array is provided', () => {
    render(<CourseList courses={courses} />);
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(5);
  });

  test('renders 1 row when courses array is empty', () => {
    render(<CourseList courses={[]} />);
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(3);
  });
});