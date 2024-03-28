import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../styles/invitation.module.css';
import { useRouter } from 'next/router';
import { client } from './services/graphql.service';
import { Subscription } from '../graphql/subscription';
import { CreateRequest } from '../graphql/requestPickup';

const PaymentSuccessful = () => {
  const router = useRouter();
 
  const [userId, setUserId] = useState<string | null>(null);
  const [firmId, setFirmId] = useState<string | null>(null);
  const [price, setPrice] = useState('');
  const [packageId, setPackageId] = useState<string | null>(null);
 

  
  useEffect(() => {
    // Retrieve data from localStorage
     const userIdFromStorage = "186";
     const priceFromStorage = localStorage.getItem('price');
     const packageIdFromStorage = localStorage.getItem('packageId');
 
      // Update state with retrieved data if not null
    if (userIdFromStorage !== null) setUserId(userIdFromStorage);
    if (priceFromStorage !== null) setPrice(priceFromStorage);
    if (packageIdFromStorage !== null) setPackageId(packageIdFromStorage);
   
     

    
    const storedFirmId = "67";
  
    setFirmId(storedFirmId);
    
  }, []);



  
  console.log(userId, packageId)

  const handleContinue = async () => {
    if (packageId !== null) {
      const mutationVariables = {
        userId: userId,
        subscriptionTypeId: parseInt(packageId), // Convert packageId back to integer
      };
      try {
        const { data } = await client.mutate({
          mutation: Subscription,
          variables: mutationVariables,
        });
        console.log('Subscription added to the database');
        router.push('/');
      } catch (error) {
        console.error('Error adding subscription:', error);
      }
    } else {
      console.error('PackageId is null');
    }
  };
  
  return (
    <form className={styles.form}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Image src="/carerunnerlogo.png" width="150" height="150" alt="Your Logo" className={styles.logoImage} />
        </div>
        <div className={styles.header1}>
          <h1> PAYMENT SUCCESSFUL </h1>
        </div>
        <div className={styles.message}>
          <p>
            Welcome to <strong>CARERUNNERS </strong>
            <span onClick={handleContinue} className={styles.continueLink}>
              continue
            </span>
          </p>
        </div>
      </div>
    </form>
  );
};

export default PaymentSuccessful;
