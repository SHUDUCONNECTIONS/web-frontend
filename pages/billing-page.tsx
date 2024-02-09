
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faDollarSign,
  faTruck,
  faFileInvoiceDollar,
} from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/billing.module.css';
import { client } from './services/graphql.service';
import { GetBillingInfo } from '../graphql/billingInfo';

interface BillingData {

  price: number;
  rideFee: number;
  totalCount: number;
 planType: string;
}

const Billing = ({ getBillingInfoId }: { getBillingInfoId: number }) => {
  const [billingData, setBillingData] = useState<BillingData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        const { data } = await client.query({
          query: GetBillingInfo,
          variables: { getBillingInfoId : 13 },
        });
        setBillingData(data.getBillingInfo);
        
      } catch (error) {
        
        alert('Error fetcthing info');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [getBillingInfoId, client]);

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h1 className={styles.title}>Billing Information</h1>
        <div className={styles.billingInfo}>
          {isLoading && <p>Loading billing information...</p>}
          {error && <p>Error fetching data</p>}
          {billingData && (
            <>
              <div className={styles.infoGroup}>
              <label>
                <FontAwesomeIcon icon={faUser} className={styles.icon} />
                <p>Membership: {billingData?.planType}</p>
              </label>
              <p>{billingData?.planType}</p>
            </div>
            <div className={styles.infoGroup}>
              <label>
                <FontAwesomeIcon icon={faDollarSign} className={styles.icon} />
                <p> Membership Fee: {billingData?.price?.toFixed(2)}</p>
              </label>
            </div>
            <div className={styles.infoGroup}>
              <label>
                <FontAwesomeIcon icon={faTruck} className={styles.icon} />
                <p>Delivery Fee: {billingData?.rideFee?.toFixed(2)}</p>
              </label>
            </div>
            <div className={styles.infoGroup}>
              <label>
                <FontAwesomeIcon icon={faFileInvoiceDollar} className={styles.icon} />
                <p>Total Amount Due: {billingData?.totalCount?.toFixed(2)}</p>
              </label>
            </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Billing;
