import CustomNavbar from "@/components/navbar/navbar.component";
import SectionCard from "@/components/sectionCard/sectionCard.component";
import useUserInfo from "@/hooks/useUserInfo";
import { getFavoriteVideos } from "@/lib/videos";
import Head from "next/head";

export async function getServerSideProps(context) {
    const { userId, token } = await useUserInfo(context);

    const favoriteVideos = await getFavoriteVideos({ userId, token });

    return {
        props: {
            favoriteVideos,
        },
    };
}

const MyList = ({favoriteVideos}) => {
    return (
        <div className="h-full">
            <Head>
                <title>My List</title>
            </Head>
            <main className="mt-20">
                <CustomNavbar />
                <SectionCard title="My Favorite Videos" items={favoriteVideos} isSlider={false} />
            </main>
        </div>
    );
};

export default MyList;
