import Logo from "@/images/logo-white-bg.svg";
import XLightIcon from "@/images/social-media/twitter-light.svg";
import InstagramLightIcon from "@/images/social-media/instagram-light.svg";
import FacebookLightIcon from "@/images/social-media/facebook-light.svg";
import LinkedInLightIcon from "@/images/social-media/linkedin-light.svg";
import EmailLightIcon from "@/images/social-media/email-light.svg";
import YouTubeLightIcon from "@/images/social-media/youtube-light.svg";

const footerLinks = [
  ["Agenda", "Speaker", "FAQs"],
  ["Apply as a speaker", "Apply as a sponsor", "Join the community", "Community guidelines"],
  ["Privacy policy", "Contact us", "Follow us"],
];

const Footer = () => {
  const followText = (
    <li className='c-footer__list__group__item c-footer__follow__container'>
      <span
        className='c-footer__follow__container__title'
        data-animate-y-full
        data-add-span
        data-delay='.25'
        data-easing='FOOTER'
      >
        Follow us:
      </span>
      <div
        className='c-footer__follow__container__icons'
        data-animate-y-children-full
        data-delay='.333'
        data-stagger='.084'
        data-easing='FOOTER'
      >
        <XLightIcon />
        <InstagramLightIcon />
        <FacebookLightIcon />
        <LinkedInLightIcon />
        <EmailLightIcon />
        <YouTubeLightIcon />
      </div>
    </li>
  );

  return (
    <footer className='c-footer'>
      <div>
        <div className='c-footer__container'>
          <figure className='c-footer__logo'>
            <Logo alt='DevFest Lagos 2023 Logo' data-animate-y-full data-easing='FOOTER' />
          </figure>

          {footerLinks.map((group, index) => (
            <ul className='c-footer__list__group' key={index}>
              {group.map((link, index) =>
                link === "Follow us" ? (
                  followText
                ) : (
                  <li
                    key={index}
                    className='c-footer__list__group__item'
                    data-animate-y-full
                    data-add-span
                    data-delay={0.083 * (index + 1)}
                    data-easing='FOOTER'
                  >
                    {link}
                  </li>
                ),
              )}
            </ul>
          ))}
        </div>

        <div
          className='c-footer__note'
          data-animate-y-full
          data-add-span
          data-delay='.25'
          data-easing='FOOTER'
        >
          &copy; {new Date().getFullYear()} Devfest Lagos. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
