import Head from "next/head";
import Logo from "@/images/logo.svg";
import { socialMediaLinks } from "@/utils/social-media";

export default function ApplyToSpeak() {
  return (
    <>
      <Head>
        <title>Apply to Volunteer | Devfest Lagos 2023</title>
      </Head>
      <main className='c-home'>
        <nav className='c-home__nav'>
          <Logo className='c-home__nav__logo' />
        </nav>

        {/* Form Section */}
        <section className='c-home__apply__form__section'>
          <iframe
            src='https://docs.google.com/forms/u/3/d/e/1FAIpQLSdKpWDUUpXlYhmaJPo6JoWvrwXF2oN8s1uqJtf1qmuANgf9CQ/viewform?embedded=true'
            width='640'
            height='900'
            frameBorder='0'
            marginHeight={0}
            marginWidth={0}
          >
            Loading…
          </iframe>
        </section>

        <section className='c-home__footer'>
          <ul className='c-home__footer__links'>
            <li className='c-home__footer__links__link'>
              <a href='https://gdg.community.dev/gdg-lagos/' target='_blank'>
                Join the community
              </a>
            </li>
            <li className='c-home__footer__links__link'>
              <a href='https://policies.google.com/privacy' target='_blank'>
                Privacy policy
              </a>
            </li>
          </ul>
          <Logo className='c-home__footer__logo' />
          <div className='c-home__footer__social-media'>
            <p className='c-home__footer__social-media__title'>Follow us on:</p>
            <ul className='c-home__footer__social-media__links'>
              {socialMediaLinks.map((link) => (
                <li key={link.link}>
                  <a
                    href={link.link}
                    target='_blank'
                    className='c-home__footer__social-media__link'
                  >
                    {link.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
