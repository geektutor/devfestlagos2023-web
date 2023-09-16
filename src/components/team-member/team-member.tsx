import styles from "./team-member.module.scss";
import { FC } from "react";
import { ITeamMember, TeamMemberLink } from "@/mock-data/team";
import Image from "next/image";
import IgIcon from "@/images/team/links/linkedin.svg";
import LinkedInIcon from "@/images/team/links/linkedin.svg";
import TwitterIcon from "@/images/team/links/twitter.svg";
import FacebookIcon from "@/images/team/links/facebook.svg";
import EmailIcon from "@/images/team/links/mail.svg";

const linksMap: Partial<Record<TeamMemberLink["type"], FC>> = {
  instagram: IgIcon,
  twitter: TwitterIcon,
  linkedin: LinkedInIcon,
  facebook: FacebookIcon,
  email: EmailIcon,
};

export const TeamMember: FC<{ member: ITeamMember }> = ({ member }) => {
  return (
    <div className={styles.teamMember}>
      <div className={styles.leftColumn}>
        <div className={styles.name}>
          {member.name.split(" ").map((namePart, index) => (
            <span key={index}>{namePart}</span>
          ))}
        </div>
        <div className={styles.role}>{member.role}</div>
        <p className={styles.comment}>{member.comment}</p>
      </div>
      <div className={styles.picture}>
        <Image src={member.image} alt={member.name} fill />
      </div>
      <div className={styles.linksSection}>
        <p className={styles.sectionHeader}>LINKS</p>
        <div className={styles.links}>
          {member.links?.map((link, index) => {
            const Icon = linksMap[link.type]!;

            const isEmail = link.type === "email";

            const url = isEmail ? "mailto:" + link.url : link.url;

            return (
              <a
                key={index}
                href={url}
                target='_blank'
                rel='noopener noreferrer'
                className={styles.link}
              >
                <Icon />
              </a>
            );
          })}
        </div>
      </div>
      <div className={styles.spotify}></div>
      <div className={styles.quote}>
        <p className={styles.sectionHeader}>WORDS TO LIVE BY</p>
        <p>{member.quote}</p>
      </div>
    </div>
  );
};
