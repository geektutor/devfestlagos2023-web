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
    },
    onError: () => {
      console.log("I failed you Master Bruce");
    },
  });

  const getSessionsQuery = useQuery({
    queryKey: ["getSessions", user?.email],
    queryFn: async () => {
      if (!user || !userToken) return;

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
        <TertiaryButton onClick={onClickMenuButton}>Hi, Omo Ologo</TertiaryButton>
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

  return (
    <>
      <Menu actionButton={renderMenuButton()} />
      <div className='rsvp'>
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
              isSecured={getSessionsQuery.data?.sessionIds.has(talk.sessionId)}
              onRemoveSession={onRemoveSession(talk.sessionId)}
            />
          ))}
        </section>
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
