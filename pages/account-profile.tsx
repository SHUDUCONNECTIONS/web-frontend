import React, { useState } from 'react';
import styles from '../styles/accountProfile.module.css';

interface UserProfile {
  name: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

interface CompanyProfile {
  companyName: string;
  address: string;
  postalCode: string;
  contactPerson: string;
  companyEmail: string;
  telephoneNo: string;
  companyRegistration: string;
}

const LawFirmAccountProfile: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Zwivhuya',
    lastName: 'Vhangani',
    email: 'morganvhangani@gmail.com',
    phoneNumber: '067 132 9311',
  });

  const [companyProfile, setCompanyProfile] = useState<CompanyProfile>({
    companyName: 'Law Firm XYZ',
    address: '123 Main Street, Cityville',
    contactPerson: 'Jane Smith',
    postalCode: '0008',
    companyEmail: 'morganvhangani@gmail.com',
    telephoneNo: '012 406 5214',
    companyRegistration: 'ck100000',
  });

  const handleUserProfileUpdate = (updatedProfile: UserProfile) => {
    setUserProfile(updatedProfile);
  };

  const handleCompanyProfileUpdate = (updatedProfile: CompanyProfile) => {
    setCompanyProfile(updatedProfile);
  };

  const handleUpdate = () => {
    // Perform update logic (e.g., API request) here
    console.log('Updating profiles:', userProfile, companyProfile);
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <h2>User Profile</h2>
        <label className={styles.label}>
          Name:
          <br></br>
          <input
            className={styles.input}
            type="text"
            value={userProfile.name}
            onChange={(e) => handleUserProfileUpdate({ ...userProfile, name: e.target.value })}
          />
        </label>
        <br />
        <label className={styles.label}>
          Last Name:
          <br></br>
          <input
            className={styles.input}
            type="text"
            value={userProfile.lastName}
            onChange={(e) => handleUserProfileUpdate({ ...userProfile, lastName: e.target.value })}
          />
        </label>
        <br></br>
        <label className={styles.label}>
          Email:
          <br></br>
          <input
            className={styles.input}
            type="text"
            value={userProfile.email}
            onChange={(e) => handleUserProfileUpdate({ ...userProfile, email: e.target.value })}
          />
        </label>
        <br />
        <label className={styles.label}>
          Contact Number:
          <br></br>
          <input
            className={styles.input}
            type="text"
            value={userProfile.phoneNumber}
            onChange={(e) => handleUserProfileUpdate({ ...userProfile, phoneNumber: e.target.value })}
          />
        </label>
      </div>
      <div className={styles.rightPanel}>
        <h2>Company Profile</h2>
        <label className={styles.label}>
          Company Name:
          <br></br>
          <input
            className={styles.input}
            type="text"
            value={companyProfile.companyName}
            onChange={(e) => handleCompanyProfileUpdate({ ...companyProfile, companyName: e.target.value })}
          />
        </label>
        <br />
        <label className={styles.label}>
          Company Email:
          <br></br>
          <input
            className={styles.input}
            type="text"
            value={companyProfile.companyEmail}
            onChange={(e) => handleCompanyProfileUpdate({ ...companyProfile, companyEmail: e.target.value })}
          />
        </label>
        <br />
        <label className={styles.label}>
          Address:
          <br></br>
          <input
            className={styles.input}
            type="text"
            value={companyProfile.address}
            onChange={(e) => handleCompanyProfileUpdate({ ...companyProfile, address: e.target.value })}
          />
        </label>
        <br />
        <label className={styles.label}>
          Postal Code:
          <br></br>
          <input
            className={styles.input}
            type="text"
            value={companyProfile.postalCode}
            onChange={(e) => handleCompanyProfileUpdate({ ...companyProfile, postalCode: e.target.value })}
          />
        </label>
        <br />
        <label className={styles.label}>
          Telephone:
          <br></br>
          <input
            className={styles.input}
            type="text"
            value={companyProfile.telephoneNo}
            onChange={(e) => handleCompanyProfileUpdate({ ...companyProfile, telephoneNo: e.target.value })}
          />
        </label>
        <br />
        <label className={styles.label}>
          Company Registration:
          <br></br>
          <input
            className={styles.input}
            type="text"
            value={companyProfile.companyRegistration}
            onChange={(e) =>
              handleCompanyProfileUpdate({ ...companyProfile, companyRegistration: e.target.value })
            }
          />
        </label>
      </div>
      <div className={styles.updateButtonContainer}>
        <button className={styles.updateButton} onClick={handleUpdate}>
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default LawFirmAccountProfile;
