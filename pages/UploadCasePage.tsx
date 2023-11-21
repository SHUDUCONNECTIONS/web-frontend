// Import React and other necessary libraries
import React, { useState, ChangeEvent, useRef } from 'react';
import styles from '../styles/UploadCasePage.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

const UploadCasePage = () => {
  const [caseNumber, setCaseNumber] = useState('');
  const [caseType, setCaseType] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCaseNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCaseNumber(event.target.value);
  };

  const handleCaseTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCaseType(event.target.value);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleUploadButtonClick = () => {
    // Trigger the file input click
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleUpload = () => {
    // Implement your logic for handling case upload, including the selected file
    console.log(`Uploading case with case number: ${caseNumber}, case type: ${caseType}, and file: ${selectedFile?.name}`);
    // Additional logic to handle file upload can be implemented here
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

        <label htmlFor="file" className={styles.label}>
          File:
        </label>
        <div className={styles.fileInputContainer}>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            className={styles.fileInput}
            ref={fileInputRef}
          />
          <button onClick={handleUploadButtonClick} className={styles.button}>
            <FontAwesomeIcon icon={faUpload} className={styles.uploadIcon} />
            Select File
          </button>
        </div>

        <button onClick={handleUpload} className={styles.button}>
          Upload Case
        </button>
      </div>
    </div>
  );
};

export default UploadCasePage;
