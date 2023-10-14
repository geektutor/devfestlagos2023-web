import React from "react";
import Image from "next/image";
import MenuDoodle from "@/images/faqs/menu-doodle.png";
import MoveDoodle from "@/images/faqs/move-doodle.png";
import CloudDoodle from "@/images/landing/doodles/cloud.png";
import LogicDoodle from "@/images/schedule/logic-doodles.png";
import TransferDoodle from "@/images/faqs/transfer-doodle.png";
import PeopleDoodle from "@/images/schedule/people-doodles.png";
import RefreshDoodle from "@/images/schedule/refresh-doodles.png";

export default function Faqs() {
  return (
    <main className='faqs__page'>
      <header className='fq__header'>
        <div className='container'>
          <h1 className='fq__header__title'>
            {"Top questions about\nDevfest"}
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
    </main>
  );
}