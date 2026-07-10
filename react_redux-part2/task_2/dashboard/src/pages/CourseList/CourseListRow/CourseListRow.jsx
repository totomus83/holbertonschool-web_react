import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  headerRow: {
    backgroundColor: '#deb5b545'
  },
  row: {
    backgroundColor: '#f5f5f5ab'
  },
  selectedRow: {
    backgroundColor: '#e6e4e4ab'
  }
});

export default function CourseListRow({
  isHeader = false,
  textFirstCell = '',
  textSecondCell = null,
  id,
  isSelected = false,
  changeRow = () => {},
}) {
  const rowStyle = isHeader ? styles.headerRow : isSelected ? styles.selectedRow : styles.row;

  return (
    isHeader ? (
      <tr className={css(rowStyle)}>
        <th colSpan={textSecondCell ? 1 : 2}>{textFirstCell}</th>
        {textSecondCell ? <th>{textSecondCell}</th> : null}
      </tr>
    ) : (
      <tr className={css(rowStyle)}>
        <td>
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => changeRow(id, e.target.checked)}
          />
        </td>
        <td>{textFirstCell}</td>
        <td>{textSecondCell}</td>
      </tr>
    )
  );
}