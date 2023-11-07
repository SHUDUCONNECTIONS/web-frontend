import { useState } from 'react';
import { useRouter } from 'next/router';
import * as Yup from 'yup';

const ForgotPassword = () => {
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    code: Yup.string().required('Code is required'),
    newPassword: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword')], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const handleResetPassword = () => {
    validationSchema
      .validate({ code, newPassword, confirmPassword })
      .then(() => {
        console.log('Reset password');
        // Add your password reset logic here
      })
      .catch((err) => setError(err.message));
  };

  const handleResendCode = () => {
    // Add your resend code logic here
  };

  const handleGoBack = () => {
    router.push('/'); // Replace '/' with the route of your login page
  };

  return (
    <div className="container">
      <div className="form">
        <h1 className="title">RESET PASSWORD</h1>
        <div className="logo">
          <img src="/carerunnerlogo.png" alt="Your Logo" className="logo-image" />
        </div>
        
        <input
          type="text"
          placeholder="Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="input"
        />
        <br></br>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="input"
        />
        <br></br>
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="input"
        />
        {error && <p className="error-message">{error}</p>}
        <br></br>
        <button onClick={handleResetPassword} className="button">
          Submit
        </button>
        <br />
        <button onClick={handleResendCode} className="button">
          Resend Code
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
