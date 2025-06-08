import React, { useEffect, useState } from "react";
import { findNearestPub } from "../helpers/findNearestPub";

function getBearing(lat1: number, lon1: number, lat2: number, lon2: number) {
    const toRad = (d: number) => d * Math.PI / 180;
    const toDeg = (r: number) => r * 180 / Math.PI;

    const φ1 = toRad(lat1), φ2 = toRad(lat2);
    const Δλ = toRad(lon2 - lon1);
    const y = Math.sin(Δλ) * Math.cos(φ2);
    const x = Math.cos(φ1) * Math.sin(φ2) -
        Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
    return (toDeg(Math.atan2(y, x)) + 360) % 360;
}


export default function Compass() {
    const [userPos, setUserPos] = useState<{ lat: number, lon: number } | null>(null);
    const [pubBearing, setPubBearing] = useState<number | null>(null);
    const [pubName, setPubName] = useState<string | null>(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async pos => {
            const lat = pos.coords.latitude, lon = pos.coords.longitude;
            setUserPos({ lat, lon });

            const nearestPub = await findNearestPub(lat, lon, '');
            console.log(nearestPub);

            const bearing = getBearing(lat, lon, nearestPub.lat, nearestPub.lon);
            setPubBearing(bearing);
            setPubName(nearestPub.name);
        }, err => console.error(err));
    }, []);

    console.log("Got position:", userPos?.lat, userPos?.lon);

    return (<><div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-300">
        <h1 className="text-3xl font-bold mb-6">Compass</h1>
        <div className="relative w-40 h-40 rounded-full border-4 border-black flex items-center justify-center">
            <div
                className="absolute w-1 h-20 bg-red-600 origin-bottom"
                style={{ transform: `rotate(${pubBearing ?? 0}deg)` }} />
            <span className="absolute bottom-1 text-xs">N</span>
        </div>
        <p className="mt-4 text-lg">{pubBearing !== null ? `${pubBearing.toFixed(0)}°` : "Waiting for sensor..."}</p>
    </div><div>Your nearest pub is: ${pubName}</div></>
    );
}
