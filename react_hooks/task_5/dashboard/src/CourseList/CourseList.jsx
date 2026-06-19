import CourseListRow from "./CourseListRow";
import WithLogging from "../HOC/WithLogging";

function CourseList({ courses = [] }) {
  return(
    <div className="w-4/5 mx-auto py-20" id="CourseListContainer">
      <table className="w-full border-collapse" id="CourseList">
        {courses.length === 0 ? <tbody><CourseListRow isHeader={ true } textFirstCell='No course available yet' /></tbody>:
        <>
          <thead>
            <CourseListRow isHeader={ true } textFirstCell='Available courses' />
            <CourseListRow isHeader={ true } textFirstCell='Course name'  textSecondCell='Credit' />
          </thead>
          <tbody>
            {courses.map((course) => (
              <CourseListRow key={course.id} textFirstCell={course.name} textSecondCell={course.credit} />
            ))}
          </tbody>
        </>
        }
      </table>
    </div>
  )
}

const CourseListWithLogging = WithLogging(CourseList)

export default CourseListWithLogging;
