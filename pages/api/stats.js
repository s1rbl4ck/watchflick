// * Database functions
import { findVideoIdByUser, insertStats, updateStats } from "@/lib/db/hasura";
import { verifyToken } from "@/lib/utils";

export default async function stats(req, res) {
    try {
        const token = req.cookies.token;
        // Check if the token is valid
        if (!token) {
            res.status(403).send({ msg: "Unauthorized" });
        } else {
            const params = req.method === 'POST' ? req.body : req.query
            const { videoId } = params;

            if (!videoId) res.status(400).send({ msg: "Video Id is required" });

            const userId = await verifyToken(token);

            const findVideo = await findVideoIdByUser(userId, videoId, token);
            const doesVideoExists = findVideo?.length > 0;

            if (req.method === "POST") {
                const { watched = true, favorite } = req.body;

                if (doesVideoExists) {
                    // Update the video stats
                    const response = await updateStats(
                        { watched, favorite, userId, videoId },
                        token
                    );
                    res.send({ done: true, response });
                } else {
                    // Create a new video stats
                    const response = await insertStats(
                        { watched, favorite, userId, videoId },
                        token
                    );
                    res.send({ done: true, response });
                }
            } else {
                if (doesVideoExists) {
                    res.send(findVideo);
                } else {
                    res.status(400).send({
                        done: false,
                        msg: "Video not found!",
                    });
                }
            }
        }
    } catch (error) {
        res.status(500).send({ done: false, error: error?.message });
    }
}
