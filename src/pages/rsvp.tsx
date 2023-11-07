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
import { useMutation, useQuery, useQueryClient } from "react-query";
import { firebaseAuth } from "@/firebase/app";
import firebase from "firebase/compat/app";
import RSVPSignIn from "@/components/rsvp/rsvp-sign-in/rsvp-sign-in";
import { addSessionsToRSVP, fetchRSVPS } from "@/requests/rsvp";
import ArrowLeftDark from "@/images/arrow-left-dark.svg";
import ArrowRightDark from "@/images/arrow-right-dark-bg.svg";
import repeatDoodle from "@/images/repeat-doodle.png";
import dotsDoodle from "@/images/landing/doodles/dots.png";
import logicDoodle from "@/images/logic.png";
import arrowDoodle from "@/images/arrow-doodle.png";
import peopleDoodle from "@/images/people-doodle.png";
import Image from "next/image";
import memoji1 from "@/images/beanie-memoji.png";
import memoji2 from "@/images/wink-memoji.png";
import { toast } from "react-toastify";
import { ErrorAlert, SuccessAlert } from "@/components/alert/alert";
import LeftIcon from "@/images/chevron-left.svg";
import RightIcon from "@/images/chevron-right.svg";

const pageSize = 6;

const TABS = {
  GENERAL: "GENERAL",
  BOOKMARKS: "BOOKMARKS",
};

