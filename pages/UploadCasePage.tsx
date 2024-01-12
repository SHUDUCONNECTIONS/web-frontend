// Import React and other necessary libraries
import React, { useState, ChangeEvent, useRef } from 'react';
import styles from '../styles/UploadCasePage.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

import { useEffect } from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "./firebaseConfig/config";
import { v4 } from 'uuid';

function UploadCasePage () {
  const [caseNumber, setCaseNumber] = useState('');
  const [caseType, setCaseType] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string[]>([]);
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

  const storageListRef = ref(storage, `cases/`);
  const handleUpload = () => {
    if (!selectedFile) {
      alert('Please select a file to upload.');
      return;
    }else {
      const storageRef = ref(storage, `cases/${caseNumber}/${selectedFile.name + v4()}`);
      uploadBytes(storageRef, selectedFile)
        .then((snapshot) => {
          getDownloadURL(snapshot.ref)
            .then((url) => {
              setFileUrl((prev) => [...prev, url]);
            })
            .then(() => { // Move alert and clear state here
              alert('file uploaded');
              setCaseNumber("");
              setCaseType("");
              setSelectedFile(null);
            });
        });
    }
   
  };

  useEffect(() => {
    listAll(storageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setFileUrl((prev) => [...prev, url]);
          
        });
      });
    });
  }, []);

  
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Upload Case File</h1>
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
          placeholder="Enter Case Number"
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
          placeholder="Enter Case Type"
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
            <FontAwesomeIcon icon={faUpload} className={styles.uploadIcon} />&nbsp;
            Select File
          </button>
          <div className="filename">{selectedFile && selectedFile.name}</div>
        </div>
        <div></div>
        <button onClick={handleUpload} className={styles.button}>
          Upload Case
        </button>{fileUrl.map((url) => {
        return url ;
      })}
  
      </div>
    </div>
  );
};

export default UploadCasePage;

