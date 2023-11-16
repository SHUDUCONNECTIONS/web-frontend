import globalStyles from '../styles/menu2.module.css';
import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../styles/menu2.module.css'; // Import the CSS module
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

  const handleAccountProfile = () => {
    router.push('');
  }; 

  return (
    <div className={styles.container}>

        <a href="/link-to-desired-url" className={styles['card-menu']} onClick={() => console.log('Button 1 clicked')}>
          <img src="/menu1.png" alt="Car Icon" className={styles['card-image']} />
          <button style={{ width: '100%' }} className={styles['card-button']}>Request Pickup</button>
        </a>

        <a href="/link-to-desired-url" className={styles['card-menu']} onClick={(handleUploadCase) => console.log('Button 1 clicked')}>
          <img src="/menu2.png" alt="Car Icon" className={styles['card-image']} />
          <button style={{ width: '100%' }} className={styles['card-button']}>Upload Case FIle</button>
        </a>
        
        <a href="/link-to-desired-url" className={styles['card-menu']} onClick={(handleFirmRecords) => console.log('Button 1 clicked')}>
          <img src="/menu3.png" alt="Car Icon" className={styles['card-image']} />
          <button style={{ width: '100%' }} className={styles['card-button']}>Law-Firm Records</button>
        </a>

        <a href="/link-to-desired-url" className={styles['card-menu']} onClick={(handleAccountProfile) => console.log('Button 1 clicked')}>
          <img src="/menu4.png" alt="Car Icon" className={styles['card-image']} />
          <button style={{ width: '100%' }} className={styles['card-button']}>Lawyer Account Profile</button>
        </a>
        
        <a href="/link-to-desired-url" className={styles['card-menu']} onClick={(handleMemberAccess) => console.log('Button 1 clicked')}>
          <img src="/menu5.png" alt="Car Icon" className={styles['card-image']} />
          <button style={{ width: '100%' }} className={styles['card-button']}>Membership Access</button>
        </a>

        <a href="/link-to-desired-url" className={styles['card-menu']} onClick={(handleBillingInfo) => console.log('Button 1 clicked')}>
          <img src="/menu6.png" alt="Car Icon" className={styles['card-image']} />
          <button style={{ width: '100%' }} className={styles['card-button']}>Billing Information</button>
        </a>
        
        
      </div>
  );
};


export default Home;
