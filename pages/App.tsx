import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/menu2.module.css'; // Import the CSS module
import {
  faCar,
  faFileUpload,
  faFolder,
  faUser,
  faUserShield,
  faMoneyBill,
  faSignOut,
  faFileShield,
  faHandshake,
} from '@fortawesome/free-solid-svg-icons';


import Navbar from '../src/Components/Navbar';
import Home from '../pages/Home';
import Footer from '../src/Components/Footer';

const App: React.FC = () => { 
  return (
    <React.Fragment>
      <Navbar />
      <Home />
      <Footer />
    </React.Fragment>
  );
};

export default App;
