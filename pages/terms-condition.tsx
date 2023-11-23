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
    { id: 1, name: 'Privacy Policy', file: '/privacy_policy.pdf' },
    { id: 2, name: 'Terms of Service', file: '/terms_of_service.pdf' },
    { id: 3, name: 'Refund Policy', file: '/refund_policy.pdf' },
    { id: 4, name: 'Cookie Policy', file: '/cookie_policy.pdf' },
  ];

  const previewPolicy = (policy: Policy) => {
    // Implement logic to handle policy preview, e.g., open a modal with the file content
    // For simplicity, this example just sets the selected policy for download
    setSelectedPolicy(policy);
  };

  const downloadPolicy = () => {
    // Implement logic to handle policy download, e.g., open a new tab with the file
    if (selectedPolicy) {
      const downloadUrl = process.env.NEXT_PUBLIC_BASE_URL + selectedPolicy.file;
      window.open(downloadUrl, '_blank');
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
              <button onClick={() => setSelectedPolicy(policy)} className={styles.downloadButton}>
                <FontAwesomeIcon icon={faDownload} />
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TermsAndConditions;
