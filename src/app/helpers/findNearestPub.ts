export async function findNearestPub(lat: number, lon: number, apiKey2: string) {
    const apiKey = 'AIzaSyBN4b50ellgnEKw1aLiVkXl2PCM-Lfzfdg';
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&radius=1000&type=bar&key=${apiKey}`;

    const proxyUrl = "/api/google"; // You may need to proxy this in dev to avoid CORS.
    const res = await fetch(proxyUrl + "?url=" + encodeURIComponent(url));
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
