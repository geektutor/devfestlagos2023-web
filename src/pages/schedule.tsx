import Image from "next/image";
import ThreeDotsDoodle from "@/images/schedule/3-dots-doodles.png";
import ArrowDoodle from "@/images/schedule/arrow-doodles.png";
import LogicDoodle from "@/images/schedule/logic-doodles.png";
import PeopleDoodle from "@/images/schedule/people-doodles.png";
import RefreshDoodle from "@/images/schedule/refresh-doodles.png";
import MemojiAvatar from "@/images/schedule/memoji-avatar-schedule.png";
import { useState } from "react";
import { ScheduleCard } from "@/components/schedule-card";
import { Talks } from "@/components/talks-section/talks";
import FaqSection from "@/components/faq-section/faq-section";
import { NoMatterWhat } from "@/components/no-matter-what/no-matter-what";
import { fetchAgenda, fetchSessions } from "@/requests/general";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { Session } from "@/types/Session";
import { Schedule } from "@/types/Schedule";

export default function Schedule({
  sessions,
  agenda,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [selectedDay, setSelectedDay] = useState<number>(1);

  const schedule = agenda[selectedDay - 1];

  return (
    <div className='schedule__page'>
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
            <div className='schedule_container__date_tag'>
              {selectedDay === 1 ? "24th" : "25th"} November, 2023
            </div>

            <ul className='schedule_container__list'>
              {schedule.map((schedule, index) => (
                <li key={index} className='schedule_container__list__item'>
                  <ScheduleCard schedule={schedule} />
                </li>
              ))}
            </ul>
          </section>
        </div>
      </header>
      <Talks sessions={sessions} disableAnimation />
      <FaqSection />
      <NoMatterWhat />
    </div>
  );
}

export const getStaticProps = (async () => {
  const [sessions, agenda] = await Promise.all([fetchSessions(), fetchAgenda()]);

  return { props: { sessions, agenda } };
}) satisfies GetStaticProps<{
  sessions: Session[];
  agenda: Schedule[][];
}>;
