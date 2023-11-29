import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import styles from './navfooter.module.css'; // Import the CSS module
import {
  faCar,
  faUser,
  faSignOut,
  faFileShield,
  faHandshake,
} from '@fortawesome/free-solid-svg-icons';

const Navbar: React.FC = () => {
  // Render navbar only if user is logged in

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <Link className={`${styles.navItem} ${styles.centeredText}`} href="/">
          <Image src="/logo.png" alt="image" width="75" height="65" />
        </Link>

        <li className={styles.navItem}>
          <Link href="/Main">
            <FontAwesomeIcon className={styles.navIcon} icon={faHouse} />
            <span>&nbsp;HOME</span>
          </Link>
        </li>

        <li className={styles.navItem}>
          <Link href="/link-to-desired-url">
            <FontAwesomeIcon className={styles.navIcon} icon={faHandshake} />
            <span>&nbsp;CONSULTATION</span>
          </Link>
        </li>

        <li className={styles.navItem}>
          <Link href="/link-to-desired-url">
            <FontAwesomeIcon className={styles.navIcon} icon={faCar} />
            <span>&nbsp;REQUEST PICK-UP</span>
          </Link>
        </li>

        <li className={styles.navItem}>
          <Link href="/terms-condition">
            <FontAwesomeIcon className={styles.navIcon} icon={faFileShield} />
            <span>&amp;T&amp;C&rsquo;s</span>
          </Link>
        </li>

        <li className={styles.navItem}>
          <Link href="/account-profile">
            <FontAwesomeIcon className={styles.navIcon} icon={faUser} />
            <span>&nbsp;PROFILE</span>
          </Link>
        </li>

        <li className={styles.navItem}>
          <Link href="/">
            <FontAwesomeIcon className={styles.navIcon} icon={faSignOut} />
            <span>&nbsp;SIGN OUT</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar; 
