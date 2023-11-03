import { useState } from 'react';
import { useRouter } from 'next/router';
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
      // Perform login actions
      console.log('Username:', username);
      console.log('Password:', password);
      setError('');
    } catch (err: any) {
      if (err.name === 'ValidationError') {
        setError(err.errors[0]);
      }
    }
  };

  const handleSignUp = () => {
    router.push('/signup'); // Replace '/signup' with the route of your sign-up page
  };

  return (
    <div className="container">
      <div className="form">
        <h1 className="title">LOGIN</h1>
        <div className="logo">
          <img src="/carerunnerlogo.png" alt="Your Logo" className="logo-image" />
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
      </div>
    </div>
  );
};

export default Home;
