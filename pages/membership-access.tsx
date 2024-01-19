
import { useState, useEffect } from 'react';
import styles from '../styles/MembershipPage.module.css';
import { client } from './services/graphql.service';
import { Subscription } from '../graphql/subscription';

interface Package {
  id: number;
  name: string;
  price: string;
  stars: number;
  description: string;
}

const MembershipPage = () => {
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const [showPackageSelectedPopup, setShowPackageSelectedPopup] = useState(false);
  const [showPackageAlreadySelectedPopup, setShowPackageAlreadySelectedPopup] = useState(false);
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState<number | null>(null); 

  useEffect(() => {
    const storedPackage = localStorage.getItem('selectedPackage');
    setSelectedPackage(storedPackage ? parseInt(storedPackage, 10) : null);
  }, []);

  const handlePackageSelect = async (packageId: number) => {
    if (selectedPackage === packageId) {
      setShowPackageAlreadySelectedPopup(true);
      return;
    }

    setShowConfirmationPopup(true);
    setSelectedPackageId(packageId); 
  };

  const handleConfirmation = async (confirm: boolean) => {
    setShowConfirmationPopup(false);

    if (!confirm) {
      setSelectedPackageId(null); 
      return;
    }

    if (selectedPackageId !== null) {
      setSelectedPackage(selectedPackageId); 

      try {
        const { data } = await client.mutate({
          mutation: Subscription,
          variables: {
            subscriptionTypeId: selectedPackageId,
          },
        });

        if (data.createSubscription && data.createSubscription.subscription) {
          console.log('Subscription created successfully!', data.createSubscription.subscription);
          localStorage.setItem('selectedPackage', selectedPackageId.toString());
        } else if (data.createSubscription && data.createSubscription.errors) {
          data.createSubscription.errors.forEach((error: any) => {
            console.error(`Error creating subscription - Field: ${error.field}, Message: ${error.message}`);
          });
        }

        setSelectedPackageId(null); 
      } catch (error: any) {
        console.error('Error creating subscription:', error);
      }
    } else {
      console.error('selectedPackageId is null. Cannot proceed.');
    }
  };

  const packages: Package[] = [
    { id: 1, name: 'Bronze', price: 'R350.00/month', stars: 1, description: 'RAM: 2 GB | Support & Maintenance' },
    { id: 2, name: 'Silver', price: 'R550.00/month', stars: 2, description: 'RAM: 4 GB | Support & Maintenance' },
    { id: 3, name: 'Gold', price: 'R650.00/month', stars: 3, description: 'RAM: 6 GB | Support & Maintenance' },
    { id: 4, name: 'Platinum', price: 'R750.00/month', stars: 4, description: 'RAM: 4 GB | Support & Maintenance' },
    { id: 5, name: 'Palladium', price: 'R1 200.00/month', stars: 5, description: 'RAM: 6 GB | Support & Maintenance' },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Membership Packages</h1>

      {showPackageSelectedPopup && (
        <div className={styles.popup}>
          <p >
            Package successfully selected
          </p>
        </div>
      )}

      {showPackageAlreadySelectedPopup && (
        <div className={styles.popup}>
          <p >
            Package already selected
          </p>
        </div>
      )}

      {showConfirmationPopup && (
        <div className={styles.confirmationPopup}>
         <p>
           Are you sure you want to select this package?
         </p>
          <div>
            <button className={styles.buttonStyle} onClick={() => handleConfirmation(true)}>Yes</button>
            <button className={styles.buttonStyle} onClick={() => handleConfirmation(false)}>No</button>
          </div>
        </div>
      )}


      <div className={styles.packages}>
        {packages.map((pkg) => (
          <div key={pkg.id} className={`${styles.package} ${selectedPackage === pkg.id ? styles.selected : ''}`}>
            <h2>{pkg.name}</h2>
            <p className={styles.price}>{pkg.price}</p>
            <div className={styles.stars}>
              {Array.from({ length: pkg.stars }, (_, index) => (
                <span key={index}>&#9733;</span>
              ))}
            </div>
            <p className={styles.description}>{pkg.description}</p>
            <button
              className={`${styles['button-style']} ${selectedPackage === pkg.id ? styles.disabled : ''}`}
              onClick={() => handlePackageSelect(pkg.id as number)}
              disabled={selectedPackage === pkg.id}
            >
              {selectedPackage === pkg.id ? 'Package Selected' : 'Select Package'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MembershipPage;
