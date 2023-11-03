import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-sub">
        <div className="policy">
          <div>
            <u>Join the community</u>
          </div>
          <div>
            <u>Privacy Policy</u>
          </div>
        </div>
        <div className="footer-logo">
          <Image src="/logo.png" width={150} height={150} />
        </div>
        <div>
          <div>Follow us on:</div>
          <div className="footer-icons">
            <Image src="/x.png" width={18} height={15} />
            <Image src="/insta.png" width={20} height={20} />
            <Image src="/you.png" width={20} height={20} />
            <Image src="/Email.png" width={20} height={20} />
          </div>
        </div>
      </div>
      <div className="footer-rights">
        © 2023 Devfest Lagos. All Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;
