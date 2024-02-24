import "@/styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { Roboto_Slab } from "next/font/google";

const font = Roboto_Slab({ subsets: ["latin"], variable: "--font-slab" });

export default function App({ Component, pageProps }) {
    return (
        <NextUIProvider className={font.className}>
            <Component {...pageProps} />
        </NextUIProvider>
    );
}
