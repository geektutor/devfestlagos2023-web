import Image from "next/image";
import ThreeDotsDoodle from "@/images/schedule/3-dots-doodles.png";
import ArrowDoodle from "@/images/schedule/arrow-doodles.png";
import LogicDoodle from "@/images/schedule/logic-doodles.png";
import PeopleDoodle from "@/images/schedule/people-doodles.png";
import RefreshDoodle from "@/images/schedule/refresh-doodles.png";
import MemojiAvatar from "@/images/schedule/memoji-avatar-schedule.png";
import { useState } from "react";
import { ScheduleCard } from "@/components/schedule-card";
import Menu from "@/components/menu/menu";
import Footer from "@/components/footer";

export default function Schedule() {
  const [selectedDay, setSelectedDay] = useState<number>(1);

  return (
    <>
      <Menu />
      <header className='sc__header'>
        <div className='container'>
          <h3 className='sc__header__title'>Schedule</h3>

          <div className='sc__header__memoji__holder'>
            <figure className='sc__header__memoji__holder__figure'>
              <Image src={MemojiAvatar} alt='Memoji' fill quality={100} />
            </figure>
          </div>

          <figure className='sc__header__arrow-doodle'>
            <Image src={ArrowDoodle} alt='People Doodle' fill quality={100} />
          </figure>
          <figure className='sc__header__logic-doodle'>
            <Image src={LogicDoodle} alt='People Doodle' fill quality={100} />
          </figure>
          <figure className='sc__header__refresh-doodle'>
            <Image src={RefreshDoodle} alt='Repeat Doodle' fill quality={100} />
          </figure>
          <figure className='sc__header__dots-doodle'>
            <Image src={ThreeDotsDoodle} alt='Video Doodle' fill quality={100} />
          </figure>
          <figure className='sc__header__people-doodle'>
            <Image src={PeopleDoodle} alt='Video Doodle' fill quality={100} />
          </figure>

          <section className='schedule_container'>
            <div className='schedule_container__day_selection'>
              {[1, 2].map((number, index) => (
                <div
                  onClick={() => setSelectedDay(number)}
                  key={index}
                  className={`schedule_container__day_selection__number ${
                    selectedDay === number && "schedule_container__day_selection__active"
                  }`}
                >
                  Day {number}
                </div>
              ))}
            </div>
            <div className='schedule_container__date_tag'>24th November, 2023</div>

            <ul className='schedule_container__list'>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((number, index) => (
                <li key={index} className='schedule_container__list__item'>
                  <ScheduleCard />
                </li>
              ))}
            </ul>
          </section>
        </div>
      </header>
      <Footer />
    </>
  );
}
