import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/payment.module.css';
import Image from 'next/image';

interface Package {
  id: number;
  name: string;
  price: string;
}

const packagePayment = () => {
  const [checkoutId, setCheckoutId] = useState<string | null>(null);
  const router = useRouter();
  const { packageName, price} = router.query;
  const userId = localStorage.getItem('userId');
  const packageId = localStorage.getItem('packageId');
  
  useEffect(() => {
    const fetchCheckoutId = async () => {
      try {
        
        const packageNameString = Array.isArray(packageName) ? packageName[0] : packageName || '';
        const priceString = Array.isArray(price) ? price[0] : price || '';

        const response = await fetch('http://localhost:4001/api/checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            packageName: packageNameString,
            price: parseFloat(priceString),
          }),
        });
        const data = await response.json();
        setCheckoutId(data.id);
        console.log(packageName, price, packageId);
      } catch (error) {
        console.error('Error fetching checkoutId:', error);
      }
    };

    fetchCheckoutId();
  }, [packageName, price]);

  console.log(userId, packageId)

  useEffect(() => {
    
    if (checkoutId) {
      const script = document.createElement('script');
      script.src = `https://eu-test.oppwa.com/v1/paymentWidgets.js?checkoutId=${checkoutId}`;
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [checkoutId]);

  const handlePaymentSuccess = () => {

    const userId = '182';
 
    router.push({
      pathname: '/Successful',
      query: { userId: userId.toString(), packageId: packageId?.toString() || '' }
    });
  };

  return (
    <div className={styles.paymentContainer}>
      {/* Position logo at top center */}
      <div className={styles.logoContainer}>
        <Image src="/carerunnerlogo.png" width="150" height="150" alt="Your Logo" className={styles.logoImage} />
      </div>
      {/* Ensure packageName and price are strings or provide appropriate fallbacks */}
      <h2 className={styles.paymentHeading}>Package Name: {packageName || 'Package Name Unavailable'}</h2>
      <p className={styles.paymentPrice}>Price: {price || 'Price Unavailable'}</p>
      <div className={styles.paymentForm}>
        {checkoutId && (
          <div className={styles.paymentScript}>
            <script
              src={`https://eu-test.oppwa.com/v1/paymentWidgets.js?checkoutId=${checkoutId}`}
              data-brands="VISA MASTER AMEX"
            ></script>
            <form action="http://localhost:3000/PaymentSuccessful" className="paymentWidgets" data-brands="VISA MASTER AMEX" data-amount={price}></form>
          </div>
        )}
      </div>
     
    </div>
  );
};

export default packagePayment;