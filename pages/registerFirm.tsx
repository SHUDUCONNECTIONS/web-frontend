import { useRouter } from 'next/router';
import styles from '../styles/registerFirm.module.css';
import { FirmCreate } from '../graphql/registerFirm';
import { client } from './services/graphql.service';
import React, { useState, useEffect } from 'react';
import * as yup from 'yup';

interface CompanyProfile {
  name: string;
  placeId: string;
  postalCode: string;
  companyEmail: string;
  telephoneNo: string;
  companyRegistration: string;
}

const RegisterFirm: React.FC = () => {
  const router = useRouter();

  const [companyProfile, setCompanyProfile] = useState<CompanyProfile>({
    name: '',
    placeId: '',
    postalCode: '',
    companyEmail: '',
    telephoneNo: '',
    companyRegistration: '',
  });

  const [validationTriggered, setValidationTriggered] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [errors, setErrors] = useState<{ [key in keyof CompanyProfile]: string }>({
    name: '',
    placeId: '',
    postalCode: '',
    companyEmail: '',
    telephoneNo: '',
    companyRegistration: '',
  });

  const companyProfileValidationSchema = yup.object().shape({
    name: yup.string().required('Please enter your company name'),
    placeId: yup.string().required('Please enter your company address'),
    postalCode: yup.string().required('Please enter the postal code'),
    companyEmail: yup.string().email('Please enter a valid email').required('Please enter company email'),
    telephoneNo: yup.string().matches(/^\d{10}$/, 'Telephone number must be 10 digits').required('Please enter company telephone number'),
    companyRegistration: yup.string().required('Please enter company registration number'),
  });

  useEffect(() => {
    if (validationTriggered) {
      companyProfileValidationSchema.validate(companyProfile, { abortEarly: false })
        .then(() => {
          setErrors({
            name: '',
            placeId: '',
            postalCode: '',
            companyEmail: '',
            telephoneNo: '',
            companyRegistration: '',
          });
        })
        .catch((validationError) => {
          if (validationError instanceof yup.ValidationError) {
            const newErrors: { [key in keyof CompanyProfile]: string } = {
              name: '',
              placeId: '',
              postalCode: '',
              companyEmail: '',
              telephoneNo: '',
              companyRegistration: '',
            };
            validationError.inner.forEach((error) => {
              newErrors[error.path as keyof CompanyProfile] = error.message;
            });
            setErrors(newErrors);
          }
        });
    }
  }, [companyProfile, validationTriggered]);

  const handleCompanyProfileUpdate = (updatedProfile: CompanyProfile) => {
    setCompanyProfile(updatedProfile);
    setHasUnsavedChanges(true);
  };

  const handleRegisterFirm = async () => {
    console.log('Register Firm button clicked');

    setValidationTriggered(true);

    if (
      Object.values(errors).every((error) => error === '') &&
      Object.values(companyProfile).every((value) => value.trim() !== '')
    ) {
      console.log('Validation successful. Proceeding with registration.');
      console.log('Company Profile:', companyProfile);

      try {
        await client.mutate({
          mutation: FirmCreate,
          variables: {
            name: companyProfile.name,
            placeId: companyProfile.placeId,
            postalCode: companyProfile.postalCode,
            companyEmail: companyProfile.companyEmail,
            telephoneNo: companyProfile.telephoneNo,
            companyRegistration: companyProfile.companyRegistration,
          },
        });

        console.log('Company created successfully');

        setErrors({
          name: '',
          placeId: '',
          postalCode: '',
          companyEmail: '',
          telephoneNo: '',
          companyRegistration: '',
        });
        setValidationTriggered(false);
        setHasUnsavedChanges(false);

        console.log('Redirecting to Login page');
        router.push('/ ');

      } catch (error) {
        if (error instanceof Error) {
          console.error('Error creating company:', error.message);
        } else {
          console.error('An unknown error occurred:', error);
        }
      }
    } else {
      console.log('Validation failed. Please check the form for errors.');
      console.log('Validation Errors:', errors);

      // Additional logging for individual fields
      console.log('Name:', companyProfile.name);
      console.log('Place ID:', companyProfile.placeId);
      console.log('Postal Code:', companyProfile.postalCode);
      console.log('Company Email:', companyProfile.companyEmail);
      console.log('Telephone No:', companyProfile.telephoneNo);
      console.log('Company Registration:', companyProfile.companyRegistration);
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <form className={styles.form}>
          <div className={styles.companyprofileSection}>
            <h2 className={styles.heading}>Company Registration</h2>
            <br />
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
            <button className={styles.centeredButton} onClick={handleRegisterFirm} type="button">
              Register Firm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterFirm;
