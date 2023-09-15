import React, { FC, PropsWithChildren } from "react";
import Menu from "@/components/menu/menu";
import Footer from "@/components/footer";

export const GeneralLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Menu />
      {children}
      <Footer />
    </>
  );
};

export default GeneralLayout;
