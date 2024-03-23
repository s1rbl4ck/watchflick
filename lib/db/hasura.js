/*
This is an example snippet - you should consider tailoring it
to your service.
*/

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

    const {issuer, email, publicAddress} = metadata;
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
