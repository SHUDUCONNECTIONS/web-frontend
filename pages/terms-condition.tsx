import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faEye } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/TermsAndConditions.module.css';

interface Policy {
  id: number;
  name: string;
  file: string;
}

const TermsAndConditions: React.FC = () => {
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);

  const policies: Policy[] = [
    { id: 1, name: 'Private Policy for Customers', file: '../docs/Private Policy for Customers.pdf' },
    { id: 2, name: 'Agreement Driver Care Runners', file: '/Terms and Conditions Agreement Driver Care Runners.pdf' },
    { id: 3, name: 'Terms and Conditions Driver', file: '/Terms and Conditions Driver.pdf' },
    { id: 4, name: 'Terms and Conditions Law Firms', file: '/Terms and Conditions Law Firms.pdf' },
  ];

  const previewPolicy = (policy: Policy) => {
    setSelectedPolicy(policy);
  };

  const downloadPolicy = () => {
    if (selectedPolicy) {
      window.open(selectedPolicy.file, '../docs');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Terms and Conditions</h1>

      <div className={styles.policyContainer}>
        {policies.map((policy) => (
          <div key={policy.id} className={`${styles.policyCard} ${selectedPolicy === policy ? styles.selected : ''}`}>
            <h2 className={styles.policyName}>{policy.name}</h2>
            <div className={styles.cardFooter}>
              <button onClick={() => previewPolicy(policy)} className={styles.previewButton}>
                <FontAwesomeIcon icon={faEye} />
                Preview
              </button>
              <button onClick={() => downloadPolicy()} className={styles.downloadButton}>
                <FontAwesomeIcon icon={faDownload} />
                Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedPolicy && (
        <div className={styles.previewContainer}>
          <iframe
            title="PDF Preview"
            src={selectedPolicy.file}
            width="100%"
            height="600px"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default TermsAndConditions;
