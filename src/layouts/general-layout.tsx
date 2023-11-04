import React, { FC, PropsWithChildren } from "react";
import Menu from "@/components/menu/menu";
import Footer from "@/components/footer";

import styles from "./general-layout.module.scss";

export const GeneralLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <div className={styles.menuAndContentwrapper}>
        <Menu />
        {children}
      </div>
      <Footer />
    </>
  );
};

export default GeneralLayout;
