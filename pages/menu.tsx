import { useState } from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCar,
  faFileUpload,
  faFolder,
  faUser,
  faUserShield,
  faMoneyBill,
  faBars
} from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const router = useRouter();
  const [error, setError] = useState<string>('');

  const handleLogin = () => {
    // Replace this logic with your own login implementation
    console.log('Performing login actions');
    setError('');
  };

  const handleSignUp = () => {
    // Replace '/signup' with the route of your sign-up page
    router.push('/signup');
  };

  return (
    <div className="container">
      <div className="form">
        <div className="logo">
          <img src="/carerunnerlogo.png" alt="Your Logo" className="logo-image" />
        </div>

        <button onClick={() => console.log('Button 1 clicked')} className="button-menu">
          <span className="icon">
            <FontAwesomeIcon icon={faCar} />
          </span>
          <span className="button-text">Pick Up Request</span>
        </button>
        <br />
        <button onClick={() => console.log('Button 2 clicked')} className="button-menu">
          <span className="icon">
            <FontAwesomeIcon icon={faFileUpload} />
          </span>
          <span className="button-text">Upload Case</span>
        </button>
        <br />
        <button onClick={() => console.log('Button 3 clicked')} className="button-menu">
          <span className="icon">
            <FontAwesomeIcon icon={faFolder} />
          </span>
          <span className="button-text">Firm Records</span>
        </button>
        <br />
        <button onClick={() => console.log('Button 4 clicked')} className="button-menu">
          <span className="icon">
            <FontAwesomeIcon icon={faUser} />
          </span>
          <span className="button-text">Account Profile</span>
        </button>
        <br />
        <button onClick={() => console.log('Button 5 clicked')} className="button-menu">
          <span className="icon">
            <FontAwesomeIcon icon={faUserShield} />
          </span>
          <span className="button-text">Membership Access</span>
        </button>
        <br />
        <button onClick={() => console.log('Button 6 clicked')} className="button-menu">
          <span className="icon">
            <FontAwesomeIcon icon={faMoneyBill} />
          </span>
          <span className="button-text">Billing Information</span>
        </button>
      </div>
    </div>
  );
};

export default Home;
