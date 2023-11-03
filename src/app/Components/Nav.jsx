import Image from "next/image";
import React from "react";

const Nav = () => {
  return (
    <div className="nav-image">
      <div>
        <Image src="/logo.png" width={100} height={100} />
      </div>
    </div>
  );
};

export default Nav;
