import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './navfooter.module.css'; // Import the CSS module

const Footer: React.FC = () => {
  return (
    <div className="footer">
      <nav className={styles.footer}>
        <span style={{ fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>
          <strong>SHUDU</strong>
        </span>
        <Link className="centered-text2" href="/menu">
          <Image src="/shudu.png" width="93" height="61" alt="Your alt text here" />
        </Link>
        <span style={{ fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>
          <strong>CONNECTIONS</strong>
        </span>
      </nav>
    </div>
  );
};

export default Footer;

