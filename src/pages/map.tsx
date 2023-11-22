import React, { useEffect, useRef } from "react";
import { findPath, LOCATIONS } from "@/utils/map";

const Map = () => {
  const rendered = useRef(false);
  useEffect(() => {
    if (!rendered.current) {
      rendered.current = true;
      console.log(findPath(LOCATIONS.EXHIBITION, LOCATIONS.ROOM_3));
    }
  }, []);

  return <div>FANCY DANDY ALGO</div>;
};

export default Map;
