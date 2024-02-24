export const getCommonVideos = async (URL) => {
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

    try {
        const BASE_URL = "youtube.googleapis.com/youtube/v3";
        const response = await fetch(
            `https://${BASE_URL}/${URL}&maxResults=15&key=${YOUTUBE_API_KEY}`
        );

        const data = await response.json();

        if(data?.error) {
            console.error("Youtube API Error ", data.error);
            return [];
        }
        
        return data.items.map((item) => {
            const id = item.id?.videoId || item.id;
            return {
                id,
                title: item.snippet.title,
                description: item.snippet.description,
                image: item.snippet.thumbnails.high.url,
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
}