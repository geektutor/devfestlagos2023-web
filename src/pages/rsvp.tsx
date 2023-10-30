import React, { useEffect, useMemo, useRef, useState } from "react";
import CategoryPill from "@/components/category-pill/category-pill";
import RsvpTicket from "@/components/rsvp/rsvp-ticket";
import { talks } from "@/mock-data";
import { SecondaryButton, TertiaryButton } from "@/components/button";
import FaqSection from "@/components/faq-section/faq-section";
import { NoMatterWhat } from "@/components/no-matter-what/no-matter-what";

const pageSize = 6;

const RSVP = () => {
  const [talksPage, setTalksPage] = useState(1);
  const totalTalks = talks.length;

  const daysSectionRef = useRef<HTMLDivElement>(null);
  const scrollIntoView = useRef<boolean>(false);

  useEffect(() => {
    if (scrollIntoView.current) {
      daysSectionRef.current?.scrollIntoView({
        behavior: "smooth",
      });

      scrollIntoView.current = false;
    }
  }, [talksPage]);

  const currentTalks = useMemo(() => {
    const talksStart = (talksPage - 1) * pageSize;
    const talksEnd = talksPage * pageSize;

    return talks.slice(talksStart, talksEnd);
  }, [talksPage]);

  const rangeText = useMemo(() => {
    const start = (talksPage - 1) * pageSize + 1;
    const end = talksPage * pageSize;
    return `Showing ${start} - ${end} of ${totalTalks}`;
  }, [talksPage, totalTalks]);

  const scrollToTalks = () => {
    scrollIntoView.current = true;
  };

  const onClickNext = () => {
    setTalksPage(Math.min(talksPage + 1, Math.ceil(totalTalks / pageSize)));
    scrollToTalks();
  };

  const onClickPrev = () => {
    setTalksPage(Math.max(talksPage - 1, 1));
    scrollToTalks();
  };

  return (
    <div className='rsvp'>
      <h1 className='rsvp__title'>RSVP</h1>
      <p className='rsvp__subtitle'>
        Rice and Soup very plenty 🤩 <br /> JK JK, Below you can select the sessions you’re
        interested in.
      </p>
      <div className='rsvp__days' ref={daysSectionRef}>
        <button className='rsvp__days__day is-active'>Day 1</button>
        <button className='rsvp__days__day'>Day 2</button>
      </div>
      <div className='rsvp__categories'>
        <CategoryPill isActive activeTextColor='#FFF' activeBgColor='#000'>
          All
        </CategoryPill>
        <CategoryPill className='rsvp__category'>Mobile Development</CategoryPill>
      </div>
      <section className='rsvp__talks'>
        {currentTalks.map((talk) => (
          <RsvpTicket key={talk.speaker.id} onClose={() => {}} talk={talk} />
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
              isDisabled={talksPage === Math.ceil(totalTalks / pageSize)}
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
  );
};

export default RSVP;
