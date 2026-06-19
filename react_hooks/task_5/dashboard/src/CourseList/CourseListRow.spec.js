import CourseListRow from './CourseListRow';
import { render, screen, within } from '@testing-library/react';

describe('CourseListRow component', () => {
  test("Vérification de la présence des td dans le tr quand isHeader est false (Default case)", () => {
    render(<CourseListRow />);
    const trElement = screen.getByRole('row');
    expect(trElement).toBeInTheDocument();
    const tdElements = within(trElement).getAllByRole('cell');
    expect(tdElements).toHaveLength(2);
  });

  test("Vérification de la présence des th dans le tr quand isHeader est true et textSecondCell non Null", () => {
    render(<CourseListRow isHeader={ true } textFirstCell='Fallen of Albaz' textSecondCell='Dragon / Effect'/>);
    const trElement = screen.getByRole('row');
    expect(trElement).toBeInTheDocument();
    const tdElements = within(trElement).getAllByRole('columnheader');
    expect(tdElements).toHaveLength(2);
  });

  test("Vérification de la présence d'un th dans le tr quand isHeader est true et textSecondCell est Null", () => {
    render(<CourseListRow isHeader={ true } textFirstCell='Fallen of Albaz' textSecondCell={ null }/>);
    const trElement = screen.getByRole('row');
    expect(trElement).toBeInTheDocument();
    const tdElements = within(trElement).getByRole('columnheader');
    expect(tdElements).toHaveAttribute('colspan', '2');
  });
});
