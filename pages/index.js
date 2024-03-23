import Head from "next/head";
import Banner from "@/components/banner/banner.component";
import { CARD_ORIENTATION } from "@/components/card/card.component";
import CustomNavbar from "@/components/navbar/navbar.component";
import SectionCard from "@/components/sectionCard/sectionCard.component";
import { getVideos, getPopularVideos } from "@/lib/trailers";
// * Data
import homeNavbarItems from "@/data/navbar.data.json";

export async function getServerSideProps() {
    const disneyVideos = await getVideos("Disney trailer");
    const productivityVideos = await getVideos("Productivity");
    const popularSeries = await getVideos("Recent Series trailer");
    const popularVideos = await getPopularVideos();

    return {
        props: {
            disneyVideos,
            productivityVideos,
            popularSeries,
            popularVideos,
        },
    };
}

export default function Home({
    disneyVideos,
    productivityVideos,
    popularSeries,
    popularVideos,
}) {
    return (
        <>
            <Head>
                <title>Netflix</title>
                <meta name="description" content="A mini Netflix platform" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <CustomNavbar navItems={homeNavbarItems} blur={true} />
            <Banner
                title="Clifford the red dog"
                subTitle="a very cute dog"
                imgUrl="https://images.unsplash.com/photo-1621955964441-c173e01c135b?q=80&w=886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                videoId="__mSgDEOyv8"
            />

            <div className="flex flex-col gap-30">
                <SectionCard title="Popular Series" items={popularSeries} />
                <SectionCard title="Most Trends" items={popularVideos} />
                <SectionCard
                    title="Disney"
                    items={disneyVideos}
                    orientation={CARD_ORIENTATION.PORTRAIT}
                />
                <SectionCard
                    title="Productivity"
                    items={productivityVideos}
                    orientation={CARD_ORIENTATION.PORTRAIT}
                />
            </div>
        </>
    );
}
