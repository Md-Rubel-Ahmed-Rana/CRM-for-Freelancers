import "@/styles/globals.css";
import type { AppProps } from "next/app";
import store from "@/redux/store";
import "@/styles/globals.css";
import { NextPage } from "next";
import { ToastContainer } from "react-toastify";
import { ReactElement, ReactNode } from "react";
import { Provider } from "react-redux";

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <Provider store={store}>
      {getLayout(<Component {...pageProps} />)}
      <ToastContainer position="top-right" />
    </Provider>
  );
}
