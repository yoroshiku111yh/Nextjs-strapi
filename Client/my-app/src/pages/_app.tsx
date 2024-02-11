import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import "@/styles/globals.css";
import "@/styles/common.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
