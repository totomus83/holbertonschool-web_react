interface Teacher {
  readonly firstName: string;
  readonly lastName: string;
  fullTimeEmployee: boolean;
  //optional
  yearsOfExperience?: number;
  location: string;
  [key: string]: any; // Allows additional dynamic properties
}

interface Directors extends Teacher {
  numberOfReports: number;
}

const teachers: Teacher[] = [
  {
    firstName: 'John',
    lastName: 'Doe',
    fullTimeEmployee: false,
    location: 'London',
    contract: false,
  },
  {
    firstName: 'Mary',
    lastName: 'Smith',
    fullTimeEmployee: true,
    yearsOfExperience: 5,
    location: 'Paris',
  },
];

const directors: Directors[] = [
{
  firstName: 'John',
  lastName: 'Doe',
  location: 'London',
  fullTimeEmployee: true,
  numberOfReports: 17,
},
{
  firstName: 'Tom',
  lastName: 'Doe',
  location: 'London',
  fullTimeEmployee: true,
  numberOfReports: 17,
},
];

document.addEventListener('DOMContentLoaded', () => {
  const table: HTMLTableElement = document.createElement('table');
  const thead: HTMLTableSectionElement = document.createElement('thead');
  const tbody: HTMLTableSectionElement = document.createElement('tbody');

  // Create header row
  const headerRow: HTMLTableRowElement = document.createElement('tr');
  ['First Name', 'Last Name', 'Location', 'Full Time Employee', 'Years of Experience', 'numberOfReports'].forEach(text => {
    const th: HTMLTableCellElement = document.createElement('th');
    th.textContent = text;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);

  // Add teacher rows
  teachers.forEach((teacher: Teacher) => {
    const row: HTMLTableRowElement = document.createElement('tr');


    const firstNameCell: HTMLTableCellElement = document.createElement('td');
    firstNameCell.textContent = teacher.firstName;
    row.appendChild(firstNameCell);


    const lastNameCell: HTMLTableCellElement = document.createElement('td');
    lastNameCell.textContent = teacher.lastName;
    row.appendChild(lastNameCell);


    const locationCell: HTMLTableCellElement = document.createElement('td');
    locationCell.textContent = teacher.location;
    row.appendChild(locationCell);


    const fullTimeEmployeeCell: HTMLTableCellElement = document.createElement('td');
    fullTimeEmployeeCell.textContent = teacher.fullTimeEmployee.toString();
    row.appendChild(fullTimeEmployeeCell);


    const yearsOfExperienceCell: HTMLTableCellElement = document.createElement('td');
    yearsOfExperienceCell.textContent = teacher.yearsOfExperience?.toString() ?? "N/A";
    row.appendChild(yearsOfExperienceCell);
   
    const numberOfReportsCell: HTMLTableCellElement = document.createElement('td');
    numberOfReportsCell.textContent = "";
    row.appendChild(numberOfReportsCell);


    tbody.appendChild(row);
  });

  directors.forEach((director: Directors) => {
    const row: HTMLTableRowElement = document.createElement('tr');

    const firstNameCell: HTMLTableCellElement = document.createElement('td');
    firstNameCell.textContent = director.firstName;
    row.appendChild(firstNameCell);

    const lastNameCell: HTMLTableCellElement = document.createElement('td');
    lastNameCell.textContent = director.lastName;
    row.appendChild(lastNameCell);

    const locationCell: HTMLTableCellElement = document.createElement('td');
    locationCell.textContent = director.location;
    row.appendChild(locationCell);

    const fullTimeEmployeeCell: HTMLTableCellElement = document.createElement('td');
    fullTimeEmployeeCell.textContent = director.fullTimeEmployee.toString();
    row.appendChild(fullTimeEmployeeCell);

    const yearsOfExperienceCell: HTMLTableCellElement = document.createElement('td');
    yearsOfExperienceCell.textContent = director.yearsOfExperience?.toString() ?? "N/A";
    row.appendChild(yearsOfExperienceCell);

    const numberOfReports: HTMLTableCellElement = document.createElement('td');
    numberOfReports.textContent = director.numberOfReports?.toString();
    row.appendChild(numberOfReports);

    tbody.appendChild(row);
    console.log('Rendering director:', director);
  });

  table.appendChild(thead);
  table.appendChild(tbody);
  document.body.appendChild(table);
});
