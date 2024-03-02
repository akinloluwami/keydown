import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "sonner";
import "tippy.js/dist/tippy.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Toaster richColors position="top-center" duration={2000} />
      <Component {...pageProps} />;
    </>
  );
}
