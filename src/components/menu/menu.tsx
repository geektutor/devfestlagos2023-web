import React from "react";
import Link from "next/link";

import styles from "./menu.module.scss";

import Logo from "@/images/logo.svg";
import Button from "@/components/button";
import CloseCircle from "@/images/close-circle.svg";
import Hamburger from "@/images/hamburger-menu.svg";
import RightArrow from "@/images/arrow-right-bg-light.svg";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

const Menu = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    if (isMenuOpen) enableBodyScroll(document.body);
    else disableBodyScroll(document.body);
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.menu}>
      <div className={styles.logo}>
        <Logo data-menu-logo />
      </div>
      <div className={styles.items}>
        <nav className={styles.nav}>
          <NavItems />
        </nav>
        <Button variant='primary' className={styles.cta} data-menu-button>
          <span>Register Now</span>
          <RightArrow className={styles.ctaIcon} />
        </Button>
      </div>
      <button className={styles.hamburger} onClick={toggleMenu}>
        <Hamburger />
      </button>
      {isMenuOpen && (
        <div className={styles.mobileNav}>
          <div className={styles.menu}>
            <Logo className={styles.logo} />
            <button className={styles.hamburger} onClick={toggleMenu}>
              <CloseCircle />
            </button>
          </div>
          <nav className={styles.mobileItems}>
            <NavItems />
            <Button variant='primary' className={styles.cta}>
              Register Now
              <RightArrow />
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

const NavItems = () => {
  return (
    <ul className={styles.navItems}>
      <li className={styles.navItem} data-nav-item>
        <Link href='/speakers' className={styles.link}>
          Speakers
        </Link>
      </li>
      <li className={styles.navItem} data-nav-item>
        <Link href='/schedule' className={styles.link}>
          Schedule
        </Link>
      </li>
      <li className={styles.navItem} data-nav-item>
        <Link href='/team' className={styles.link}>
          The team
        </Link>
      </li>
    </ul>
  );
};

export default Menu;
