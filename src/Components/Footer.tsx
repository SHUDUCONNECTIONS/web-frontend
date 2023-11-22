import React from 'react';
import './Footer.css';
import styles from '../styles/menu2.module.css'; // Import the CSS module

const Footer: React.FC = () => {
  return (
    <div className="footer">
      <nav className={styles.footer}>
        <li className={styles.navItem2}>
          <a>
            <span>
              <strong>SHUDU</strong>
            </span>
          </a>
        </li>
        <a className="centered-text2" href="/menu">
          <img src="/shudu.png" width="90" />
        </a>
        <li className={styles.navItem2}>
          <a>
            <span>
              <strong>CONNECTIONS</strong>
            </span>
          </a>
        </li>
      </nav>
    </div>
  );
};

export default Footer;
