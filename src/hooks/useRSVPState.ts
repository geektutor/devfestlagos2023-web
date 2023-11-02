import { Session } from "@/types/Session";
import { useMemo, useState } from "react";
import { Category } from "@/types/Category";

type Props = {
  sessions: Session[];
  pageSize: number;
  categories: Category[];
  scrollToTalks: () => void;
};

export const useRSVPState = ({ sessions, pageSize, categories, scrollToTalks }: Props) => {
  //State
  const [talksPage, setTalksPage] = useState(1);
  const [activeDay, setActiveDay] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const [talkModalState, setTalkModalState] = useState<{
    isOpen: boolean;
    session: Session | null;
  }>({ isOpen: false, session: null });

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

  const onShowTalkDetails = (session: Session) => {
    setTalkModalState({ isOpen: true, session });
  };

  const onCloseTalkDetails = () => {
    setTalkModalState((prevState) => ({ ...prevState, isOpen: false }));

    setTimeout(() => {
      setTalkModalState({ isOpen: false, session: null });
    }, 300);
  };

  return {
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
    setActiveCategory,
    totalTalks,
  };
};
