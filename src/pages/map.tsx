import React, { useEffect, useRef } from "react";
import { findPath, LOCATIONS } from "@/utils/map";
import LandmarkMap from "@/components/event-map";
import Head from "next/head";

const Map = () => {
  const rendered = useRef(false);
  useEffect(() => {
    if (!rendered.current) {
      rendered.current = true;
      console.log(findPath(LOCATIONS.EXHIBITION, LOCATIONS.ROOM_3));
    }
  }, []);
  return (
    <>
      <Head>
        <title>Event Layout Map</title>
        <meta name='description' content='Find your way around the event' />
      </Head>
      <main className='map__page'>
        <div className='map__page__map-wrapper'>
          <LandmarkMap />
        </div>
        <div className='map__page__left'>
          <div className='map__page__left__inner'></div>
        </div>
      </main>
    </>
  );
};

export default Map;
