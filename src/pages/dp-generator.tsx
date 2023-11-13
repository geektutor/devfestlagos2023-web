import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { dpGeneratorURL } from "@/utils/urls";

const DpGenerator: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const redirectToDp = () => {
      router.replace(dpGeneratorURL);
    };

    // Call the function to redirect
    redirectToDp();
  }, [router]);

  return <div></div>;
};

export default DpGenerator;
