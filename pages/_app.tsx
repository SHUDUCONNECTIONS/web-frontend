import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Navbar from '../src/Components/Navbar';
import Footer from '../src/Components/Footer';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
 const router = useRouter();

 return (
    <>
      {router.pathname !== '/' && router.pathname !== '/signup' && <Navbar />}
      <Component {...pageProps} />
      {router.pathname !== '/' && router.pathname !== '/signup' && <Footer />}
    </>
 );
}

export default MyApp;