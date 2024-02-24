import "@/styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { Roboto_Slab } from "next/font/google";
import NextNProgress from 'nextjs-progressbar';

const font = Roboto_Slab({ subsets: ["latin"], variable: "--font-slab" });

export default function App({ Component, pageProps }) {
    return (
        <NextUIProvider className={font.className}>
            <NextNProgress color="#e50914" startPosition={0.3} stopDelayMs={200} height={4} showOnShallow={true} />
            <Component {...pageProps} />
        </NextUIProvider>
    );
}
