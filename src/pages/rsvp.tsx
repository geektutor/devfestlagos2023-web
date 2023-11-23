import React, { useEffect, useRef } from "react";
import RsvpTicket from "@/components/rsvp/rsvp-ticket";
import { SecondaryButton, TertiaryButton } from "@/components/button";
import FaqSection from "@/components/faq-section/faq-section";
import { NoMatterWhat } from "@/components/no-matter-what/no-matter-what";
import Menu from "@/components/menu/menu";
import Footer from "@/components/footer";
import { fetchSessions, fetchSpeakers } from "@/requests/general";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { Session } from "@/types/Session";
import { classNames } from "@/utils/classNames";
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
import logicDoodle from "@/images/logic-fixed.png";
import arrowDoodle from "@/images/arrow-doodle.png";
import peopleDoodle from "@/images/people-doodle.png";
import Image from "next/image";
import memoji1 from "@/images/beanie-memoji.png";
import memoji2 from "@/images/wink-memoji.png";
import UpArrowSvg from "@/images/up-arrow-contrast.svg";
import { toast } from "react-toastify";
import { ErrorAlert, SuccessAlert } from "@/components/alert/alert";
import { EmptyRsvp } from "@/components/rsvp/empty-rsvp/empty-rsvp";
import { Speaker } from "@/types/Speaker";
import Controls from "@/components/rsvp/controls/controls";

const pageSize = 6;

export const RSVP_TABS = {
  GENERAL: "GENERAL",
  BOOKMARKS: "BOOKMARKS",
};

const RSVP = ({ sessions, speakers }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [user, setUser] = React.useState<firebase.User | null>(null);
  const [showLogin, setShowLogin] = React.useState<boolean>(false);
  const [tickets, setTickets] = React.useState<Set<string>>(new Set());
  const [userToken, setUserToken] = React.useState<string | null>(null);

  const [hasCheckedInitialSession, setHasCheckedInitialSession] = React.useState<boolean>(false);

  const [activeTab, setActiveTab] = React.useState<string>(RSVP_TABS.GENERAL);
  const [showRSVPPopup, setShowRSVPPopup] = React.useState<boolean>(false);
  const [showRSVPPopupMobile, setShowRSVPPopupMobile] = React.useState<boolean>(false);

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
    talkModalState,
    onClickNext,
    onClickPrev,
    onChangeDay,
    onShowTalkDetails,
    onCloseTalkDetails,
    currentTalks,
    rangeText,
    totalTalks,
  } = useRSVPState({
    sessions: activeTab === RSVP_TABS.GENERAL ? sessions : getSessionsQuery.data?.sessions || [],
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
    setShowRSVPPopupMobile(false);
  };

  const onClickMenuButton = () => {
    if (user) {
      setShowRSVPPopup((currentState) => !currentState);
    } else {
      setShowLogin(true);
    }
  };

  const onRemoveSession = (sessionId: string) => () => {
    queryClient.setQueryData(["getSessions", user?.email], (data) => {
      if (!data || !Array.isArray(data)) return;

      return data.filter((session) => session !== sessionId);
    });
  };

  const getSessionImageURL = (session: Session) => {
    const speaker = speakers.find((speaker) => speaker.name === session.owner);

    if (speaker) return speaker.avatar;

    return session.speakerImage;
  };

  const renderMenuButton = () => {
    return (
      <div className='rsvp__menu'>
        <TertiaryButton onClick={onClickMenuButton}>
          {user ? "Hi, Omo Ologo" : "Login"}
        </TertiaryButton>
        <Controls
          isMenuOpen={showRSVPPopup}
          onClickMenu={onClickMenu}
          onHide={() => setShowRSVPPopup(false)}
        />
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
          image=''
          isLoading
        />
      ));
    }

    return currentTalks.map((talk) => (
      <RsvpTicket
        key={talk.owner || talk.sessionId}
        onClick={() => onShowTalkDetails(talk)}
        session={talk}
        isSelected={tickets.has(talk.sessionId)}
        onSelectTicket={onSelectTicket(talk)}
        isSecured={getSessionsQuery.data?.sessionIds.has(talk.sessionId)}
        onRemoveSession={onRemoveSession(talk.sessionId)}
        image={getSessionImageURL(talk)}
      />
    ));
  };

  const renderBody = () => {
    if (currentTalks.length === 0) {
      return <EmptyRsvp onClick={() => setActiveTab(RSVP_TABS.GENERAL)} />;
    }

    return (
      <>
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
      </>
    );
  };

  const renderMobileButton = () => {
    if (!user) return null;

    return (
      <div className='rsvp__mobile-button-wrapper'>
        <button
          className='rsvp__mobile-button'
          onClick={() => setShowRSVPPopupMobile((prev) => !prev)}
        >
          <UpArrowSvg />
        </button>
        <Controls
          isFadeDown
          onHide={() => setShowRSVPPopupMobile(false)}
          isMenuOpen={showRSVPPopupMobile}
          onClickMenu={onClickMenu}
        />
      </div>
    );
  };

  return (
    <>
      <Menu actionButton={renderMenuButton()} />
      <div className='rsvp'>
        <Image src={logicDoodle} alt='Logic Doodle' className='rsvp__logic' />
        <Image src={peopleDoodle} alt='People Doodle' className='rsvp__people' />
        {activeTab === RSVP_TABS.GENERAL && (
          <>
            <Image src={dotsDoodle} alt='Dots Doodle' className='rsvp__dots' />
            <Image src={repeatDoodle} alt='Repeat Doodle' className='rsvp__repeat' />
            <Image src={arrowDoodle} alt='Arrow Doodle' className='rsvp__arrow' />
            <Image src={memoji1} alt='Memoji' className='rsvp__memoji-1' />
            <Image src={memoji2} alt='Memoji' className='rsvp__memoji-2' />
          </>
        )}
        <h1
          className={classNames("rsvp__title", activeTab === RSVP_TABS.BOOKMARKS && "bookmarked")}
        >
          {activeTab === RSVP_TABS.GENERAL ? "RSVP" : "Your Booked Sessions"}
        </h1>
        {activeTab === RSVP_TABS.GENERAL && (
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
        {renderMobileButton()}
        {renderBody()}
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
          speakerImage={talkModalState.session ? getSessionImageURL(talkModalState.session) : ""}
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
  const [sessions, speakers] = await Promise.all([fetchSessions(), fetchSpeakers()]);

  return { props: { sessions, speakers } };
}) satisfies GetStaticProps<{
  sessions: Session[];
  speakers: Speaker[];
}>;
