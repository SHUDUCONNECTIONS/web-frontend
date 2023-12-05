import React, { useState } from 'react';
import styles from '../styles/consultation.module.css';

const Consultation = () => {
  const [selectedLawyer, setSelectedLawyer] = useState<string | null>(null);

  const lawyerOptions = ['Criminal Law', 'Family Law', 'Business Law', 'Immigration Law'];

  const handleLawyerSelection = (lawyerType: string) => {
    setSelectedLawyer(lawyerType);
  };

  return (
    <div className={styles.container}>
      <div className={styles.lawyerSelection}>
        <h1 className={styles.title}>Select a Type of Lawyer</h1>
        <div className={styles.dropdownContainer}>
          <select
            className={styles.dropdown}
            onChange={(e) => handleLawyerSelection(e.target.value)}
          >
            <option value="" disabled selected>Select a lawyer type</option>
            {lawyerOptions.map((lawyer, index) => (
              <option key={index} value={lawyer}>
                {lawyer}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedLawyer && (
        <div className={styles.chatroom}>
          <h2 className={styles.chatTitle}>
            Chatting with {selectedLawyer} Lawyer
          </h2>
          <div className={styles.chatContainer}>
          </div>
        </div>
      )}
    </div>
  );
};

export default Consultation;
