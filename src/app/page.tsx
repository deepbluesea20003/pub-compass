'use client'

import Compass from "@/app/compass/Compass";

async function getNearestPubs() {
  const response = await fetch('http://localhost:3001/nearestPub');
  console.log("Response:", response);
};

export default function Home() {
  return (
    <Compass onClick={() => getNearestPubs()}/>
  );
}
