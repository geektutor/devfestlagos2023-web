import React, { useEffect, useMemo, useState } from "react";
import { TeamMember } from "@/components/team-member/team-member";
import { ITeamMember, teamMembers } from "@/mock-data/team";
import { classNames } from "@/utils/classNames";
import FaqSection from "@/components/faq-section/faq-section";
import { NoMatterWhat } from "@/components/no-matter-what/no-matter-what";

const categories = [
  {
    id: "all",
    text: "All",
  },
  {
    id: "lead",
    text: "Leads",
  },
  {
    id: "dev",
    text: "Dev",
  },
  {
    id: "design",
    text: "Design",
  },
  {
    id: "content",
    text: "Content",
  },
  {
    id: "gdg-team",
    text: "Managers",
  },
] as const;

const shuffleTeamMembers = (array: ITeamMember[]) => {
  const newArray = [...array];

  let currentIndex = newArray.length;

  let temporaryValue: ITeamMember;

  let randomIndex: number;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);

    currentIndex -= 1;

    temporaryValue = newArray[currentIndex];

    newArray[currentIndex] = newArray[randomIndex];

    newArray[randomIndex] = temporaryValue;
  }

  return newArray;
};

const Team = () => {
  const [activeCategory, setActiveCategory] = React.useState(0);
  const [shuffledMembers, setShuffledMembers] = useState<ITeamMember[]>([]);

  useEffect(() => {
    setShuffledMembers(shuffleTeamMembers(teamMembers));
  }, []);

  const onChangeCategory = (index: number) => {
    setActiveCategory(index);
  };

  const filteredMembers = useMemo(() => {
    if (activeCategory === 0) {
      return shuffledMembers;
    }

    const category = categories[activeCategory].id;

    if (category === "lead") {
      return shuffledMembers.filter((member) => member.isLead);
    } else {
      return shuffledMembers.filter((member) => {
        const memberCategories = member.category.split(",");

        return memberCategories.includes(category);
      });
    }
  }, [activeCategory, shuffledMembers]);

  return (
    <div className='team'>
      <div className='team__intro'>
        <h1 className='team__intro__header'>Without them, there would be no app or website</h1>
        <p className='team__intro__subtext'>
          Here are profiles of the amazing people who worked on the website and app for this year’s
          DevFest
        </p>
      </div>
      <div className='team__dream'>
        <div className='team__dream__top'>
          <div>
            <h3 className='team__dream__header'>⭐ The Dream Team</h3>
            <p className='team__dream__subtext'>
              We even added some songs for you to listen to. And you are very free to judge our
              exquisite taste in music 🤭
            </p>
          </div>
          {/*@ts-ignore*/}
          <div className='team__dream__categories' style={{ "--index": activeCategory }}>
            {categories.map((category, index) => (
              <span
                onClick={() => onChangeCategory(index)}
                key={category.id}
                className={classNames(
                  "team__dream__category",
                  index === activeCategory && "is-active",
                )}
              >
                {category.text}
              </span>
            ))}
            <span className='team__dream__active-indicator' />
          </div>
        </div>
        <div className='team__grid'>
          {filteredMembers.map((member) => (
            <TeamMember member={member} key={member.key} />
          ))}
        </div>
      </div>
      <FaqSection />
      <NoMatterWhat />
    </div>
  );
};

export default Team;
