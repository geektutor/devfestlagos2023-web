import React, { useEffect, useMemo, useRef, useState } from "react";
import CategoryPill from "@/components/category-pill/category-pill";
import RsvpTicket from "@/components/rsvp/rsvp-ticket";
import { SecondaryButton, TertiaryButton } from "@/components/button";
import FaqSection from "@/components/faq-section/faq-section";
import { NoMatterWhat } from "@/components/no-matter-what/no-matter-what";
import Menu from "@/components/menu/menu";
import Footer from "@/components/footer";
import { fetchCategories, fetchSessions } from "@/requests/general";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { Session } from "@/types/Session";
import { classNames } from "@/utils/classNames";
import { Category } from "@/types/Category";

const pageSize = 6;

const RSVP = ({ sessions, categories }: InferGetStaticPropsType<typeof getStaticProps>) => {
  //State
  const [talksPage, setTalksPage] = useState(1);
  const [activeDay, setActiveDay] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  //Refs
  const daysSectionRef = useRef<HTMLDivElement>(null);
  const scrollIntoView = useRef<boolean>(false);

  // Effects
  useEffect(() => {
    if (scrollIntoView.current) {
      daysSectionRef.current?.scrollIntoView({
        behavior: "smooth",
      });

      scrollIntoView.current = false;
    }
  }, [talksPage]);

  //Data
  const categoriesWithAll: Category[] = [{ name: "All", imageUrl: "" }, ...categories];

  const currentPageTalks = useMemo(() => {
    return sessions.filter((session) => {
      if (activeCategory !== "All" && session.category !== activeCategory) {
        return false;
      }

      const day = new Date(session.sessionDate).getDate();

      if (activeDay === 0) {
        return day === 24;
      } else {
        return day === 25;
      }
    });
  }, [activeCategory, activeDay, sessions]);

  const totalTalks = currentPageTalks.length;

  const currentTalks = useMemo(() => {
    const talksStart = (talksPage - 1) * pageSize;
    const talksEnd = talksPage * pageSize;

    return currentPageTalks.slice(talksStart, talksEnd);
  }, [currentPageTalks, talksPage]);

  const rangeText = useMemo(() => {
    const start = (talksPage - 1) * pageSize + 1;
    const end = Math.min(talksPage * pageSize, totalTalks);
    return `Showing ${Math.min(start, totalTalks)} - ${end} of ${totalTalks}`;
  }, [talksPage, totalTalks]);

  const scrollToTalks = () => {
    scrollIntoView.current = true;
  };

  // Event handlers
  const onClickNext = () => {
    setTalksPage(Math.min(talksPage + 1, Math.ceil(totalTalks / pageSize)));
    scrollToTalks();
  };

  const onClickPrev = () => {
    setTalksPage(Math.max(talksPage - 1, 1));
    scrollToTalks();
  };

  const onChangeDay = (day: number) => {
    setActiveDay(day);
    setTalksPage(1);
    scrollToTalks();
  };

  return (
    <>
      <Menu actionButton={<TertiaryButton>Hi, Omo Ologo</TertiaryButton>} />
      <div className='rsvp'>
        <h1 className='rsvp__title'>RSVP</h1>
        <p className='rsvp__subtitle'>
          Rice and Soup very plenty 🤩 <br /> JK JK, Below you can select the sessions you’re
          interested in.
        </p>
        <div className='rsvp__days' ref={daysSectionRef}>
          {Array.from({ length: 2 }).map((_, index) => (
            <button
              key={index}
              onClick={() => onChangeDay(index)}
              className={classNames("rsvp__days__day", index === activeDay && "is-active")}
            >
              Day {index + 1}
            </button>
          ))}
        </div>
        <div className='rsvp__categories'>
          <div className='rsvp__categories__inner'>
            {categoriesWithAll.map((category) => (
              <CategoryPill
                className={classNames(
                  "rsvp__category",
                  activeCategory !== category.name && "is-inactive",
                )}
                activeTextColor='#FFF'
                activeBgColor='#000'
                key={category.name}
                isActive={activeCategory === category.name}
                onClick={() => setActiveCategory(category.name)}
              >
                {category.name}
              </CategoryPill>
            ))}
          </div>
        </div>
        <section className='rsvp__talks'>
          {currentTalks.map((talk) => (
            <RsvpTicket key={talk.sessionId} onClose={() => {}} session={talk} />
          ))}
        </section>
        <section className='rsvp__pagination'>
          <p className='rsvp__pagination-text'>{rangeText}</p>
          <div className='rsvp__buttons-row'>
            <TertiaryButton>Got your sessions? Finish RSVP</TertiaryButton>
            <div className='rsvp__pagination-buttons'>
              <SecondaryButton isDisabled={talksPage === 1} onClick={onClickPrev}>
                Previous
              </SecondaryButton>
              <p className='rsvp__current-page'>{talksPage}</p>
              <SecondaryButton
                isDisabled={talksPage >= Math.ceil(totalTalks / pageSize)}
                onClick={onClickNext}
              >
                Next
              </SecondaryButton>
            </div>
          </div>
        </section>
        <FaqSection />
        <NoMatterWhat />
        {/*<RSVPSignIn modalIsOpen={true} onClose={() => {}} />*/}
      </div>
      <Footer />
    </>
  );
};

RSVP.disableLayout = true;

export default RSVP;

export const getStaticProps = (async () => {
  const [sessions, categories] = await Promise.all([fetchSessions(), fetchCategories()]);

  return { props: { sessions, categories } };
}) satisfies GetStaticProps<{
  sessions: Session[];
  categories: Category[];
}>;
