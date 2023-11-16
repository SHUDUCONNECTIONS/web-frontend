import React, { useState } from 'react';
import styles from '../styles/firm-records.module.css'; // Adjusted import path

interface FirmRecord {
  id: number;
  caseFile: string;
  fileType: string;
}

const FirmRecordsPage: React.FC = () => {
  const [firmRecords, setFirmRecords] = useState<FirmRecord[]>([
    { id: 1, caseFile: 'Pick up request', fileType: 'PDF' },
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
    <div className={styles.wrapper}>
      <h1 className={styles.card_title}>Firm Records</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Case File</th>
            <th>File Type</th>
            <th>View Document</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {firmRecords.map((record) => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{record.caseFile}</td>
              <td>{record.fileType}</td>
              <td>
                <button className={styles.buttonStyle} onClick={() => handleViewDocument(record.id)}>
                  View Document
                </button>
              </td>
              <td>
                <button className={styles.buttonStyle} onClick={() => handleUpdate(record.id)}>
                  Update
                </button>
              </td>
              <td>
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
