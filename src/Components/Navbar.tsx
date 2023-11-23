import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import styles from './navfooter.module.css'; // Import the CSS module
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

const Navbar: React.FC = () => {
  return (
        <nav className={styles.navbar}>
          <ul className={styles.navList}>
            <a className="centered-text" href="/">
              <img src="/logo.png" width="75" />
            </a>

            <li className={styles.navItem}>
              <a href="/menu">
                <FontAwesomeIcon icon={faHouse} />
                <span>  HOME</span>
              </a>
            </li>

            <li className={styles.navItem}>
              <a href="/link-to-desired-url">
                <FontAwesomeIcon icon={faHandshake} />
                <span>  CONSULTATION</span>
              </a>
            </li>

            <li className={styles.navItem}>
              <a href="/link-to-desired-url">
                <FontAwesomeIcon icon={faCar} />
                <span>  REQUEST PICK-UP</span>
              </a>
            </li>

            <li className={styles.navItem}>
              <a href="/link-to-desired-url">
                <FontAwesomeIcon icon={faFileShield} />
                <span>  T's & C's</span>
              </a>
            </li>

            <li className={styles.navItem}>
              <a href="/link-to-desired-url">
                <FontAwesomeIcon icon={faUser} />
                <span>  PROFILE</span>
              </a>
            </li>

            <li className={styles.navItem}>
              <a href="/index">
                <FontAwesomeIcon icon={faSignOut} />
                <span>  SIGN OUT</span>
              </a>
            </li>
          </ul>
        </nav>
  );
};

export default Navbar;