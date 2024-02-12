import Banner from "@/components/banner/banner.component";
import CustomNavbar from "@/components/navbar/navbar.component";
import SectionCard from "@/components/sectionCard/sectionCard.component";
import { Roboto_Slab } from "next/font/google";
import Head from "next/head";
import { useState } from "react";
import moviesData from "../data/movies.data.json";

const slab = Roboto_Slab({ subsets: ["latin"], variable: "--font-slab" });

export default function Home() {
    const [loading, setLoading] = useState(false);

    const cards = moviesData;

    return (
        <main className={` ${slab.className}`}>
            <Head>
                <title>Netflix</title>
                <meta name="description" content="A mini Netflix platform" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <CustomNavbar />
            <Banner
                title="Clifford the red dog"
                subTitle="a very cute dog"
                imgUrl=""
            />

            <SectionCard title="Top 10 Movies" items={cards} />
        </main>
    );
}
