import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css';

import { NavBarGeneral } from '../components/NavBarGeneral';
import { FooterGeneral } from '../components/FooterGeneral';

function MyApp({ Component, pageProps }: AppProps) {
  
  return (
    <>
      <NavBarGeneral />
      <Component {...pageProps} />
      <FooterGeneral />
    </>
  )
}

export default MyApp
