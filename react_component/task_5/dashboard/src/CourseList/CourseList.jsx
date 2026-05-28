import WithLogging from '../HOC/WithLogging';
import CourseListRow from './CourseListRow';
import './CourseList.css';

function CourseList({ courses = [] }) {
  return (
    <table id="CourseList">
      <thead>
        <CourseListRow textFirstCell="Available courses" isHeader={true} />
        <CourseListRow textFirstCell="Course name" textSecondCell="Credit" isHeader={true} />
      </thead>
      <tbody>
        {courses.length === 0 ? (
          <CourseListRow textFirstCell="No course available yet" isHeader={false} />
        ) : (
          courses.map((course) => (
            <CourseListRow
              key={course.id}
              textFirstCell={course.name}
              textSecondCell={String(course.credit)}
              isHeader={false}
            />
          ))
        )}
      </tbody>
    </table>
  );
}

export default WithLogging(CourseList);