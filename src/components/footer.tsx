import Logo from "@/images/logo-white-bg.svg";
import XLightIcon from "@/images/social-media/twitter-light.svg";
import InstagramLightIcon from "@/images/social-media/instagram-light.svg";
import EmailLightIcon from "@/images/social-media/email-light.svg";
import YouTubeLightIcon from "@/images/social-media/youtube-light.svg";
import Link from "next/link";

type Link = {
  text: string;
  link?: string;
};

const footerLinks: Link[][] = [
  [
    {
      text: "Schedule",
      link: "/schedule",
    },
    {
      text: "Speakers",
      link: "/speakers",
    },
    {
      text: "FAQs",
      link: "/faq",
    },
  ],
  [
    {
      text: "Join the community",
      link: "https://gdg.community.dev/gdg-lagos/",
    },
    {
      text: "Community guidelines",
      link: "https://developers.google.com/community-guidelines",
    },
    {
      text: "DP Generator",
      link: "/dp-generator",
    },
    {
      text: "Map",
      link: "/map",
    },
  ],
  [
    {
      text: "Contact us",
      link: "https://twitter.com/gdglagos",
    },
    {
      text: "Follow us",
    },
  ],
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
        <a href='https://twitter.com/gdglagos' target='_blank'>
          <XLightIcon />
        </a>
        <a href='https://instagram.com/gdglagos' target='_blank'>
          <InstagramLightIcon />
        </a>
        <a href='mailto:team@gdglagos.com'>
          <EmailLightIcon />
        </a>
        <a target='_blank' href='https://www.youtube.com/@GDGLagos'>
          <YouTubeLightIcon />
        </a>
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
                link.text === "Follow us" ? (
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
                    {link.link?.startsWith("/") ? (
                      <Link href={link.link || ""}>{link.text}</Link>
                    ) : (
                      <a target='_blank' href={link.link || ""}>
                        {link.text}
                      </a>
                    )}
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
