function CourseListRow({ isHeader = false, textFirstCell = '', textSecondCell = null }) {
  if (isHeader) {
    if (textSecondCell === null) {
      return (
        <tr className="bg-(--color-table-header) opacity-65">
          <th colSpan={2} className="border border-gray-400 pl-2">{textFirstCell}</th>
        </tr>
      );
    }
    return (
      <tr className="bg-(--color-table-header) opacity-65">
        <th className="border border-gray-400 pl-2">{textFirstCell}</th>
        <th className="border border-gray-400 pl-2">{textSecondCell}</th>
      </tr>
    );
  }
  return (
    <tr className="bg-(--color-table-rows) opacity-45">
      <td className="border border-gray-400 pl-2">{textFirstCell}</td>
      <td className="border border-gray-400 pl-2">{textSecondCell}</td>
    </tr>
  );
}

export default CourseListRow;