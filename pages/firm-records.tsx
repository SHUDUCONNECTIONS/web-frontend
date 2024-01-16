import React, { useState, useEffect, useRef } from 'react';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../styles/firm-records.module.css';

import { client } from './services/graphql.service';
import { GetFiles } from '../graphql/filesRecords';

interface File {
  id: number;
  caseNumber: string;
  caseType: string;
  url: string;
  mimeType: string;
  dateUploaded: string;
}

const CaseFiles = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await client.query({
          query: GetFiles,
          variables: { userId: "1" },
        });

        const values = response.data.getFiles;
        setFiles(values);
       console.log('Files', files.id)
        
      } catch (error) {
        console.log( 'Error...');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  
  const handleDelete = (id: number) => {
    const updatedFiles = files?.filter((file) => file.id !== id);
    
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
            {files?.map((file) => (
              <tr key={file?.id}>
                <td>{file?.id}</td>
                <td>{file?.caseNumber}</td>
                <td>{file?.mimeType}</td>
                <td>
                  <a href={`#`} download={`${file.caseNumber}.${file.mimeType.toLowerCase()}`}>
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