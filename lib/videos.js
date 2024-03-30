import videoTestData from "../data/video.data.json";
import { getFavoriteVideosByUserId, getVideosByUserId } from "./db/hasura";

const fetchVideos = async (url) => {
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
    const BASE_URL = "youtube.googleapis.com/youtube/v3";

    const response = await fetch(
        `https://${BASE_URL}/${URL}&maxResults=15&key=${YOUTUBE_API_KEY}`
    );

    return await response.json();
}

export const getCommonVideos = async (url) => {
    try {
        const isDev = process.env.DEVELOPMENT;
        const data = isDev ? videoTestData : await fetchVideos(url);

        if (data?.error) {
            console.error("Youtube API Error ", data.error);
            return [];
        }

        return data.items.map((item) => {
            const id = item.id?.videoId || item.id;
            const snippet = item.snippet;
            return {
                id,
                title: snippet.title,
                description: snippet.description,
                image: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
                publishTime: snippet.publishedAt,
                channelTitle: snippet.channelTitle,
                statistics: item.statistics
                    ? item.statistics
                    : { viewCount: 0 },
            };
        });
    } catch (error) {
        console.error("Something went wrong while fetching videos: ", error);
        return [];
    }
};

export const getVideos = async (searchQuery) => {
    const URL = `search?part=snippet&q=${searchQuery}&type=video`;
    return getCommonVideos(URL);
};

export const getPopularVideos = async () => {
    const URL = `videos?part=snippet&part=contentDetails&part=statistics&chart=mostPopular&`;
    return getCommonVideos(URL);
};

export const getYoutubeVideoById = async (videoId) => {
    const URL = `videos?part=snippet&part=contentDetails&part=statistics&id=${videoId}`;
    return getCommonVideos(URL);
};

export const getWatchedVideos = async ({userId, token}) => {
    const videos = await getVideosByUserId({ userId }, token);

    return videos && videos.length > 0 ? videos.map((video) => {
        const {videoId} = video;
        return {
            id: videoId,
            image: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`
        }
    }) : []
}

export const getFavoriteVideos = async ({userId, token}) => {
    const videos = await getFavoriteVideosByUserId(userId, token);

    return videos && videos.length > 0 ? videos.map((video) => {
        const {videoId} = video;
        return {
            id: videoId,
            image: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`
        }
    }) : []
}