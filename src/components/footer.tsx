import Logo from "@/images/logo-white-bg.svg";
import XLightIcon from "@/images/social-media/twitter-light.svg";
import InstagramLightIcon from "@/images/social-media/instagram-light.svg";
import FacebookLightIcon from "@/images/social-media/facebook-light.svg";
import LinkedInLightIcon from "@/images/social-media/linkedin-light.svg";
import EmailLightIcon from "@/images/social-media/email-light.svg";
import YouTubeLightIcon from "@/images/social-media/youtube-light.svg";

const Footer = () => {
  return (
    <footer className='c-footer'>
      <div className='container'>
        <div className='c-footer__container'>
          <Logo className='c-footer__logo' alt='DevFest Lagos 2023 Logo' />

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
