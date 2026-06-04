import WithLogging from '../HOC/WithLogging';
import CourseListRow from './CourseListRow';

function CourseList({ courses = [] }) {
  return (
    <div className="w-4/5 mx-auto my-4">
      <table id="CourseList" className="w-full">
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
    </div>
  );
}

export default WithLogging(CourseList);