import React, { useEffect, useRef } from "react";
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
import RSVPTicketDetails from "@/components/rsvp/rsvp-details/rsvp-ticket-details";
import { useRSVPState } from "@/hooks/useRSVPState";
import { useMutation } from "react-query";
import { firebaseAuth } from "@/firebase/app";
import firebase from "firebase/compat/app";
import RSVPSignIn from "@/components/rsvp/rsvp-sign-in/rsvp-sign-in";
import { addSessionsToRSVP } from "@/requests/rsvp";

const pageSize = 6;

const RSVP = ({ sessions, categories }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [user, setUser] = React.useState<firebase.User | null>(null);
  const [showLogin, setShowLogin] = React.useState<boolean>(false);
  const [tickets, setTickets] = React.useState<Set<string>>(new Set());

  //Refs
  const daysSectionRef = useRef<HTMLDivElement>(null);
  const scrollIntoView = useRef<boolean>(false);

  const scrollToTalks = () => {
    scrollIntoView.current = true;
  };

  const {
    talksPage,
    activeDay,
    activeCategory,
    talkModalState,
    onClickNext,
    onClickPrev,
    onChangeDay,
    onShowTalkDetails,
    onCloseTalkDetails,
    currentTalks,
    rangeText,
    categoriesWithAll,
    totalTalks,
    setActiveCategory,
  } = useRSVPState({
    sessions,
    categories,
    scrollToTalks,
    pageSize,
  });

  // Effects
  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  useEffect(() => {
    if (scrollIntoView.current) {
      daysSectionRef.current?.scrollIntoView({
        behavior: "smooth",
      });

      scrollIntoView.current = false;
    }
  }, [talksPage]);

  const addSessionsMutation = useMutation({
    mutationFn: addSessionsToRSVP,
    onSuccess: () => {
      console.log("successfully added");
    },
    onError: () => {
      console.log("I failed you Master Bruce");
    },
  });

  // const getSessionsQuery = useQuery({
  //   queryKey: ['getSessions', user?.email],
  //   queryFn: async () => {
  //     if(!user) return;
  //
  //     const token = await user.getIdToken();
  //
  //     if(token){
  //       return fetchRSVPS(token)
  //     }else{
  //       setUser(null)
  //     }
  //   },
  //   enabled: !!user
  // })

  const onClickFinish = (newUser?: firebase.User) => {
    const currentUser = newUser || user;

    if (currentUser) {
      addSessionsMutation.mutate(Array.from(tickets));
    } else {
      setShowLogin(true);
    }
  };

  const onLogin = (user: firebase.User) => {
    setShowLogin(false);
    onClickFinish(user);
  };

  const onSelectTicket = (talk: Session) => () => {
    const mutableTickets = new Set(tickets);

    if (mutableTickets.has(talk.sessionId)) {
      mutableTickets.delete(talk.sessionId);
    } else {
      mutableTickets.add(talk.sessionId);
    }

    setTickets(mutableTickets);
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
            <RsvpTicket
              key={talk.sessionId}
              onClick={() => onShowTalkDetails(talk)}
              session={talk}
              isSelected={tickets.has(talk.sessionId)}
              onSelectTicket={onSelectTicket(talk)}
            />
          ))}
        </section>
        <section className='rsvp__pagination'>
          <p className='rsvp__pagination-text'>{rangeText}</p>
          <div className='rsvp__buttons-row'>
            <TertiaryButton
              onClick={() => onClickFinish()}
              isDisabled={addSessionsMutation.isLoading}
            >
              {addSessionsMutation.isLoading ? "Booking Sessions..." : "Book Selected Sessions"}
            </TertiaryButton>
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
        <RSVPTicketDetails
          onClose={onCloseTalkDetails}
          session={talkModalState.session}
          modalIsOpen={talkModalState.isOpen}
        />
        <RSVPSignIn modalIsOpen={showLogin} onLogin={onLogin} onClose={() => setShowLogin(false)} />
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
