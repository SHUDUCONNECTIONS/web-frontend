import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Navbar from '../src/Components/Navbar';
import Footer from '../src/Components/Footer';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const excludePages = ['/', '/signup', '/forgot-password', '/registerFirm'];

  return (
    <>
      {!excludePages.includes(router.pathname) && <Navbar />}
      <Component {...pageProps} />
      {!excludePages.includes(router.pathname) && <Footer />}
    </>
  );
}

export default MyApp;
 