
import { useState } from 'react';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import Image from 'next/image';
import '../styles/globals.css';

import { useMutation, gql, ApolloClient, InMemoryCache } from '@apollo/client';


const client = new ApolloClient({
  uri: 'https://sea-lion-app-j3oyi.ondigitalocean.app/graphql',
  cache: new InMemoryCache()
});


const REGISTER_USER = gql`
  mutation RegisterUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $cellphone: String!
    $password: String!
    $type: String!
  ) {
    registerUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      cellphone: $cellphone
      password: $password
      type: $type
    ) {
      user {
        id
        firstName
        lastName
        cellphone
        type
        verified
        email
      }
      errors {
        field
        message
      }
    }
  }
`;

const SignupForm = () => {
  const [registerUser] = useMutation(REGISTER_USER);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [cellphone, setCellphone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    cellphone?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const handleSignUp = async () => {
    const schema = Yup.object().shape({
      firstName: Yup.string().required(),
      lastName: Yup.string().required(),
      cellphone: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(8).required(),
      confirmPassword: Yup.string().oneOf([Yup.ref('password')]).required(),
    });

    try {
      await schema.validate({
        firstName, lastName, cellphone, email, password, confirmPassword,
      }, { abortEarly: false });

      setErrors({}); 

      const { data } = await registerUser({
        variables: {firstName, lastName, email, cellphone,
          password,
          type: 'driver'
        },
      });


      if (data && data.registerUser && data.registerUser.user) {
        router.push('/Main');
      }
    } catch (validationError: any) {
      console.error('Validation error:', validationError); 
    
      if (validationError instanceof Yup.ValidationError) {
        const validationErrors: { [key: string]: string } = {};
        validationError.inner.forEach((error) => {
          if (error.path) {
            validationErrors[error.path] = error.message;
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
          <Image src="/carerunnerlogo.png" width="75" height="75" alt="Your Logo" className="logo-Image" />
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
          type="text"
          placeholder="Cellphone"
          value={cellphone}
          onChange={(e) => setCellphone(e.target.value)}
          className={`input ${errors.cellphone && 'error'}`}
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

export default SignupForm;