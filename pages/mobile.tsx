import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../styles/Home.module.css'; // Import the CSS module
import {
  faCar,
  faFileUpload,
  faFolder,
  faUser,
  faUserShield,
  faMoneyBill,
} from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const router = useRouter();
  const [error, setError] = useState<string>('');

  const handleLogin = () => {
    console.log('Performing login actions');
    setError('');
  };

  const handleSignUp = () => {
    router.push('/signup');
  };

  const handleBillingInfo = () => {
    router.push('/billing-page');
  };

  const handleMemberAccess = () => {
    router.push('/membership-access');
  };

  const handleFirmRecords = () => {
    router.push('/firm-records');
  };

  const handleUploadCase = () => {
    router.push('/upload-case');
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.logo}>
          <img src="/carerunnerlogo.png" alt="Your Logo" className={styles['logo-image']} />
        </div>

        <button onClick={() => console.log('Button 1 clicked')} className={styles['button-menu']}>
          <span className="icon">
            <FontAwesomeIcon icon={faCar} />
          </span>
          <span className={styles['button-text']}>Pick Up Request</span>
        </button>
        
        <button onClick={handleUploadCase} className={styles['button-menu']}>
          <span className="icon">
            <FontAwesomeIcon icon={faFileUpload} />
          </span>
          <span className={styles['button-text']}>Upload Case</span>
        </button>
        
        <button onClick={handleFirmRecords} className={styles['button-menu']}>
          <span className="icon">
            <FontAwesomeIcon icon={faFolder} />
          </span>
          <span className={styles['button-text']}>Firm Records</span>
        </button>
        
        <button onClick={() => console.log('Button 4 clicked')} className={styles['button-menu']}>
          <span className="icon">
            <FontAwesomeIcon icon={faUser} />
          </span>
          <span className={styles['button-text']}>Account Profile</span>
        </button>
        
        <button onClick={handleMemberAccess} className={styles['button-menu']}>
          <span className="icon">
            <FontAwesomeIcon icon={faUserShield} />
          </span>
          <span className={styles['button-text']}>Membership Access</span>
        </button>
        
        <button onClick={handleBillingInfo} className={styles['button-menu']}>
          <span className="icon">
            <FontAwesomeIcon icon={faMoneyBill} />
          </span>
          <span className={styles['button-text']}>Billing Information</span>
        </button>
      </div>
    </div>
  );
};

export default Home;
