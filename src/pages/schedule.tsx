import Image from "next/image";
import ThreeDotsDoodle from "@/images/schedule/3-dots-doodles.png";
import ArrowDoodle from "@/images/schedule/arrow-doodles.png";
import LogicDoodle from "@/images/schedule/logic-doodles.png";
import PeopleDoodle from "@/images/schedule/people-doodles.png";
import RefreshDoodle from "@/images/schedule/refresh-doodles.png";
import MemojiAvatar from "@/images/schedule/memoji-avatar-schedule.png";
import React, { useEffect, useState } from "react";
import { ScheduleCard } from "@/components/schedule-card";
import { Talks } from "@/components/talks-section/talks";
import FaqSection from "@/components/faq-section/faq-section";
import { NoMatterWhat } from "@/components/no-matter-what/no-matter-what";
import { fetchAgenda, fetchSessions, fetchSpeakers } from "@/requests/general";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { Session } from "@/types/Session";
import { Schedule } from "@/types/Schedule";
import DaysToggle from "@/components/days-toggle/days-toggle";
import { Speaker } from "@/types/Speaker";
import { SEO } from "@/components/seo";

export default function Schedule({
  sessions,
  agenda,
  speakers,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [selectedDay, setSelectedDay] = useState<number>(1);

  const schedule = agenda[selectedDay - 1];

  useEffect(() => {
    fetchAgenda();
  }, []);

  return (
    <div className='schedule__page'>
      <SEO title='Schedule' description='View the schedule for DevFest Lagos 2023.' />
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
            <DaysToggle
              isCentered
              hasMargin
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
            />
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
      <Talks speakers={speakers} sessions={sessions} disableAnimation />
      <FaqSection />
      <NoMatterWhat />
    </div>
  );
}

export const getStaticProps = (async () => {
  const [sessions, agenda, speakers] = await Promise.all([
    fetchSessions(),
    fetchAgenda(),
    fetchSpeakers(),
  ]);

  return { props: { sessions, agenda, speakers } };
}) satisfies GetStaticProps<{
  sessions: Session[];
  agenda: Schedule[][];
  speakers: Speaker[];
}>;
