
import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import * as Yup from 'yup';
import { client } from './services/graphql.service';
import { LoginUser } from '../graphql/loginUser';
import { gql } from './services/graphql.service';

type Errors = {
  [key: string]: boolean;
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Please enter your email'),
  password: Yup.string().min(8, 'Password should be at least 8 characters long').required('Please enter your password'),
});


const Home = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [error, setError] = useState<string>('');

  const handleLogin = async () => {
    try {
      setError(''); // Clear previous error
      await validationSchema.validate({ email, password }, { abortEarly: true });

      const { data } = await client.mutate({
        mutation: LoginUser,
        variables: {
          email: email,
          password: password,
        },
      });

      if (data.login.user) {
        console.log("Welcome", email);
        router.push('/Main');
      } else {
        setError('Invalid credentials. Please try again.');
      }

    } catch (validationError) {
      if (validationError instanceof Yup.ValidationError) {
        const validationErrors: Errors = {};
        validationError.inner.forEach((error) => {
          if (error.path) {
            validationErrors[error.path] = true;
          }
        });
        setError('User not found. Please check your credentials.');
      } else {
        console.error(validationError);
        setError('An unexpected error occurred. Please try again later.');
      }
    }
  };

  const handleSignUp = () => {
    router.push('/signup');
  };

  const handleForgotPassword = () => {
    router.push('/forgot-password');
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

        {error && <div style={{ color: 'red', marginBottom: '30px', fontFamily: 'Arial, sans-serif' }}>{error}</div>}

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