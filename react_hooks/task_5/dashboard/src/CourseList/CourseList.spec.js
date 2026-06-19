import CourseList from './CourseList';
import { render, screen, within } from '@testing-library/react';

// Déclaration de coursesList
const coursesList = [
  { id: 1, name: 'ES6', credit: '60'},
  { id: 2, name: 'Webpack', credit: '20'},
  { id: 3, name: 'React', credit: '40'}
]

describe('CourseList component', () => {
  test("Vérification qu'il n'y ait qu'une ligne quand le tableau est vide (Default case)", () => {
    render(<CourseList />);
    const tableElement = screen.getByRole('table');
    expect(tableElement).toBeInTheDocument();
    const rowElements = within(tableElement).getAllByRole('row');
    expect(rowElements).toHaveLength(1);
  });

  test("Vérification qu'il y ait bien 5 lignes quand le tableau contient les valeurs attendues", () => {
    render(<CourseList courses={coursesList}/>);
    const tableElement = screen.getByRole('table');
    expect(tableElement).toBeInTheDocument();
    const rowElements = within(tableElement).getAllByRole('row');
    expect(rowElements).toHaveLength(5);
  });
});
