import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import * as yup from 'yup';
import { client } from './services/graphql.service';
import { RegisterUser } from '../graphql/registerUser';

type Errors = {
  [key: string]: boolean | string;
};

const Home = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();
  const [errors, setErrors] = useState<Errors>({
    firstName: false,
    lastName: false,
    contactNumber: false,
    email: false,
    password: false,
    confirmPassword: false,
    emailInUse: false,
    cellphoneInUse: false,
  });

  const validationSchema = yup.object().shape({
    firstName: yup.string().required('Please enter your First Name'),
    lastName: yup.string().required('Please enter your Last Name'),
    contactNumber: yup
      .string()
      .matches(/^\d{10}$/, 'Phone number must be 10 digits')
      .required('Please enter your Contact Number'),
    email: yup.string().email('Please enter a valid Email').required('Please enter your Email'),
    password: yup.string().min(8, 'Password should be at least 8 characters Long').required('Please enter your Password'),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must Match').required('Please Confirm your Password'),
  });

  const resetFieldErrors = () => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      emailInUse: false,
      cellphoneInUse: false,
      email: false,
      contactNumber: false,
    }));
  };

  const handleSignup = async () => {
    try {
      resetFieldErrors();

      await validationSchema.validate(
        {
          firstName,
          lastName,
          contactNumber,
          email,
          password,
          confirmPassword,
        },
        { abortEarly: false }
      );

      console.log("trying to register", firstName, lastName, contactNumber, email, password);

      try {
        const { data } = await client.mutate({
          mutation: RegisterUser,
          variables: {
            firstName,
            lastName,
            contactNumber,
            email,
            password,
            type: 'COMPANY_ADMIN',
            cellphone: contactNumber,
          },
        });

        console.log(data);

        if (data && data.registerUser && data.registerUser.errors.length > 0) {
          const serverErrors = data.registerUser.errors;

          serverErrors.forEach((error: { field: string; message: string }) => {
            const { field, message } = error;

            if (field === 'email') {
              setErrors((prevErrors) => ({ ...prevErrors, emailInUse: message, email: message }));
            } else if (field === 'cellphone') {
              setErrors((prevErrors) => ({ ...prevErrors, cellphoneInUse: message, contactNumber: message }));
            }
          });
        } else if (data && data.registerUser && data.registerUser.user !== null) {
          console.log("Registration successful:", data);
          router.push('/registerFirm');
        }
      } catch (registrationError: any) {
        if (registrationError.networkError) {
          console.error('Network error:', registrationError.networkError);
          if (registrationError.networkError.response) {
            console.log('Response:', registrationError.networkError.response);
          }
        } else {
          console.error('Other error:', registrationError);
        }
      }
    } catch (validationError) {
      console.error('Validation error:', validationError);

      if (validationError instanceof yup.ValidationError) {
        const newErrors = {} as typeof errors;

        validationError.inner.forEach((error) => {
          newErrors[error.path as keyof typeof errors] = error.message;
        });

        setErrors(newErrors);
      }
    }
  };

  const handleLogin = () => {
    router.push('/');
  };

  const handleInputFocus = (fieldName: keyof Errors) => {
    // Reset the specific error when the input field is clicked
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: false,
    }));
  };

  return (
    <div className="container">
      <div className="form">
        <h1 className="title">SIGN UP</h1>
        <div className="logo">
          <Image src="/carerunnerlogo.png" width="75" height="75" alt="Your Logo" className="logo-Image" />
        </div>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          onFocus={() => handleInputFocus('firstName')}
          className={`input ${errors.firstName && 'error'}`}
        />
        {errors.firstName && <p className="error-message1">{errors.firstName}</p>}
        <br />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          onFocus={() => handleInputFocus('lastName')}
          className={`input ${errors.lastName && 'error'}`}
        />
        {errors.lastName && <p className="error-message1">{errors.lastName}</p>}
        <br />
        <input
          type="text"
          placeholder="Contact Number"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          onFocus={() => handleInputFocus('contactNumber')}
          className={`input ${errors.contactNumber && 'error'}`}
        />
        {errors.contactNumber && <p className="error-message">{errors.contactNumber}</p>}
        <br />
        <input
          type="text"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => handleInputFocus('email')}
          className={`input ${errors.email && 'error'}`}
        />
        {errors.email && <p className="error-message2">{errors.email}</p>}
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => handleInputFocus('password')}
          className={`input ${errors.password && 'error'}`}
        />
        {errors.password && <p className="error-message3">{errors.password}</p>}
        <br />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onFocus={() => handleInputFocus('confirmPassword')}
          className={`input ${errors.confirmPassword && 'error'}`}
        />
        {errors.confirmPassword && <p className="error-message4">{errors.confirmPassword}</p>}
        <br />
        <button onClick={handleSignup} className="signUpButton">
          Sign Up
        </button>
        <p className="already-account">
          Already have an account?{' '}
          <span className="login-link" onClick={handleLogin}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Home;
