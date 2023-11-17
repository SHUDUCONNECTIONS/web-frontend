import { useState } from 'react';
import styles from '../styles/MembershipPage.module.css';

interface Package {
  id: number;
  name: string;
  price: string;
  stars: number;
  description: string;
}

const MembershipPage = () => {
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);

  const packages: Package[] = [
    { id: 1, name: 'Bronze', price: 'R350.00/month', stars: 1, description: 'RAM: 2 GB | Support & Maintenance' },
    { id: 2, name: 'Silver', price: 'R550.00/month', stars: 2, description: 'RAM: 4 GB | Support & Maintenance' },
    { id: 3, name: 'Gold',  price: 'R650.00/month', stars: 3, description: 'RAM: 6 GB | Support & Maintenance' },
    { id: 4, name: 'Platinum', price: 'R750.00/month', stars: 4, description: 'RAM: 4 GB | Support & Maintenance' },
    { id: 5, name: 'Palladium', price: 'R1 200.00/month', stars: 5, description: 'RAM: 6 GB | Support & Maintenance' },
  ];

  const handlePackageSelect = (packageId: number) => {
    setSelectedPackage(packageId);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Membership Packages</h1>
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
            <button className={styles['button-style']} onClick={() => handlePackageSelect(pkg.id as number)}>
              Select Package
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MembershipPage;
