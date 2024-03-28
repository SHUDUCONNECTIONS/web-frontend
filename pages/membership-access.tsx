import React, { useState, useEffect } from 'react';
import styles from '../styles/MembershipPage.module.css';
import { client } from './services/graphql.service';
import { Subscription } from '../graphql/subscription';
import { useRouter } from 'next/router';

interface Package {
  id: number;
  name: string;
  price: string;
  stars: number;
  description: string;
}
const MembershipPage = () => {
  const [showPackageSelectedPopup, setShowPackageSelectedPopup] = useState(false);
  const [showPackageAlreadySelectedPopup, setShowPackageAlreadySelectedPopup] = useState(false);
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [firmId, setFirmId] = useState<string | null>(null);
  const [planName, setPlanName] = useState<string | null>(null);
  const [selectedPackageId, setSelectedPackageId] = useState<number | null>(null);
  const [amount, setAmount] = useState<string | null>(null);
  const router = useRouter();
  const [error, setError] = useState<string>('');
  
  useEffect(() => {
    // Retrieve userId and firmId from localStorage
    const storedUserId = "186";

    const storedFirmId = "67";
    setUserId(storedUserId);
    setFirmId(storedFirmId);
    // Pre-select all packages (use null to represent unselected state)
    setSelectedPackageId(null);
  }, []);
  const handlePackageSelect = async (packageId: number, price: string) => {
    setShowConfirmationPopup(true);
    setSelectedPackageId(packageId);
    setAmount(price);
    setSelectedPackageId(packageId);
    localStorage.setItem('packageId', packageId.toString());
  };
  const handleConfirmation = (confirm: boolean) => {
    setShowConfirmationPopup(false);
    if (!confirm) {
      setSelectedPackageId(null);
      console.log(userId)
      return;
    }
    const selectedPackage = packages.find((pkg) => pkg.id === selectedPackageId);
    if (selectedPackage) {
      const planName = selectedPackage.name;
            
      if (selectedPackageId !== null && amount !== null && planName !== null) {
        
        router.push({
          pathname: '/packagePayment',
          query: {
            packageName: planName,
            price: amount,
           
          },
        });
        
      }
    }
  };

  
  
  const packages: Package[] = [
    { id: 1, name: 'Bronze', price: '350.00', stars: 1, description: '3 users | RAM: 2 GB | Support & Maintenance' },
    { id: 2, name: 'Silver', price: '550.00', stars: 2, description: '5 users | RAM: 4 GB | Support & Maintenance' },
    { id: 3, name: 'Gold', price: '650.00', stars: 3, description: '8 users | RAM: 6 GB | Support & Maintenance' },
    { id: 4, name: 'Platinum', price: '750.00', stars: 4, description: '15 users | RAM: 8 GB | Support & Maintenance' },
    { id: 5, name: 'Palladium', price: '1 200.00', stars: 5, description: '25 users | RAM: unlimited | Support & Maintenance' },
  ];
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Membership Packages</h1>
      {showPackageSelectedPopup && (
        <div className={`${styles.popup} ${showPackageSelectedPopup ? styles.fadeOut : ''}`}>
          <p>
            Package successfully selected: {packages.find((pkg) => pkg.id === selectedPackageId)?.name}
          </p>
        </div>
      )}
      {showPackageAlreadySelectedPopup && (
        <div className={styles.popup}>
          <p>
            Package already selected
          </p>
        </div>
      )}
      {showConfirmationPopup && (
        <div className={styles.confirmationPopup}>
          <p>
            Are you sure you want to select the {packages.find((pkg) => pkg.id === selectedPackageId)?.name} package?
          </p>
          <div>
            <button className={styles.buttonStyle} onClick={() => handleConfirmation(true)}>Yes</button>
            <button className={styles.buttonStyle} onClick={() => handleConfirmation(false)}>No</button>
          </div>
        </div>
      )}
      <div className={styles.packages}>
        {packages.map((pkg) => (
          <div key={pkg.id} className={`${styles.package}`}>
            <h2>{pkg.name}</h2>
            <p className={styles.price}>{`R${pkg.price}/month`}</p>
            <div className={styles.stars}>
              {Array.from({ length: pkg.stars }, (_, index) => (
                <span key={index}>&#9733;</span>
              ))}
            </div>
            <p className={styles.description}>{pkg.description}</p>
            <button
              className={styles['button-style']}
              onClick={() => handlePackageSelect(pkg.id as number, pkg.price)}
              disabled={selectedPackageId === pkg.id}
            >
              {selectedPackageId === pkg.id ? 'Package Selected' : 'Select Package'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default MembershipPage;