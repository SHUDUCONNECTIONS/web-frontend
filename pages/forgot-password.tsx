import { useState } from 'react';
import { useRouter } from 'next/router';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleResetPassword = () => {
    console.log('Reset password for:', email);
    router.push('/reset-password'); // Redirects to '/reset-password' page
  };

  const handleGoBack = () => {
    router.push('/'); // Redirects to the login page
  };

  return (
    <div className="container">
      <div className="form">
        <h1 className="title">FORGOT PASSWORD</h1>
        <div className="logo">
          <img src="/carerunnerlogo.png" alt="Your Logo" className="logo-image" />
        </div>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
        />
        <br />
        {error && <p className="error-message">{error}</p>}
        <button onClick={handleResetPassword} className="button">
          Reset Password
        </button>
        <br></br>
        <button onClick={handleGoBack} className="button">
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
