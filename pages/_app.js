import { magic } from "@/lib/magic-client";
import "@/styles/globals.css";
import { NextUIProvider, Spinner } from "@nextui-org/react";
import { Roboto_Slab } from "next/font/google";
import { useRouter } from "next/router";
import NextNProgress from "nextjs-progressbar";
import { Suspense, useEffect, useState } from "react";

const font = Roboto_Slab({ subsets: ["latin"], variable: "--font-slab" });

export default function App({ Component, pageProps }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    const handleUserLoggedIn = async () => {
        try {
            const isLoggedIn = await magic.user.isLoggedIn();

            if (isLoggedIn) {
                router.push("/");
            } else {
                router.push("/auth");
            }
        } catch (error) {
            router.push("/auth");
        }
    };

    useEffect(() => {
        handleUserLoggedIn();
    }, []);

    useEffect(() => {
        const handleComplete = () => {
            setIsLoading(false);
        };

        router.events.on("routeChangeComplete", handleComplete);
        router.events.on("routeChangeError", handleComplete);

        return () => {
            router.events.off("routeChangeComplete", handleComplete);
            router.events.off("routeChangeError", handleComplete);
        };
    }, []);

    const LoadingScreen = () => (
        <div className="bg-black text-white w-screen h-screen flex flex-col gap-5 justify-center items-center">
            <Spinner color="danger" size="lg" />
            <h4 className="text-white text-2xl font-bold">WatchFlick</h4>
        </div>
    );

    return (
        <NextUIProvider className={font.className}>
            {!isLoading ? (
                <>
                    <NextNProgress
                        color="#e50914"
                        startPosition={0.3}
                        stopDelayMs={200}
                        height={4}
                        showOnShallow={true}
                    />
                    <Component {...pageProps} />
                </>
            ) : (
                <LoadingScreen />
            )}
        </NextUIProvider>
    );
}
