import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useMutation, gql } from '@apollo/client';
import * as Yup from 'yup';

const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        firstName
        lastName
        cellphone
        type
        verified
        email
      }
      token
      errors {
        field
        message
      }
    }
  }
`;

const Home = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [error, setError] = useState<string>('');

  const [loginUser] = useMutation(LOGIN_USER);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Please enter your email'),
    password: Yup.string().min(8, 'Password should be at least 8 characters long').required('Please enter your password'),
  });

  const handleLogin = async () => {
    try {
      await validationSchema.validate({ email, password }, { abortEarly: false });

      const { data } = await loginUser({
        variables: { email, password },
      });

      const loginResponse = data.login;

      if (loginResponse.errors) {
        setError(loginResponse.errors[0].message);
      } else {
        // Login successful, you may want to store the token or user information
        router.push('/Main'); // Replace '/Main' with the route of your menu page
      }
    } catch (err: any) {
      console.error('Login error:', err.message);
      setError('An error occurred during login. Please try again.');
    }
  };

  const handleSignUp = () => {
    router.push('/signup'); // Replace '/signup' with the route of your sign-up page
  };

  const handleForgotPassword = () => {
    router.push('/forgot-password'); // Replace '/forgotpassword' with the route of your forgot password page
  };

  return (
    <div className="container">
      <div className="form">
        <h1 className="title">LOGIN</h1>
        <div className="logo">
          <Image src="/carerunnerlogo.png" width="75" height="75" alt="Your Logo" className="logo-Image" />
        </div>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        />
        <br />
        {error && <p className="error-message">{error}</p>}
        <button onClick={handleLogin} className="loginButton">
          Login
        </button>
        <br />
        <button onClick={handleSignUp} className="signUpButton">
          Sign Up
        </button>
        <p className="forgotPassword" onClick={handleForgotPassword}>
          Forgot Password?
        </p>
      </div>
    </div>
  );
};

export default Home;
