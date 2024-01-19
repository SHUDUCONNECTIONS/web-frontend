
import React, { useState, useEffect } from 'react';
import styles from '../styles/accountProfile.module.css';
import { client } from './services/graphql.service';
import { ViewProfile } from '../graphql/viewUser';
import {  ViewFirm } from '../graphql/viewFirm';
import { FirmCreate } from '../graphql/comProfile';
import { EditProfile } from '../graphql/editUser';
import { EditAccount } from '../graphql/editProfile';

import * as yup from 'yup';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  cellphone: string;
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
    firstName: '',
    lastName: '',
    email: '',
    cellphone: '',
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
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false); 

  const companyProfileValidationSchema = yup.object().shape({
    name: yup.string().required('Please enter your company name'),
    placeId: yup.string().required('Please enter your company address'),
    contactPerson: yup.string().required('Please enter the contact person'),
    postalCode: yup.string().required('Please enter the postal code'),
    companyEmail: yup.string().email('Please enter a valid email').required('Please enter company email'),
    telephoneNo: yup.string().matches(/^\d{10}$/, 'Telephone number must be 10 digits').required('Please enter company telephone number'),
    companyRegistration: yup.string().required('Please enter company registration number'),
  });

  const handleUserProfileUpdate = (updatedProfile: UserProfile) => {
    setUserProfile(updatedProfile);
    setHasUnsavedChanges(true);
  };

  const handleCompanyProfileUpdate = (updatedProfile: CompanyProfile) => {
    setCompanyProfile(updatedProfile);
    setHasUnsavedChanges(true); 
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

    if (
      Object.values(errors).every((error) => error === '') &&
      Object.values(companyProfile).every((value) => value !== '')
    ) {
      try {
        await client.mutate({
          mutation: FirmCreate,
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

  const handleUpdate = async () => {
    try {
      setValidationTriggered(true);

      const { data: userData } = await client.query({
        query: ViewProfile,
        variables: { userId: 116 },
      });

      const { data: companyData, errors: companyErrors } = await client.query({
        query:  ViewFirm,
        variables: { firmId: 14 },
      });

      if (userData && userData.user) {
        setUserProfile({
          firstName: userData.user.firstName || '',
          lastName: userData.user.lastName || '',
          email: userData.user.email || '',
          cellphone: userData.user.cellphone || '',
        });
      } else {
        console.error('User data not found in the response');
      }

      if (companyErrors) {
        console.error('Error fetching company data:', companyErrors);
      } else if (companyData && companyData.firm) {
        setCompanyProfile({
          name: companyData.firm.name || '',
          placeId: companyData.firm.placeId || '',
          contactPerson: companyData.firm.contactPerson || '',
          postalCode: companyData.firm.postalCode || '',
          companyEmail: companyData.firm.companyEmail || '',
          telephoneNo: companyData.firm.telephoneNo || '',
          companyRegistration: companyData.firm.companyRegistration || '',
        });
      } else {
        console.error('Company data not found in the response');
      }

      console.log('Profile data fetched successfully');
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error fetching profile data:', error.message);
      } else {
        console.error('An unknown error occurred:', error);
      }
    }
  };

  const handleUpdateProfile = async () => {
    try {
      setValidationTriggered(true);
  
      // Update user profile
      const updatedUserVariables = {
        updateUserId: 116, // I NEED TO ADD THE ID LOGIC HERE
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
        email: userProfile.email,
        cellphone: userProfile.cellphone,
      };
  
      const filteredUserVariables = Object.fromEntries(
        Object.entries(updatedUserVariables).filter(([_, value]) => value !== undefined)
      );
  
      console.log('Mutation Variables (User):', filteredUserVariables);
  
      const { data: updatedUserData } = await client.mutate({
        mutation: EditProfile,
        variables: filteredUserVariables,
      });
  
      if (updatedUserData && updatedUserData.updateUser) {
        console.log('User profile updated successfully');
      } else {
        console.error('Error updating user profile:', updatedUserData?.updateUser?.errors);
        return;
      }
  
      // Update company profile
      const updatedCompanyVariables = {
        updateFirmId: 14, // I NEED TO ADD THE ID LOGIC HERE
        name: companyProfile.name,
        placeId: companyProfile.placeId,
        postalCode: companyProfile.postalCode,
        contactPerson: companyProfile.contactPerson,
        companyEmail: companyProfile.companyEmail,
        telephoneNo: companyProfile.telephoneNo,
        companyRegistration: companyProfile.companyRegistration,
      };
  
      const filteredCompanyVariables = Object.fromEntries(
        Object.entries(updatedCompanyVariables).filter(([_, value]) => value !== undefined)
      );
  
      console.log('Mutation Variables (Company):', filteredCompanyVariables);
  
      const { data: updatedCompanyData } = await client.mutate({
        mutation: EditAccount,
        variables: filteredCompanyVariables,
      });
  
      if (updatedCompanyData && updatedCompanyData.updateFirm) {
        console.log('Company profile updated successfully');
      } else {
        console.error('Error updating company profile:', updatedCompanyData?.updateFirm?.errors);
      }
  
      setHasUnsavedChanges(false);
  
  
    } catch (error) {
      console.error('An error occurred:', error);
    }
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
                value={userProfile.firstName}
                onChange={(e) => handleUserProfileUpdate({ ...userProfile, firstName: e.target.value })}
              />
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
                value={userProfile.cellphone}
                onChange={(e) => handleUserProfileUpdate({ ...userProfile, cellphone: e.target.value })}
              />
                <div className={styles.centeredButtonContainer}>
 

              </div>
            </label>
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
               className={`
                 ${styles.input}
                 ${validationTriggered && errors.placeId && styles.error}
               `}
               type="text"
               placeholder="Enter company's physical address"
               value={companyProfile.placeId}
               onChange={(e) =>
                  handleCompanyProfileUpdate({ ...companyProfile, placeId: e.target.value })
                }
                style={{
                  borderBottomColor: validationTriggered && errors.placeId ? 'red' : 'initial',
               }}
             />
             {validationTriggered && errors.placeId && (
               <span
                 className={`${styles.errorMessage} ${styles.center}`}
                 style={{ color: 'red' }}
               >
                 {errors.placeId}
               </span>
              )}
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

            <div className={styles.centeredButtonContainer}>
                <button
                  className={styles.centeredButton}
                  onClick={handleUpdateProfile}
                  type="button"
                  disabled={!hasUnsavedChanges} 
                >
                  Update Profile
                </button>
          </div>
            <br />
          </div>
          <br />
          <div className={styles.centeredButtonContainer1}>
          <button className={styles.centeredButton} onClick={handleUpdate} type="button">
            View Profile
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LawFirmAccountProfile;