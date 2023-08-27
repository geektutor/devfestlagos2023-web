import React from "react";
import Link from "next/link";

import styles from "./menu.module.scss";

import Logo from "@/images/logo.svg";
import Button from "@/components/button";
import RightArrow from "@/images/arrow-right-bg-light.svg";

const Menu = () => {
  return (
    <header className={styles.menu}>
      <Logo className={styles.logo} />
      <div className={styles.items}>
        <nav className={styles.nav}>
          <ul className={styles.navItems}>
            <li className={styles.navItem}>
              <Link href='/speakers' className={styles.link}>
                Speakers
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href='/schedule' className={styles.link}>
                Schedule
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href='/team' className={styles.link}>
                The team
              </Link>
            </li>
          </ul>
        </nav>
        <Button variant='primary' className={styles.cta}>
          Register Now
          <RightArrow />
        </Button>
      </div>
    </header>
  );
};

export default Menu;
