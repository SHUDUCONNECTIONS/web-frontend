// LawFirmAccountProfile.tsx
import React, { useState, useEffect } from 'react';
import styles from '../styles/accountProfile.module.css';
import { client } from '../pages/services/graphql.service';
import { ViewProfile } from '../graphql/viewUser';
import { ViewFirm } from '../graphql/viewFirm';


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

  

  useEffect(() => {
    // Fetch user and company data when the component mounts
    handleUpdate();
  }, []);

  const handleUpdate = async () => {
    try {
      setValidationTriggered(true);

      const { data: userData } = await client.query({
        query: ViewProfile,
        variables: { userId: 116 },
      });

      const { data: companyData, errors: companyErrors } = await client.query({
        query: ViewFirm,
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

  return (
    <div className={styles.container}>
      {/* Your LawFirmAccountProfile UI here */}
    </div>
  );
};

export default LawFirmAccountProfile;
