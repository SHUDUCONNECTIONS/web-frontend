// Import React and other necessary libraries
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import * as Yup from 'yup';

type Errors = {
  [key: string]: boolean;
};

const Home = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [physicalAddress, setPhysicalAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();
  const [errors, setErrors] = useState<Errors>({
    firstName: false,
    lastName: false,
    contactNumber: false,
    email: false,
    physicalAddress: false,
    password: false,
    confirmPassword: false,
  });

  const schema = Yup.object().shape({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    contactNumber: Yup.string().required(),
    email: Yup.string().email().required(),
    physicalAddress: Yup.string().required(),
    password: Yup.string().min(8).required(),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')]).required(),
  });

  const handleSignUp = async () => {
    try {
      await schema.validate(
        {
          firstName,
          lastName,
          contactNumber,
          email,
          physicalAddress,
          password,
          confirmPassword,
        },
        { abortEarly: false }
      );

      // Reset errors
      setErrors({
        firstName: false,
        lastName: false,
        contactNumber: false,
        email: false,
        physicalAddress: false,
        password: false,
        confirmPassword: false,
      });

      // Rest of the logic for handleSignUp function
      router.push('/signup');
    } catch (validationError) {
      if (validationError instanceof Yup.ValidationError) {
        const validationErrors: Errors = {};
        validationError.inner.forEach((error) => {
          if (error.path) {
            validationErrors[error.path] = true;
          }
        });
        setErrors(validationErrors);
      }
    }
  };

  const handleLogin = () => {
    router.push('/');
  };

  return (
    <div className="container">
      <div className="form">
        <h1 className="title">SIGN UP</h1>
        <div className="logo">
          <img src="/carerunnerlogo.png" alt="Your Logo" className="logo-image" />
        </div>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className={`input ${errors.firstName && 'error'}`}
        />
        <br />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className={`input ${errors.lastName && 'error'}`}
        />
        <br />
        <input
          type="text"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`input ${errors.email && 'error'}`}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`input ${errors.password && 'error'}`}
        />
        <br />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={`input ${errors.confirmPassword && 'error'}`}
        />
        <br />
        <button onClick={handleSignUp} className="signUpButton">
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
