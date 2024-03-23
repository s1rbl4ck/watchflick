import jwt from "jsonwebtoken";
import { magicAdmin } from "@/lib/magic";
import { isNewUser, createNewUser } from "@/lib/db/hasura";
import { setTokenCookie } from "@/lib/cookies";

export default async function login(req, res) {
    if (req.method === "POST") {
        try {
            const auth = req.headers.authorization;
            const didToken = auth ? auth.substr(7) : "";
            // Invoke magic
            const metaData = await magicAdmin.users.getMetadataByToken(
                didToken
            );

            // Create Jwt
            const token = jwt.sign(
                {
                    ...metaData,
                    iat: Math.floor(Date.now() / 1000),
                    exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
                    "https://hasura.io/jwt/claims": {
                        "x-hasura-allowed-roles": ["user", "admin"],
                        "x-hasura-default-role": "user",
                        "x-hasura-user-id": `${metaData.issuer}`,
                    },
                },
                process.env.JWT_SECRET_KEY
            );

            // Check if user exists
            const isNewUserQuery = await isNewUser(token, metaData.issuer);

            isNewUserQuery && await createNewUser(token, metaData);
            setTokenCookie(token, res);
            res.send({ done: true});
        } catch (error) {
            res.status(500).send({ done: false });
            console.error("Something went wrong: ", error);
        }
    } else {
        res.send({ done: false });
    }
}
