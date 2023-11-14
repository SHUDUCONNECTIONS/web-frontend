import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faDollarSign, 
  faTruck,
  faFileInvoiceDollar,
} from '@fortawesome/free-solid-svg-icons';

import styles from '../styles/billing.module.css';

const Billing = () => {
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h1 className={styles.title}>Billing Information</h1>
        <div className={styles.billingInfo}>
          <div className={styles.infoGroup}>
            <label>
              <FontAwesomeIcon icon={faUser} className={styles.icon} />
              Membership:
            </label>
            <p>Gold Member</p>
          </div>
          <div className={styles.infoGroup}>
            <label>
              <FontAwesomeIcon icon={faDollarSign} className={styles.icon} />
              Membership Fee:
            </label>
            <p>R50.00</p>
          </div>
          <div className={styles.infoGroup}>
            <label>
              <FontAwesomeIcon icon={faTruck} className={styles.icon} />
              Delivery Fee:
            </label>
            <p>R10.00</p>
          </div>
          <div className={styles.infoGroup}>
            <label>
              <FontAwesomeIcon icon={faFileInvoiceDollar} className={styles.icon} />
              Total Amount Due:
            </label>
            <p>R60.00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;