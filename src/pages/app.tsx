import React, { useEffect } from "react";

const App: React.FC = () => {
  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();

    if (userAgent.includes("android")) {
      window.location.href = "https://play.google.com/store/apps/details?id=com.gdglagos.devfestlg";
    } else if (userAgent.includes("iphone") || userAgent.includes("ipad")) {
      window.location.href = "https://apps.apple.com/us/app/devfest-lagos-23/id6471590430";
    } else {
      // PC or other device, redirect to homepage
      window.location.href = "https://devfestlagos.com/";
    }
  }, []);

  return (
    <div>
      {/* Your main component content */}
      <h1 style={{ margin: "auto", padding: "60px" }}>Redirecting...</h1>
    </div>
  );
};

export default App;
