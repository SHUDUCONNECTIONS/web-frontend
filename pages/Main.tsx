import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { customImageLoader } from '../src/Components/customImageLoader';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../styles/menu2.module.css';
//import { ViewProfile } from '../graphql/viewUser';
//import { ViewFirm } from '../graphql/viewFirm';
//import { client } from '../pages/services/graphql.service';

import {
  faCar,
  faFileUpload,
  faFolder,
  faUser,
  faUserShield,
  faMoneyBill,
} from '@fortawesome/free-solid-svg-icons';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  cellphone: string;
}

interface CompanyProfile {
  name: string;
  placeId: string;
  contactPerson: string;
  postalCode: string;
  companyEmail: string;
  telephoneNo: string;
  companyRegistration: string;
}

const Main = () => {
  const router = useRouter();


  const handleAccountProfile = () => {
    router.push('/account-profile');
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
    router.push('/UploadCasePage');
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.container2} ${styles.mobile}`}>
        <div className={`${styles.form} ${styles.mobile}`}>
          <div className={`${styles.logo} ${styles.mobile}`}>
            <Image
              loader={customImageLoader}
              src="carerunnerlogo.png"
              alt="Your Logo"
              width={50}
              height={50}
              className={`${styles['logo-image']} ${styles.mobile}`}
            />
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

          <button onClick={handleAccountProfile} className={styles['button-menu']}>
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
        <Link href="/link-to-desired-url" className={styles['card-menu']} onClick={() => console.log('Button 1 clicked')}>
          <Image
            loader={customImageLoader}
            src="menu1.png"
            alt="request pickup"
            width={50}
            height={50}
            className={styles['card-img']}
          />
          <button style={{ width: '100%' }} className={styles['card-button']}>
            Request Pickup
          </button>
        </Link>

        <Link href="/UploadCasePage" className={styles['card-menu']} onClick={(handleUploadCase) => console.log('Button 1 clicked')}>
          <Image
            loader={customImageLoader}
            src="menu2.png"
            alt="Upload case file"
            width={50}
            height={50}
            className={styles['card-img']}
          />
          <button style={{ width: '100%' }} className={styles['card-button']}>
            Upload Case File
          </button>
        </Link>

        <Link href="/firm-records" className={styles['card-menu']} onClick={(handleFirmRecords) => console.log('Button 1 clicked')}>
          <Image
            loader={customImageLoader}
            src="menu3.png"
            alt="records"
            width={50}
            height={50}
            className={styles['card-img']}
          />
          <button style={{ width: '100%' }} className={styles['card-button']}>
            Law-Firm Records
          </button>
        </Link>

        <Link href="/account-profile" className={styles['card-menu']} onClick={handleAccountProfile}>
          <Image
            loader={customImageLoader}
            src="menu4.png"
            alt="profile"
            width={50}
            height={50}
            className={styles['card-img']}
          />
          <button style={{ width: '100%' }} className={styles['card-button']}>
            Lawyer Account Profile
          </button>
        </Link>

        <Link href="/membership-access" className={styles['card-menu']} onClick={(handleMemberAccess) => console.log('Button 1 clicked')}>
          <Image
            loader={customImageLoader}
            src="menu5.png"
            alt="Membership access"
            width={50}
            height={50}
            className={styles['card-img']}
          />
          <button style={{ width: '100%' }} className={styles['card-button']}>
            Membership Access
          </button>
        </Link>

        <Link href="/billing-page" className={styles['card-menu']} onClick={(handleBillingInfo) => console.log('Button 1 clicked')}>
          <Image
            loader={customImageLoader}
            src="menu6.png"
            alt="Billing Info"
            width={50}
            height={50}
            className={styles['card-img']}
          />
          <button style={{ width: '100%' }} className={styles['card-button']}>
            Billing Information
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Main;
