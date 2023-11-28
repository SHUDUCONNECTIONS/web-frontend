import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import * as Yup from 'yup';

const Home = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [error, setError] = useState<string>('');

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Please enter your username'),
    password: Yup.string()
      .min(8, 'Password should be at least 8 characters long')
      .required('Please enter your password'),
  });

  const handleLogin = async () => {
    try {
      await validationSchema.validate({ username, password }, { abortEarly: false });
      // Replace the console logs with your login logic
      if (username === 'example' && password === 'password') {
        router.push('/Main'); // Replace '/menu' with the route of your menu page
      } else {
        setError('Incorrect username or password');
      }
    } catch (err: any) {
      if (err.name === 'ValidationError') {
        setError(err.errors[0]);
      }
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
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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