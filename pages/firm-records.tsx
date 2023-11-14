// FirmRecordsPage.tsx

import { useState } from 'react';
import styles from '../styles/FirmRecordsPage.module.css';

interface FirmRecord {
  id: number;
  caseFile: string;
  fileType: string;
}

const FirmRecordsPage = () => {
  const [firmRecords, setFirmRecords] = useState<FirmRecord[]>([
    { id: 1, caseFile: 'Case 001', fileType: 'Legal Document' },
    { id: 2, caseFile: 'Case 002', fileType: 'Contracts' },
    { id: 3, caseFile: 'Case 003', fileType: 'Agreements' },
    // Add more firm records as needed
  ]);

  const handleViewDocument = (recordId: number) => {
    // Implement logic to view the document
    console.log(`View document for Firm Record ${recordId}`);
  };

  const handleUpdate = (recordId: number) => {
    // Implement logic to update the record
    console.log(`Update Firm Record ${recordId}`);
  };

  const handleDelete = (recordId: number) => {
    // Implement logic to delete the record
    console.log(`Delete Firm Record ${recordId}`);
    setFirmRecords((prevRecords) => prevRecords.filter((record) => record.id !== recordId));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Firm Records</h1>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tableHeader}>
            <th className={styles.tableCell}>ID</th>
            <th className={styles.tableCell}>Case File</th>
            <th className={styles.tableCell}>File Type</th>
            <th className={styles.tableCell}>View Document</th>
            <th className={styles.tableCell}>Update</th>
            <th className={styles.tableCell}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {firmRecords.map((record) => (
            <tr key={record.id}>
              <td className={styles.tableCell}>{record.id}</td>
              <td className={styles.tableCell}>{record.caseFile}</td>
              <td className={styles.tableCell}>{record.fileType}</td>
              <td className={styles.tableCell}>
                <button className={styles.buttonStyle} onClick={() => handleViewDocument(record.id)}>
                  View Document
                </button>
              </td>
              <td className={styles.tableCell}>
                <button className={styles.buttonStyle} onClick={() => handleUpdate(record.id)}>
                  Update
                </button>
              </td>
              <td className={styles.tableCell}>
                <button className={styles.buttonStyle} onClick={() => handleDelete(record.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FirmRecordsPage;
