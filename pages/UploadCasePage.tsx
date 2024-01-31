import React, { useState, ChangeEvent, useRef } from 'react';
import styles from '../styles/UploadCasePage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebaseConfig/config';
import { v4 } from 'uuid';
import { client } from './services/graphql.service';
import { UploadFile } from '../graphql/uploadFile';

function UploadCasePage() {
  const [caseNumber, setCaseNumber] = useState('');
  const [caseType, setCaseType] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false); 
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
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleUpload = async () => {
    if (loading) {
      return; 
    }

    if (!selectedFile) {
      alert('Please select a file to upload.');
      return;
    }

    try {
      setLoading(true);

      const storageRef = ref(storage, `cases/${caseNumber}/${selectedFile.name + v4()}`);
      await uploadBytes(storageRef, selectedFile);

      const url = await getDownloadURL(storageRef);

      console.log('File uploaded to Firebase:', url);

      try {
        const response = await client.mutate({
          mutation: UploadFile,
          variables: {
            caseNumber,
            caseType,
            file: {
              mimeType: selectedFile.type || 'application/pdf',
              size: selectedFile.size,
              url,
            },
          },
        });

        console.log('GraphQL Response:', response);

        if (response.data.uploadFile.errors && response.data.uploadFile.errors.length > 0) {
          const graphqlErrors: { field: string; message: string }[] = response.data.uploadFile.errors;
          console.error('Error uploading data to the database:', graphqlErrors);

          const errorMessage = graphqlErrors.map((error) => error.message).join(', ');
          alert(`Error uploading data to the database: ${errorMessage}`);
        } else {
          console.log('Data uploaded to the database:', response.data.uploadFile.file);

          setCaseNumber('');
          setCaseType('');
          setSelectedFile(null);

          alert('File and data uploaded successfully!');
        }
      } catch (error: any) {
        console.error('Error in GraphQL mutation:', error.message);
        alert('Error in GraphQL mutation. Please check the console for details.');
      } finally {
        setLoading(false);
      }
    } catch (error: any) {
      console.error('Error uploading file:', error.message);
      alert('Error uploading file to Firebase. Please check the console for details.');
    } finally {
      setLoading(false);
    }
  };

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
        <button onClick={handleUpload} className={styles.button} disabled={loading}>
          Upload Case
        </button>
        {loading && <span className="loader"></span>}
      </div>
    </div>
  );
}

export default UploadCasePage;