const RSVP = ({ sessions, categories }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [user, setUser] = React.useState<firebase.User | null>(null);
  const [showLogin, setShowLogin] = React.useState<boolean>(false);
  const [tickets, setTickets] = React.useState<Set<string>>(new Set());
  const [userToken, setUserToken] = React.useState<string | null>(null);

  const [hasCheckedInitialSession, setHasCheckedInitialSession] = React.useState<boolean>(false);

  const [activeTab, setActiveTab] = React.useState<string>(TABS.GENERAL);
  const [showRSVPPopup, setShowRSVPPopup] = React.useState<boolean>(false);

  const [hasPendingSaveBookmarks, setHasPendingSaveBookmarks] = React.useState<boolean>(false);

  const queryClient = useQueryClient();

  //Refs
  const daysSectionRef = useRef<HTMLDivElement>(null);
  const scrollIntoView = useRef<boolean>(false);

  const scrollToTalks = () => {
    scrollIntoView.current = true;
  };

  // API Calls
  const addSessionsMutation = useMutation({
    mutationFn: addSessionsToRSVP,
    onSuccess: () => {
      queryClient.setQueryData(["getSessions", user?.email], (data) => {
        if (!data || !Array.isArray(data)) return;

        return data.concat(Array.from(tickets));
      });

      setTickets(new Set());

      toast(<SuccessAlert>Successfully added sessions</SuccessAlert>);
    },
    onError: () => {
      toast(<ErrorAlert>Failed to save sessions. Kindly try again</ErrorAlert>, {
        autoClose: 3000,
      });
      console.log("I failed you Master Bruce");
    },
  });

  const getSessionsQuery = useQuery({
    queryKey: ["getSessions", user?.email],
    queryFn: async () => {
      if (!user || !userToken) return;
      setHasCheckedInitialSession(true);

      return fetchRSVPS(userToken);
    },
    enabled: !!user,
    select: (data) => {
      const sessionIds = data as string[];
      const sessionIdsSet = new Set(sessionIds);

      return {
        sessions: sessions.filter((session) => sessionIdsSet.has(session.sessionId)),
        sessionIds: sessionIdsSet,
      };
    },
  });

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
    sessions: activeTab === TABS.GENERAL ? sessions : getSessionsQuery.data?.sessions || [],
    categories,
    scrollToTalks,
    pageSize,
  });

  // Effects
  useEffect(() => {
    firebaseAuth.onAuthStateChanged(async (user) => {
      setUser(user);
      if (user) {
        const token = await user.getIdToken();
        setUserToken(token);
      } else {
        setHasCheckedInitialSession(true);
      }
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

  // Event handlers
  const onClickFinish = async (newUser?: firebase.User) => {
    const currentUser = newUser || user;
    let token = userToken;

    if (newUser) {
      token = await newUser.getIdToken();
    }

    if (currentUser) {
      addSessionsMutation.mutate({
        sessionIds: Array.from(tickets),
        token: token!,
      });
    } else {
      setHasPendingSaveBookmarks(true);
      setShowLogin(true);
    }
  };

  const onLogin = (user: firebase.User) => {
    setShowLogin(false);

    if (hasPendingSaveBookmarks) {
      onClickFinish(user);
      setHasPendingSaveBookmarks(false);
    } else {
      setShowRSVPPopup(true);
    }
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

  const onClickMenu = (tab: string) => () => {
    setActiveTab(tab);
    setShowRSVPPopup(false);
  };

  const onClickMenuButton = () => {
    if (user) {
      setShowRSVPPopup((currentState) => !currentState);
    } else {
      setShowLogin(true);
    }
  };

  const onClickSignOut = () => {
    firebaseAuth.signOut();
    setShowRSVPPopup(false);
  };

  const onRemoveSession = (sessionId: string) => () => {
    queryClient.setQueryData(["getSessions", user?.email], (data) => {
      if (!data || !Array.isArray(data)) return;

      return data.filter((session) => session !== sessionId);
    });
  };

  const renderMenuButton = () => {
    return (
      <div className='rsvp__menu'>
        <TertiaryButton onClick={onClickMenuButton}>
          {user ? "Hi, Omo Ologo" : "Login"}
        </TertiaryButton>
        <div className={classNames("rsvp__menu__inner", showRSVPPopup && "is-active")}>
          <button className='rsvp__menu__button' onClick={onClickMenu(TABS.GENERAL)}>
            All Sessions
          </button>
          <button className='rsvp__menu__button' onClick={onClickMenu(TABS.BOOKMARKS)}>
            Booked Sessions
          </button>
          <button className='rsvp__menu__button sign-out' onClick={onClickSignOut}>
            Sign Out
          </button>
        </div>
      </div>
    );
  };

  const renderTalks = () => {
    if (getSessionsQuery.isLoading || !hasCheckedInitialSession) {
      const talk = currentTalks[0];

      return Array.from({ length: 4 }).map((_, index) => (
        <RsvpTicket
          key={`${index}-loading`}
          onClick={() => onShowTalkDetails(talk)}
          session={talk}
          onSelectTicket={() => {}}
          isSelected={false}
          isSecured={false}
          onRemoveSession={() => {}}
          isLoading
        />
      ));
    }

    return currentTalks.map((talk) => (
      <RsvpTicket
        key={talk.sessionId}
        onClick={() => onShowTalkDetails(talk)}
        session={talk}
        isSelected={tickets.has(talk.sessionId)}
        onSelectTicket={onSelectTicket(talk)}
        isSecured={getSessionsQuery.data?.sessionIds.has(talk.sessionId)}
        onRemoveSession={onRemoveSession(talk.sessionId)}
      />
    ));
  };

  const categoriesRef = useRef<HTMLDivElement>(null);

  const scrollCategories = (direction: "left" | "right") => () => {
    const div = categoriesRef.current;
    if (!div) return;

    const categories = Array.from(div.children) as Array<HTMLDivElement>;
    const scroll = div.scrollLeft;

    const closestCategory = categories.find((category) => category.offsetLeft - 8 > scroll);
    if (!closestCategory) return;

    let scrollTarget = div.scrollLeft;
    if (direction === "left") {
      let targetElement;

      if (closestCategory.previousElementSibling?.previousElementSibling) {
        targetElement = closestCategory.previousElementSibling
          ?.previousElementSibling as HTMLDivElement;
      } else {
        targetElement = closestCategory.previousElementSibling as HTMLDivElement;
      }

      scrollTarget = targetElement?.offsetLeft - 8 || scrollTarget;
    } else {
      const targetElement = closestCategory.nextElementSibling
        ?.nextElementSibling as HTMLDivElement;

      scrollTarget = targetElement?.offsetLeft || scrollTarget;
    }

    div.scrollTo({
      left: scrollTarget,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Menu actionButton={renderMenuButton()} />
      <div className='rsvp'>
        <Image src={arrowDoodle} alt='Arrow Doodle' className='rsvp__arrow' />
        <Image src={repeatDoodle} alt='Repeat Doodle' className='rsvp__repeat' />
        <Image src={dotsDoodle} alt='Dots Doodle' className='rsvp__dots' />
        <Image src={logicDoodle} alt='Logic Doodle' className='rsvp__logic' />
        <Image src={peopleDoodle} alt='People Doodle' className='rsvp__people' />
        <Image src={memoji1} alt='Memoji' className='rsvp__memoji-1' />
        <Image src={memoji2} alt='Memoji' className='rsvp__memoji-2' />
        <h1 className={classNames("rsvp__title", activeTab === TABS.BOOKMARKS && "bookmarked")}>
          {activeTab === TABS.GENERAL ? "RSVP" : "Your Booked Sessions"}
        </h1>
        {activeTab === TABS.GENERAL && (
          <p className='rsvp__subtitle'>
            Rice and Soup very plenty 🤩 <br /> JK JK, Below you can select the sessions you’re
            interested in.
          </p>
        )}
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
          <button className='rsvp__categories__left-button' onClick={scrollCategories("left")}>
            <LeftIcon />
          </button>
          <button className='rsvp__categories__right-button' onClick={scrollCategories("right")}>
            <RightIcon />
          </button>
          <div className='rsvp__categories__inner' ref={categoriesRef}>
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
        <section className='rsvp__talks'>{renderTalks()}</section>
        <section className='rsvp__pagination'>
          <p className='rsvp__pagination-text'>{rangeText}</p>
          <div className='rsvp__buttons-row'>
            <TertiaryButton
              onClick={() => onClickFinish()}
              isDisabled={addSessionsMutation.isLoading || !tickets.size}
            >
              {addSessionsMutation.isLoading ? "Booking Sessions..." : "Book Selected Sessions"}
            </TertiaryButton>
            <div className='rsvp__pagination-buttons'>
              <SecondaryButton
                isDisabled={talksPage === 1}
                onClick={onClickPrev}
                icon={<ArrowLeftDark />}
                isLeftIcon
              >
                Previous
              </SecondaryButton>
              <p className='rsvp__current-page'>{talksPage}</p>
              <SecondaryButton
                isDisabled={talksPage >= Math.ceil(totalTalks / pageSize)}
                onClick={onClickNext}
                icon={<ArrowRightDark style={{ color: "white" }} />}
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
          isSelected={tickets.has(talkModalState.session?.sessionId || "")}
          onRemoveSession={onRemoveSession(talkModalState.session?.sessionId || "")}
          isSecured={getSessionsQuery.data?.sessionIds.has(talkModalState.session?.sessionId || "")}
          onSelectTicket={onSelectTicket(talkModalState.session || ({} as Session))}
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
