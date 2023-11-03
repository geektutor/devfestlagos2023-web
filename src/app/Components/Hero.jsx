import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className="hero-container">
      <h2>Pepper demmm!🥳</h2>
      <p>Generate and share your unique</p>
      <p>Devfest Lagos 2023 DP</p>

      <div className="hero-icons">
        <div className="avatar-container2">
          <Image src="/Avatar-1.png" width={30} height={30} />
        </div>
        <div className="avatar-container">
          <Image src="/Avatar.png" width={30} height={30} />
        </div>

        <Image
          src="/Cup.png"
          width={60}
          height={60}
          className="hero-cup-icon"
        />
        <Image
          src="/Globe.png"
          width={50}
          height={50}
          className="hero-globe-icon"
        />
        <Image
          src="/Refresh.png"
          width={50}
          height={50}
          className="hero-refresh-icon"
        />
      </div>
    </div>
  );
};

export default Hero;
