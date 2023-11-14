// Import React and other necessary libraries
import React, { useState } from 'react';
import styles from '../styles/UploadCasePage.module.css';

const UploadCasePage = () => {
  const [caseNumber, setCaseNumber] = useState('');
  const [caseType, setCaseType] = useState('');

  const handleCaseNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCaseNumber(event.target.value);
  };

  const handleCaseTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCaseType(event.target.value);
  };

  const handleUpload = () => {
    // Implement your logic for handling case upload
    console.log(`Uploading case with case number: ${caseNumber} and case type: ${caseType}`);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Upload Case</h1>
      <div className={styles.form}>
        <label htmlFor="caseNumber" className={styles.label}>
          Case Number:
        </label>
        <input
          type="text"
          id="caseNumber"
          value={caseNumber}
          onChange={handleCaseNumberChange}
          className={styles.input}
        />

        <label htmlFor="caseType" className={styles.label}>
          Case Type:
        </label>
        <input
          type="text"
          id="caseType"
          value={caseType}
          onChange={handleCaseTypeChange}
          className={styles.input}
        />

        <button onClick={handleUpload} className={styles.button}>
          Upload Case
        </button>
      </div>
    </div>
  );
};

export default UploadCasePage;
