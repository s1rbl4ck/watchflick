import { jwtVerify } from "jose";

export const getJwtSecretKey = () => {
    const secret = process.env.JWT_SECRET_KEY;
    if (!secret || secret.length === 0) {
        throw new Error("The environment variable JWT_SECRET is not set.");
    }
    return secret;
};

export async function verifyToken(token) {
    if(token) {
        const verified = await jwtVerify(
            token,
            new TextEncoder().encode(getJwtSecretKey())
        );
        return verified?.payload?.issuer;
    }

    return null;
}