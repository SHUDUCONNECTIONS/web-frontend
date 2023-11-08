import { useState } from 'react';
import { useRouter } from 'next/router';
import * as Yup from 'yup';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
  });

  const handleResetPassword = () => {
    validationSchema
      .validate({ email })
      .then(() => {
        console.log('Reset password');
        // Add your password reset logic here
      })
      .catch((err) => setError(err.message));
  };

  const handleGoBack = () => {
    router.push('/'); // Replace '/' with the route of your login page
  };

  return (
    <div className="container">
      <div className="form">
        <h1 className="title">FORGOT PASSWORD</h1>
        <div className="logo">
          <img src="/carerunnerlogo.png" alt="Your Logo" className="logo-image" />
        </div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
        />
        {error && <p className="error-message">{error}</p>}
        <br />
        <button onClick={handleResetPassword} className="button">
          Reset Password
        </button>
        <br />
      </div>
    </div>
  );
};

export default ForgotPassword;
