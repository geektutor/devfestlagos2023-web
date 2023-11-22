import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/images/logo.svg";
import FAQ from "@/components/faq/FAQ";
import Memojis from "@/images/faqs/memojis.png";
import MenuDoodle from "@/images/faqs/menu-doodle.png";
import MoveDoodle from "@/images/faqs/move-doodle.png";

import { socialMediaLinks } from "@/utils/social-media";

import Accordion from "@/components/accordion/accordion";
import { faqs, paidDevFestQuestions } from "@/data/faqs";
import CloudDoodle from "@/images/landing/doodles/cloud.png";
import LogicDoodle from "@/images/schedule/logic-doodles.png";
import TransferDoodle from "@/images/faqs/transfer-doodle.png";
import PeopleDoodle from "@/images/schedule/people-doodles.png";
import RefreshDoodle from "@/images/schedule/refresh-doodles.png";
import { NoMatterWhat } from "@/components/no-matter-what/no-matter-what";

export default function Faqs() {
  return (
    <main className='faq__page'>
      <nav className='c-home__nav'>
        <Logo className='c-home__nav__logo' />
      </nav>
      <header className='fq__header'>
        <div className='container'>
          <h1 className='fq__header__title'>
            {"Top questions about\nDevFest Lagos"}

            <Image
              alt='FAQs'
              quality={100}
              src='/faqs.svg'
              width={158.047}
              height={141.968}
              className='fq__header__title__svg'
            />
          </h1>
          <figure className='fq__header__menu-doodle'>
            <Image src={MenuDoodle} alt='Menu Doodle' fill quality={100} />
          </figure>
          <figure className='fq__header__move-doodle'>
            <Image src={MoveDoodle} alt='Move Doodle' fill quality={100} />
          </figure>
          <figure className='fq__header__logic-doodle'>
            <Image src={LogicDoodle} alt='Logic Doodle' fill quality={100} />
          </figure>
          <figure className='fq__header__people-doodle'>
            <Image src={PeopleDoodle} alt='People Doodle' fill quality={100} />
          </figure>
          <figure className='fq__header__transfer-doodle'>
            <Image src={TransferDoodle} alt='Transfer Doodle' fill quality={100} />
          </figure>
          <figure className='fq__header__cloud-doodle'>
            <Image src={CloudDoodle} alt='Cloud Doodle' fill quality={100} />
          </figure>
          <figure className='fq__header__refresh-doodle'>
            <Image src={RefreshDoodle} alt='Refresh Doodle' fill quality={100} />
          </figure>
        </div>
      </header>
      <div className='fq__list'>
        {faqs.map((faq) => (
          <FAQ key={faq.question} question={faq.question} answer={faq.answer} />
        ))}
      </div>
      <div className='fq__list--dark'>
        <h2 className='fq__list--dark__heading'>Why is DevFest Lagos 2023 a paid event?</h2>
        {paidDevFestQuestions.map((question) => (
          <Accordion key={question.title} title={question.title}>
            {question.children}
          </Accordion>
        ))}
      </div>
      <div className='fq__contact'>
        <Image
          alt=''
          width={250}
          height={100}
          quality={100}
          src={Memojis}
          className='fq__contact__image'
        />
        <p className='fq__contact__title'>Still have some questions?</p>
        <p className='fq__contact__text'>
          Can’t find the answer you’re looking for? Please{" "}
          <a href='mailto:contact@devfestlagos.com' className='fq__contact__text__highlight'>
            contact
          </a>{" "}
          our friendly team.
        </p>
      </div>
      <NoMatterWhat />

      <section className='c-home__footer'>
        <ul className='c-home__footer__links'>
          <li className='c-home__footer__links__link'>
            <Link href='/faq'>FAQ</Link>
          </li>
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
                <a href={link.link} target='_blank' className='c-home__footer__social-media__link'>
                  {link.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
