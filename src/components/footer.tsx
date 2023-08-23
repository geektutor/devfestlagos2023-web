import Logo from "@/images/logo-white-bg.svg";
import Image from "next/image";
import {
  XLightIcon,
  InstagramLightIcon,
  FacebookLightIcon,
  LinkedInLightIcon,
  EmailLightIcon,
  YouTubeLightIcon,
} from "@/images/svg/index";

const Footer = () => {
  return (
    <footer className='c-footer'>
      <div className='container'>
        <div className='c-footer__container'>
          <Image src={Logo} alt='DevFest Lagos 2023 Logo' className='c-footer__logo' />

          <ul className='c-footer__list__group'>
            <li className='c-footer__list__group__item'>Agenda</li>
            <li className='c-footer__list__group__item'>Speaker</li>
            <li className='c-footer__list__group__item'>FAQs</li>
          </ul>

          <ul className='c-footer__list__group'>
            <li className='c-footer__list__group__item'>Apply as a speaker</li>
            <li className='c-footer__list__group__item'>Apply as a sponsor</li>
            <li className='c-footer__list__group__item'>Join the community</li>
            <li className='c-footer__list__group__item'>Community guidelines</li>
          </ul>

          <ul className='c-footer__list__group'>
            <li className='c-footer__list__group__item'>Privacy policy</li>
            <li className='c-footer__list__group__item'>Contact us</li>
            <li className='c-footer__list__group__item c-footer__follow__container'>
              <span className='c-footer__follow__container__title'>Follow us:</span>
              <div className='c-footer__follow__container__icons'>
                <XLightIcon />
                <InstagramLightIcon />
                <FacebookLightIcon />
                <LinkedInLightIcon />
                <EmailLightIcon />
                <YouTubeLightIcon />
              </div>
            </li>
          </ul>
        </div>

        <div className='c-footer__note'>
          &copy; {new Date().getFullYear()} Devfest Lagos. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
