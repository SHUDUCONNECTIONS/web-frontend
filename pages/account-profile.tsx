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
    name: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  });

  const [companyProfile, setCompanyProfile] = useState<CompanyProfile>({
    companyName: '',
    address: '',
    contactPerson: '',
    postalCode: '',
    companyEmail: '',
    telephoneNo: '',
    companyRegistration: '',
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
    <div className={styles.body}>
      <div className={styles.container}>
        <form className={styles.form}>
          <div className={styles.profileSection}>
          <h2 className={styles.heading}>User Profile</h2>
            <label className={styles.label}>
              Name:
              <br />
              <input
                className={styles.input}
                type="text"
                placeholder="Enter your name"
                value={userProfile.name}
                onChange={(e) => handleUserProfileUpdate({ ...userProfile, name: e.target.value })}
              />
            </label>
            <label className={styles.label}>
          Last Name:
          <br></br>
          <input
            className={styles.input}
            type="text"
            placeholder="Enter your last name"
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
            placeholder="Enter your email address"
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
            placeholder="Enter your contact number"
            value={userProfile.phoneNumber}
            onChange={(e) => handleUserProfileUpdate({ ...userProfile, phoneNumber: e.target.value })}
          />
        </label>
          </div>
          <div className={styles.companyprofileSection}>
          <h2 className={styles.heading}>Company Profile</h2>
            <label className={styles.label}>
              Company Name:
              <br />
              <input
                className={styles.input}
                type="text"
                placeholder="Enter your company name"
                value={companyProfile.companyName}
                onChange={(e) =>
                  handleCompanyProfileUpdate({ ...companyProfile, companyName: e.target.value })
                }
              />
            </label>
            <label className={styles.label}>
          Company Email:
          <br></br>
          <input
            className={styles.input}
            type="text"
            placeholder="Enter company's email address"
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
            placeholder="Enter company's physical address"
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
            placeholder="Enter company's postal code"
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
            placeholder="Enter company's telephone number"
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
            placeholder="Enter company's registration number"
            value={companyProfile.companyRegistration}
            onChange={(e) =>
              handleCompanyProfileUpdate({ ...companyProfile, companyRegistration: e.target.value })
            }/>
        </label>
          </div>
          <div className={styles.centeredButtonContainer}>
            <button className={styles.centeredButton} onClick={handleUpdate}>
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LawFirmAccountProfile;
