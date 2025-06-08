export async function findNearestPub(lat: number, lon: number) {
    const proxyUrl = "http://localhost:3001/api/google/nearestPub"; // You may need to proxy this in dev to avoid CORS.
    const res = await fetch(
        proxyUrl + "?lat=" + encodeURIComponent(lat) + "&lon=" + encodeURIComponent(lon)
    );
    const json = await res.json();

    console.log('Json is: ', json);

    if (!json.results.length) {
        throw new Error("No pubs found nearby.");
    }

    const nearest = json.results[0]; // Already sorted by distance
    return {
        name: nearest.name,
        lat: nearest.geometry.location.lat,
        lon: nearest.geometry.location.lng,
    };
}
