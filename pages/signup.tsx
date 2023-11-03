import { useState } from 'react';
import { useRouter } from 'next/router';
import * as Yup from 'yup';

type Errors = {
  [key: string]: string;
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
    firstName: '',
    lastName: '',
    contactNumber: '',
    email: '',
    physicalAddress: '',
    password: '',
    confirmPassword: '',
  });

  const schema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    contactNumber: Yup.string().required('Contact number is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    physicalAddress: Yup.string().required('Physical address is required'),
    password: Yup.string()
      .min(8, 'Password should be at least 8 characters long')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Please confirm your password'),
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
      // Rest of the logic for handleSignUp function
      router.push('/signup');
    } catch (validationError) {
      if (validationError instanceof Yup.ValidationError) {
        const validationErrors: Errors = {};
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
          <img src="/carerunnerlogo.png" alt="Your Logo" className="logo-image" />
        </div>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="input"
        />
        <br />
        {errors.firstName && <p className="error-message">{errors.firstName}</p>}
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="input"
        />
        <br />
        {errors.lastName && <p className="error-message">{errors.lastName}</p>}
        <input
          type="text"
          placeholder="Contact Number"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          className="input"
        />
        <br />
        {errors.contactNumber && <p className="error-message">{errors.contactNumber}</p>}
        <input
          type="text"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
        />
        <br />
        {errors.email && <p className="error-message">{errors.email}</p>}
        <input
          type="text"
          placeholder="Physical Address"
          value={physicalAddress}
          onChange={(e) => setPhysicalAddress(e.target.value)}
          className="input"
        />
        <br />
        {errors.physicalAddress && <p className="error-message">{errors.physicalAddress}</p>}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        />
        <br />
        {errors.password && <p className="error-message">{errors.password}</p>}
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="input"
        />
        {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
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
