import React, { FC, PropsWithChildren } from "react";
import Menu from "@/components/menu/menu";
import Footer from "@/components/footer";
import { useRouter } from "next/router";
import styles from "./general-layout.module.scss";

export const GeneralLayout: FC<PropsWithChildren> = ({ children }) => {
  const { pathname } = useRouter();

  return (
    <>
      <div key='menu-and-content' className={styles.menuAndContentwrapper}>
        {pathname !== "/dp-generator" && <Menu />}
        {children}
      </div>
      {pathname !== "/dp-generator" && <Footer key='footer' />}
    </>
  );
};

export default GeneralLayout;
