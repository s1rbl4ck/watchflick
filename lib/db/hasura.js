/*
This is an example snippet - you should consider tailoring it
to your service.
*/

async function fetchGraphQL(operationsDoc, operationName, variables) {
    const result = await fetch("https://prompt-whale-28.hasura.app/v1/graphql", {
        method: "POST",
        headers: {
            "x-hasura-admin-secret": "UhCUrRi2LtiE48Y14WehlixxE1NcbXtGuJiLHQOtyPuv2lQbTPE1KjutzLGhAjYR"
        },
        body: JSON.stringify({
            query: operationsDoc,
            variables: variables,
            operationName: operationName,
        }),
    });

    return await result.json();
}

const operationsDoc = `
    query MyQuery {
      users {
        issuer,
        id,
        email
      }
    }
    
    mutation MyMutation {
      insert_users(objects: {id: 1, issuer: "s1rbl4ck", email: "s1rbl4ck@fsociety.com", publicAddress: "s1rbl4ck"}) {
        affected_rows
      }
    }
  `;

function fetchMyQuery() {
    return fetchGraphQL(operationsDoc, "MyQuery", {});
}

function executeMyMutation() {
    return fetchGraphQL(operationsDoc, "MyMutation", {});
}

export async function startFetchMyQuery() {
    const { errors, data } = await fetchMyQuery();

    if (errors) {
        // handle those errors like a pro
        console.error(errors);
    }

    // do something great with this precious data
    console.log(data);
}

export async function startExecuteMyMutation() {
    const { errors, data } = await executeMyMutation();

    if (errors) {
        // handle those errors like a pro
        console.error(errors);
    }

    // do something great with this precious data
    console.log(data);
}
