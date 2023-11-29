import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faBars, faTimes } from '@fortawesome/free-solid-svg-icons'; // Added faBars and faTimes icons
import styles from './navfooter.module.css'; // Import the CSS module
import {
  faCar,
  faUser,
  faSignOut,
  faFileShield,
  faHandshake,
} from '@fortawesome/free-solid-svg-icons';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.menuIcon} onClick={toggleMenu}>
        {!isOpen ? (
          <FontAwesomeIcon className={styles.navIcon} icon={faBars} />
        ) : (
          <FontAwesomeIcon className={styles.navIcon} icon={faTimes} />
        )}
      </div>

      <ul className={`${styles.navList} ${isOpen ? styles.open : ''}`}>
        <Link className={`${styles.navItem} ${styles.centeredText}`} href="/">
          <Image src="/logo.png" alt="image" width="75" height="65" />
        </Link>

        <li className={styles.navItem}>
          <Link href="/Main" onClick={closeMenu}>
            <FontAwesomeIcon className={styles.navIcon} icon={faHouse} />
            <span>&nbsp;HOME</span>
          </Link>
        </li>

        <li className={styles.navItem}>
          <Link href="/link-to-desired-url" onClick={closeMenu}>
            <FontAwesomeIcon className={styles.navIcon} icon={faHandshake} />
            <span>&nbsp;CONSULTATION</span>
          </Link>
        </li>

        <li className={styles.navItem}>
          <Link href="/link-to-desired-url" onClick={closeMenu}>
            <FontAwesomeIcon className={styles.navIcon} icon={faCar} />
            <span>&nbsp;REQUEST PICK-UP</span>
          </Link>
        </li>

        <li className={styles.navItem}>
          <Link href="/terms-condition" onClick={closeMenu}>
            <FontAwesomeIcon className={styles.navIcon} icon={faFileShield} />
            <span>T&amp;C&rsquo;s</span>
          </Link>
        </li>

        <li className={styles.navItem}>
          <Link href="/account-profile" onClick={closeMenu}>
            <FontAwesomeIcon className={styles.navIcon} icon={faUser} />
            <span>&nbsp;PROFILE</span>
          </Link>
        </li>

        <li className={styles.navItem}>
          <Link href="/" onClick={closeMenu}>
            <FontAwesomeIcon className={styles.navIcon} icon={faSignOut} />
            <span>&nbsp;SIGN OUT</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
