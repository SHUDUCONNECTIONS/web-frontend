import { AppProps } from 'next/app';
import '../styles/globals.css';
import Navbar from '../src/Components/Navbar';
import Footer from '../src/Components/Footer';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
