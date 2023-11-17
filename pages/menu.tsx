// Import necessary libraries
import React from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/menu2.module.css'; // Import the CSS module

const Home = () => {
  const router = useRouter();

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
    router.push('/UploadCasePage');
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

      <a className={styles['card-menu']} onClick={handleUploadCase}>
        <img src="/menu2.png" alt="Car Icon" className={styles['card-image']} />
        <button style={{ width: '100%' }} className={styles['card-button']}>
          Upload Case File
        </button>
      </a>

      <a className={styles['card-menu']} onClick={handleFirmRecords}>
        <img src="/menu3.png" alt="Car Icon" className={styles['card-image']} />
        <button style={{ width: '100%' }} className={styles['card-button']}>
          Law-Firm Records
        </button>
      </a>

      <a className={styles['card-menu']} onClick={handleAccountProfile}>
        <img src="/menu4.png" alt="Car Icon" className={styles['card-image']} />
        <button style={{ width: '100%' }} className={styles['card-button']}>
          Lawyer Account Profile
        </button>
      </a>

      <a className={styles['card-menu']} onClick={handleMemberAccess}>
        <img src="/menu5.png" alt="Car Icon" className={styles['card-image']} />
        <button style={{ width: '100%' }} className={styles['card-button']}>
          Membership Access
        </button>
      </a>

        <a className={styles['card-menu']} onClick={(handleBillingInfo) => console.log('Button 1 clicked')}>
          <img src="/menu6.png" alt="Car Icon" className={styles['card-image']} />
          <button style={{ width: '100%' }} className={styles['card-button']}>Billing Information</button>
        </a>
        
        
      </div>
  );
};

export default Home;
