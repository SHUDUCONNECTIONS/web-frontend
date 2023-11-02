import { useState } from 'react';
import { useRouter } from 'next/router';

const Home = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!username || !password) {
      setError('Please enter both username and password');
    } else if (password.length < 6) {
      setError('Password should be at least 6 characters long');
    } else {
      // Perform login actions
      console.log('Username:', username);
      console.log('Password:', password);
      setError('');
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
        <br></br>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        />
        <br></br>
        {error && <p className="error-message">{error}</p>}
        <button onClick={handleLogin} className="loginButton">
          Login
        </button>
        <br></br>
        <button onClick={handleSignUp} className="signUpButton">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Home;
