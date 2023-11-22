import LandmarkMap from "@/components/event-map";
import Head from "next/head";

const Map = () => {
  return (
    <>
      <Head>
        <title>Event Layout Map</title>
        <meta name='description' content='Find your way around the event' />
      </Head>
      <main className='map__page'>
        <div>{/* This will hold the input fields */}</div>
        <div className='map__page__map-wrapper'>
          <LandmarkMap />
        </div>
      </main>
    </>
  );
};

export default Map;
