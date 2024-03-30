import CustomNavbar from "@/components/navbar/navbar.component";
import { getYoutubeVideoById } from "@/lib/videos";
import { Card, CardBody, ScrollShadow } from "@nextui-org/react";
import { useRouter } from "next/router";
import homeNavbarItems from "@/data/navbar.data.json";
import LikeAndDislikeButton, {
    ACTION_TYPE,
} from "@/components/likeAndDislikeButton/likeAndDislikeButton.component.jsx";
import { useEffect, useState } from "react";
import Head from "next/head";

export async function getStaticProps(context) {
    const { videoId } = context.params;

    let video = await getYoutubeVideoById(videoId);

    video = video.length > 0 ? video[0] : {};

    return {
        props: {
            video,
        },
        revalidate: 10, // In Seconds
    };
}

export async function getStaticPaths() {
    const listOfVideos = ["uYPbbksJxIg", "Oc-AsN7d1wg", "8ZYhuvIv1pA"];

    const paths = listOfVideos.map((videoId) => ({
        params: { videoId },
    }));

    return { paths, fallback: "blocking" };
}

const Video = ({ video }) => {
    const router = useRouter();
    const { videoId } = router.query;
    const [like, setLike] = useState(false);
    const [dislike, setDislike] = useState(false);

    const {
        title,
        publishTime,
        description,
        channelTitle,
        statistics: { viewCount } = { viewCount: 0 },
    } = video;

    useEffect(() => {
        const fetchStats = async () => {
            const res = await fetch(`/api/stats?videoId=${videoId}`, {
                method: "GET",
            });
    
            let data = await res.json();

            if(data.length > 0) {
                const { favorite } = data[0];
                setLike(favorite);
                setDislike(!favorite);
            }
        };

        fetchStats();
    }, []);

    const handleLikeAndDislike = async (type) => {
        setLike(type === ACTION_TYPE.LIKE);
        setDislike(type === ACTION_TYPE.DISLIKE);

        // Return action type as Int instead of Boolean
        const res = await ratingActionService(+(type === ACTION_TYPE.LIKE));

        if (!res.done || res?.response?.errors) {
            setLike(false);
            setDislike(false);
        }
    };

    const ratingActionService = async (favorite) => {
        const res = await fetch("/api/stats", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                videoId,
                favorite,
            }),
        });

        return await res.json();
    };

    const VideoDetails = ({ title, value }) => (
        <div className="flex flex-row gap-2">
            <span className="text-sm text-gray-400">{title}:</span>
            <span className="text-sm text-white">{value}</span>
        </div>
    );

    return (
        <div className="bg-black h-full">
            <Head>
                <title>{title}</title>
            </Head>
            <CustomNavbar navItems={homeNavbarItems} blur={true} />
            <div className="container m-auto py-20 flex flex-col gap-4">
                <Card className="bg-gray-900 m-auto w-full">
                    <CardBody className="p-2">
                        <iframe
                            className="rounded-lg"
                            id="player"
                            type="text/html"
                            width="100%"
                            height="480"
                            src={`http://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=http://example.com&controls=0&rel=0`}
                            frameborder="0"
                        ></iframe>
                    </CardBody>
                </Card>
                <div className="flex flex-row gap-4 h-full">
                    <Card className="flex-1 bg-gray-900">
                        <CardBody className="p-4">
                            <div className="mb-5">
                                <div className="flex flex-row flex-wrap justify-between">
                                    <h2 className="text-3xl font-bold text-white mb-2">
                                        {title}
                                    </h2>
                                    <div className="flex flex-row gap-3">
                                        <LikeAndDislikeButton
                                            actionType={ACTION_TYPE.LIKE}
                                            isSelected={like}
                                            onClick={() =>
                                                handleLikeAndDislike(
                                                    ACTION_TYPE.LIKE
                                                )
                                            }
                                        />
                                        <LikeAndDislikeButton
                                            actionType={ACTION_TYPE.DISLIKE}
                                            isSelected={dislike}
                                            onClick={() =>
                                                handleLikeAndDislike(
                                                    ACTION_TYPE.DISLIKE
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                                <span className="text-sm text-white">
                                    {publishTime}
                                </span>
                            </div>
                            <ScrollShadow
                                hideScrollBar
                                className="w-[100%] h-[200px]"
                            >
                                <p className="text-md text-white">
                                    {description}
                                </p>
                            </ScrollShadow>
                        </CardBody>
                    </Card>
                    <Card className="w-3/12 bg-gray-900">
                        <CardBody className="p-4 flex flex-col gap-2">
                            <VideoDetails title="Cast" value={channelTitle} />
                            <VideoDetails
                                title="View Count"
                                value={parseInt(viewCount).toLocaleString()}
                            />
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Video;
