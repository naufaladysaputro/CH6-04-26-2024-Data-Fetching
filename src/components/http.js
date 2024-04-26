export async function updateUserPlaces(places) {
    fetch('http://localhost:3000/places', {
        method: "PUT",
        body: JSON.stringify(places),
        headers: {
            "content type": "application/json",

        },
    });
    const resData = await Response.json();

    if (!Response.ok) {
        throw new Error("Failed to update user data");
    }

    return resData.message;
}