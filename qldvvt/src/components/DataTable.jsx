import React from 'react';
import styles from './DataTable.module.css'; // Import đúng cách với CSS Modules

const DataTable = ({ tableName, tableDataArray }) => {
  if (!tableDataArray.length) return <p>Không có dữ liệu</p>;

  const headers = Object.keys(tableDataArray[0]);

  return (
    <div className={styles["table-container"]}>
      <h3 className={styles["table-title"]}>{tableName}</h3>
      <div className={styles["table-wrapper"]}>
        <table className={styles["data-table"]}>
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableDataArray.map((record, idx) => (
              <tr key={idx}>
                {headers.map((header) => (
                  <td key={header}>
                    {record[header] !== null ? record[header].toString() : ''}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
