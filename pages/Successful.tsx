import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../styles/invitation.module.css';
import { useRouter } from 'next/router';
import { client } from './services/graphql.service';
import { Subscription } from '../graphql/subscription';
import { CreateRequest } from '../graphql/requestPickup';

const Success = () => {
  const router = useRouter();
 
  const [userId, setUserId] = useState<string | null>(null);
  const [firmId, setFirmId] = useState<string | null>(null);
  const [price, setPrice] = useState('');
  const [pickupAddress, setPickupAddress] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientNo, setRecipientNo] = useState('');
  const [deliveryState, setDeliveryState] = useState('');

  
  useEffect(() => {
    // Retrieve data from localStorage
     const userIdFromStorage = localStorage.getItem('userId');
     const priceFromStorage = localStorage.getItem('price');
     const pickupAddressFromStorage = localStorage.getItem('pickupAddress');
     const deliveryAddressFromStorage = localStorage.getItem('deliveryAddress');
     const recipientNameFromStorage = localStorage.getItem('recipientName');
     const recipientNoFromStorage = localStorage.getItem('recipientNo');
     const deliveryStateFromStorage = localStorage.getItem('deliveryState');
 
      // Update state with retrieved data if not null
    if (userIdFromStorage !== null) setUserId(userIdFromStorage);
    if (priceFromStorage !== null) setPrice(priceFromStorage);
    if (pickupAddressFromStorage !== null) setPickupAddress(pickupAddressFromStorage);
    if (deliveryAddressFromStorage !== null) setDeliveryAddress(deliveryAddressFromStorage);
    if (recipientNameFromStorage !== null) setRecipientName(recipientNameFromStorage);
    if (recipientNoFromStorage !== null) setRecipientNo(recipientNoFromStorage);
    if (deliveryStateFromStorage !== null) setDeliveryState(deliveryStateFromStorage);
 
     

    
    const storedFirmId = "67";
  
    setFirmId(storedFirmId);
    
  }, []);

  console.log(pickupAddress)

  useEffect(() => {
    // Retrieve userId and packageId from query parameters
    const { userId, packageId } = router.query;
    if (userId && packageId) {
      setUserId(userId.toString());
      
    }
  }, [router.query]);
  console.log(userId)

  const handleContinue = async () => {
    
    try {
      //We need to figure out how to fetch these details from the request.tsx
      //Not sure if we should use localStorage on all of them
      const { data } = await client.mutate({
        mutation: CreateRequest,
        variables: {
          userId: 186,
          pickupAddress,
          deliveryAddress,
          recipientName,
          recipientNo,
          deliveryState: "NORMAL",
          rideFee: price,
        },
      });
      console.log('Pick-up requested successfully:', data);
     
      router.push('/Main');
    } catch (error) {
      console.error('Error making a request:', error);
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

export default Success;
