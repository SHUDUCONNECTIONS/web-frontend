import React, { useState } from 'react';
import styles from '../styles/accountProfile.module.css';
import { client } from './services/graphql.service';
import { ComProfile } from '../graphql/comProfile';
import * as yup from 'yup';

interface UserProfile {
  name: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

interface CompanyProfile {
  name: string;
  placeId: string;
  contactPerson: string;
  postalCode: string;
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
    name: '',
    placeId: '',
    contactPerson: '',
    postalCode: '',
    companyEmail: '',
    telephoneNo: '',
    companyRegistration: '',
  });

  const [errors, setErrors] = useState<{ [key in keyof CompanyProfile]: string }>({
    name: '',
    placeId: '',
    contactPerson: '',
    postalCode: '',
    companyEmail: '',
    telephoneNo: '',
    companyRegistration: '',
  });

  const [validationTriggered, setValidationTriggered] = useState(false);

  // Validation schema for company profile
  const companyProfileValidationSchema = yup.object().shape({
    name: yup.string().required('Please enter your company name'),
    placeId: yup.string().required('Please enter your company address'),
    contactPerson: yup.string().required('Please enter the contact person'),
    postalCode: yup.string().required('Please enter the postal code'),
    companyEmail: yup.string().email('Please enter a valid email').required('Please enter company email'),
    telephoneNo: yup.string().matches(/^\d{10}$/, 'Telephone number must be 10 digits').required('Please enter company telephone number'),
    companyRegistration: yup.string().required('Please enter company registration number'),
  });

  // Update user profile state
  const handleUserProfileUpdate = (updatedProfile: UserProfile) => {
    setUserProfile(updatedProfile);
  };

  // Update company profile state
  const handleCompanyProfileUpdate = (updatedProfile: CompanyProfile) => {
    setCompanyProfile(updatedProfile);
  };

  const handleCreateCompany = async () => {
    setValidationTriggered(true);

    setErrors({
      name: '',
      placeId: '',
      contactPerson: '',
      postalCode: '',
      companyEmail: '',
      telephoneNo: '',
      companyRegistration: '',
    });

    try {
      await companyProfileValidationSchema.validate(companyProfile, { abortEarly: false });
    } catch (validationError) {
      if (validationError instanceof yup.ValidationError) {
        validationError.inner.forEach((error) => {
          setErrors((prevErrors) => ({ ...prevErrors, [error.path as keyof CompanyProfile]: error.message }));
        });
      }
    }

    // Only proceed with the create company logic if there are no validation errors
    if (
      Object.values(errors).every((error) => error === '') &&
      Object.values(companyProfile).every((value) => value !== '')
    ) {
      try {
        await client.mutate({
          mutation: ComProfile,
          variables: {
            name: companyProfile.name,
            placeId: companyProfile.placeId,
            postalCode: companyProfile.postalCode,
            contactPerson: companyProfile.contactPerson,
            companyEmail: companyProfile.companyEmail,
            telephoneNo: companyProfile.telephoneNo,
            companyRegistration: companyProfile.companyRegistration,
          },
        });

        console.log('Company created successfully');

      } catch (error) {
        if (error instanceof Error) {
          console.error('Error creating company:', error.message);
        } else {
          console.error('An unknown error occurred:', error);
        }
      }
    }
  };

  const handleUpdate = () => {
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
                className={`
                  ${styles.input}
                  ${validationTriggered && errors.name && styles.error}
                `}
                type="text"
                placeholder="Enter your name"
                value={userProfile.name}
                onChange={(e) => handleUserProfileUpdate({ ...userProfile, name: e.target.value })}
                style={{
                  borderBottomColor: validationTriggered && errors.name ? 'red' : 'initial',
                }}
              />
              {validationTriggered && errors.name && (
                <span
                  className={`${styles.errorMessage} ${styles.center}`}
                  style={{ color: 'red' }}
                >
                  {errors.name}
                </span>
              )}
            </label>
            <br />
            <label className={styles.label}>
              Last Name:
              <br />
              <input
                className={styles.input}
                type="text"
                placeholder="Enter your last name"
                value={userProfile.lastName}
                onChange={(e) => handleUserProfileUpdate({ ...userProfile, lastName: e.target.value })}
              />
            </label>
            <br />
            <label className={styles.label}>
              Email:
              <br />
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
              <br />
              <input
                className={styles.input}
                type="text"
                placeholder="Enter your contact number"
                value={userProfile.phoneNumber}
                onChange={(e) => handleUserProfileUpdate({ ...userProfile, phoneNumber: e.target.value })}
              />
            </label>
            <div className={styles.centeredButtonContainer}>
            <button className={styles.centeredButton} onClick={handleUpdate}>
              Update Profile
            </button>
          </div>
          </div>
          <div className={styles.companyprofileSection}>
            <h2 className={styles.heading}>Company Profile</h2>
            <label className={styles.label}>
              Company Name:
              <br />
              <input
                className={`
                  ${styles.input}
                  ${validationTriggered && errors.name && styles.error}
                `}
                type="text"
                placeholder="Enter your company name"
                value={companyProfile.name}
                onChange={(e) => handleCompanyProfileUpdate({ ...companyProfile, name: e.target.value })}
                style={{
                  borderBottomColor: validationTriggered && errors.name ? 'red' : 'initial',
                }}
              />
              {validationTriggered && errors.name && (
                <span
                  className={`${styles.errorMessage} ${styles.center}`}
                  style={{ color: 'red' }}
                >
                  {errors.name}
                </span>
              )}
            </label>
            <br />
            <label className={styles.label}>
              Company Email:
              <br />
              <input
                className={`
                  ${styles.input}
                  ${validationTriggered && errors.companyEmail && styles.error}
                `}
                type="text"
                placeholder="Enter company's email address"
                value={companyProfile.companyEmail}
                onChange={(e) =>
                  handleCompanyProfileUpdate({ ...companyProfile, companyEmail: e.target.value })
                }
                style={{
                  borderBottomColor: validationTriggered && errors.companyEmail ? 'red' : 'initial',
                }}
              />
              {validationTriggered && errors.companyEmail && (
                <span
                  className={`${styles.errorMessage} ${styles.center}`}
                  style={{ color: 'red' }}
                >
                  {errors.companyEmail}
                </span>
              )}
            </label>
            <br />
            <label className={styles.label}>
              Address:
              <br />
              <input
                className={styles.input}
                type="text"
                placeholder="Enter company's physical address"
                value={companyProfile.placeId}
                onChange={(e) =>
                  handleCompanyProfileUpdate({ ...companyProfile, placeId: e.target.value })
                }
              />
            </label>
            <br />
            <label className={styles.label}>
              Postal Code:
              <br />
              <input
                className={`
                  ${styles.input}
                  ${validationTriggered && errors.postalCode && styles.error}
                `}
                type="text"
                placeholder="Enter company's postal code"
                value={companyProfile.postalCode}
                onChange={(e) =>
                  handleCompanyProfileUpdate({ ...companyProfile, postalCode: e.target.value })
                }
                style={{
                  borderBottomColor: validationTriggered && errors.postalCode ? 'red' : 'initial',
                }}
              />
              {validationTriggered && errors.postalCode && (
                <span
                  className={`${styles.errorMessage} ${styles.center}`}
                  style={{ color: 'red' }}
                >
                  {errors.postalCode}
                </span>
              )}
            </label>
            <br />
            <label className={styles.label}>
              Telephone:
              <br />
              <input
                className={`
                  ${styles.input}
                  ${validationTriggered && errors.telephoneNo && styles.error}
                `}
                type="text"
                placeholder="Enter company's telephone number"
                value={companyProfile.telephoneNo}
                onChange={(e) =>
                  handleCompanyProfileUpdate({ ...companyProfile, telephoneNo: e.target.value })
                }
                style={{
                  borderBottomColor: validationTriggered && errors.telephoneNo ? 'red' : 'initial',
                }}
              />
              {validationTriggered && errors.telephoneNo && (
                <span
                  className={`${styles.errorMessage} ${styles.center}`}
                  style={{ color: 'red' }}
                >
                  {errors.telephoneNo}
                </span>
              )}
            </label>
            <br />
            <label className={styles.label}>
              Company Registration:
              <br />
              <input
                className={`
                  ${styles.input}
                  ${validationTriggered && errors.companyRegistration && styles.error}
                `}
                type="text"
                placeholder="Enter company's registration number"
                value={companyProfile.companyRegistration}
                onChange={(e) =>
                  handleCompanyProfileUpdate({
                    ...companyProfile,
                    companyRegistration: e.target.value,
                  })
                }
                style={{
                  borderBottomColor: validationTriggered && errors.companyRegistration ? 'red' : 'initial',
                }}
              />
              {validationTriggered && errors.companyRegistration && (
                <span
                  className={`${styles.errorMessage} ${styles.center}`}
                  style={{ color: 'red' }}
                >
                  {errors.companyRegistration}
                </span>
              )}
            </label>
          </div>
          <div className={styles.centeredButtonContainer1}>
            <button className={styles.centeredButton} onClick={handleCreateCompany} type="button">
              Register Company
            </button>
          </div>
          <div className={styles.spaceBetweenButtons}></div>

        </form>
      </div>
    </div>
  );
};

export default LawFirmAccountProfile;
