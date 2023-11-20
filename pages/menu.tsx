import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/menu2.module.css'; // Import the CSS module
import {
  faCar,
  faFileUpload,
  faFolder,
  faUser,
  faUserShield,
  faMoneyBill,
  faSignOut,
  faFileShield,
  faHandshake,
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
    router.push('/navbar');
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

  interface IconProps {
    link: string;
  }
  
  return (
    <div className={styles.container}>
      
      <div className={`${styles.container2} ${styles.mobile}`}>
        <div className={`${styles.form} ${styles.mobile}`}>
          <div className={`${styles.logo} ${styles.mobile}`}>
           <img src="/carerunnerlogo.png" alt="Your Logo" className={`${styles['logo-image']} ${styles.mobile}`} />
          </div>

          <button onClick={() => console.log('Button 1 clicked')} className={`${styles['button-menu']} ${styles.mobile}`}>
            <span className="icon">
              <FontAwesomeIcon icon={faCar} />
            </span>
            <span className={`${styles['button-text']} ${styles.mobile}`}>Pick Up Request</span>
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

      <div className={`${styles.container} ${styles.desktop}`}>
      <nav className={styles.navbar}>
  <ul className={styles.navList}>
    <a className="centered-text" href="/">
      <img src="/logo.png" width="75" />
    </a>

    <li className={styles.navItem}>
      <a href="/link-to-desired-url">
        <FontAwesomeIcon icon={faHouse} />
        <span>  HOME</span>
      </a>
    </li>

    <li className={styles.navItem}>
      <a href="/link-to-desired-url" onClick={handleUploadCase}>
        <FontAwesomeIcon icon={faHandshake} />
        <span>  CONSULTATION</span>
      </a>
    </li>

    <li className={styles.navItem}>
      <a href="/link-to-desired-url" onClick={handleFirmRecords}>
        <FontAwesomeIcon icon={faCar} />
        <span>  REQUEST PICK-UP</span>
      </a>
    </li>

    <li className={styles.navItem}>
      <a href="/link-to-desired-url" onClick={handleAccountProfile}>
        <FontAwesomeIcon icon={faFileShield} />
        <span>  T's & C's</span>
      </a>
    </li>

    <li className={styles.navItem}>
      <a href="/link-to-desired-url" onClick={handleAccountProfile}>
        <FontAwesomeIcon icon={faUser} />
        <span>  PROFILE</span>
      </a>
    </li>

    <li className={styles.navItem}>
      <a href="/index" onClick={handleBillingInfo}>
        <FontAwesomeIcon icon={faSignOut} />
        <span>  SIGN OUT</span>
      </a>
    </li>
  </ul>
</nav>

        <a href="/link-to-desired-url" className={styles['card-menu']} onClick={() => console.log('Button 1 clicked')}>
          <img src="/menu1.png" alt="Car Icon" className={styles['card-image']} />
          <button style={{ width: '100%' }} className={styles['card-button']}>Request Pickup</button>
        </a>

        <a href="/link-to-desired-url" className={styles['card-menu']} onClick={(handleUploadCase) => console.log('Button 1 clicked')}>
          <img src="/menu2.png" alt="Car Icon" className={styles['card-image']} />
          <button style={{ width: '100%' }} className={styles['card-button']}>Upload Case FIle</button>
        </a>
        
        <a href="/firm-records" className={styles['card-menu']} onClick={(handleFirmRecords) => console.log('Button 1 clicked')}>
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

        <a href="/navbar" className={styles['card-menu']} onClick={(handleBillingInfo) => console.log('Button 1 clicked')}>
          <img src="/menu6.png" alt="Car Icon" className={styles['card-image']} />
          <button style={{ width: '100%' }} className={styles['card-button']}>Billing Information</button>
        </a>
        
      </div>
    </div>
  );
};


export default Home;
