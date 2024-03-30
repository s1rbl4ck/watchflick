/*
This is an example snippet - you should consider tailoring it
to your service.
*/

export async function insertStats(
    { favorite, userId, videoId, watched },
    token
) {
    const operationsDoc = `
        mutation insertStats($favorite: Int!, $userId: String!, $videoId: String!, $watched: Boolean!) {
            insert_stats_one(
                object: {
                    favorite: $favorite,
                    userId: $userId,
                    videoId: $videoId,
                    watched: $watched
                }
            ) {
                    userId
                    videoId
                    favorite
                    watched
            }
        }
    `;

    return await queryHasuraGraphQL(
        operationsDoc,
        "insertStats",
        { userId, videoId, favorite, watched },
        token
    );
}

export async function updateStats(
    { favorite, userId, videoId, watched },
    token
) {
    const operationsDoc = `
        mutation updateStats($favorite: Int!, $userId: String!, $videoId: String!, $watched: Boolean!) {
            update_stats(
                _set: {
                    watched: $watched, favorite: $favorite
                },
                where: {
                    videoId: {_eq: $videoId},
                    userId: {_eq: $userId}
            }) {
                returning {
                    userId
                    videoId
                    watched
                    favorite
                }
            }
        }
    `;

    return await queryHasuraGraphQL(
        operationsDoc,
        "updateStats",
        { favorite, userId, videoId, watched },
        token
    );
}

export async function findVideoIdByUser(userId, videoId, token) {
    const operationsDoc = `
    query findVideoIdByUserId($userId: String!, $videoId: String!) {
        stats(where: {userId: {_eq: $userId}, videoId: {_eq: $videoId}}) {
            id
            videoId
            userId
            favorite
            watched
        }
    }
    
    mutation MyMutation {
        __typename
    }
`;

    const response = await queryHasuraGraphQL(
        operationsDoc,
        "findVideoIdByUserId",
        {
            userId,
            videoId,
        },
        token
    );

    
    return response?.data?.stats;
}

export async function createNewUser(token, metadata) {
    const operationsDoc = `
        mutation createNewUser($issuer: String!, $email: String!, $publicAddress: String!) {
            insert_users(objects: {email: $email, publicAddress: $publicAddress, issuer: $issuer}) {
                returning {
                    id,
                    email,
                    issuer,
                }
            }
        }
    `;

    const { issuer, email, publicAddress } = metadata;
    const response = await queryHasuraGraphQL(
        operationsDoc,
        "createNewUser",
        { email, publicAddress, issuer },
        token
    );

    return response;
}

export async function isNewUser(token, issuer) {
    const operationsDoc = `
        query isNewUser($issuer: String!) {
            users(where: {issuer: {_eq: $issuer}}) {
                id
                email
                issuer
            }
        }
    `;

    const response = await queryHasuraGraphQL(
        operationsDoc,
        "isNewUser",
        { issuer },
        token
    );
    return response?.data?.users?.length === 0;
}

async function queryHasuraGraphQL(
    operationsDoc,
    operationName,
    variables,
    token
) {
    const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ADMIN_URL, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: operationsDoc,
            variables: variables,
            operationName: operationName,
        }),
    });

    return await result.json();
}

export async function getVideosByUserId({userId, watched = true}, token) {

    const operationsDoc = `
        query getWatchedVideos($userId: String!, $watched: Boolean!) {
            stats(where: {
                watched: {_eq: $watched},
                userId: {_eq: $userId}
            }, order_by: {id: desc}) {
                videoId
                watched
            }
        }
    `;

    const res = await queryHasuraGraphQL(
        operationsDoc,
        "getWatchedVideos",
        { userId, watched },
        token
    );

    return res?.data?.stats;
}

export async function getFavoriteVideosByUserId(userId, token) {
    
    const operationsDoc = `
        query getFavoriteVideos($userId: String!) {
            stats(where: {
                favorite: {_eq: 1},
                userId: {_eq: $userId}
            }, order_by: {id: desc}) {
                videoId
            }
        }
    `;

    const res = await queryHasuraGraphQL(
        operationsDoc,
        "getFavoriteVideos",
        { userId },
        token
    );

    return res?.data?.stats;
}