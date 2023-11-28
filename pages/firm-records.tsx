import React, { useState } from 'react';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../styles/firm-records.module.css'; // Adjusted import path

interface File {
  id: number;
  name: string;
  type: string;
  dateUploaded: string;
}

const CaseFiles = () => {
  const [files, setFiles] = useState<File[]>([
    {
      id: 1,
      name: 'Case file 1',
      type: 'PDF',
      dateUploaded: '2023-11-28', // Example date uploaded
    },
    {
      id: 2,
      name: 'Case file 2',
      type: 'DOCX',
      dateUploaded: '2023-11-27', // Example date uploaded
    },
    {
      id: 3,
      name: 'Case file 3',
      type: 'XLSX',
      dateUploaded: '2023-11-26', // Example date uploaded
    },
  ]);

  const handleDelete = (id: number) => {
    const updatedFiles = files.filter((file) => file.id !== id);
    setFiles(updatedFiles);
  };

  return (
    <div className={styles.container}>
      <div id="case-files" className={styles.caseTitle}>
        <span>
          <h2>Case files</h2>
        </span>
        
        <table className={styles.caseTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Case File</th>
              <th>File Type</th>
              <th>Download</th>
              <th>Date Uploaded</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <tr key={file.id}>
                <td>{file.id}</td>
                <td>{file.name}</td>
                <td>{file.type}</td>
                <td>
                  <a href={`#`} download={`${file.name}.${file.type.toLowerCase()}`}>
                  <FontAwesomeIcon icon={faDownload} />
                    
                  </a>
                </td>
                <td>{file.dateUploaded}</td>
                <td>
                  <button onClick={() => handleDelete(file.id)} className={styles.deleteButton}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CaseFiles;
