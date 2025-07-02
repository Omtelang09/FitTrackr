// File: pages/_app.js
//import '../styles/home.css';  // ✅ Move it here
import '../styles/global.css';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
