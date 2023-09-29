import styles from "./team-member.module.scss";
import { FC } from "react";
import { ITeamMember, TeamMemberLink } from "@/mock-data/team";
import Image from "next/image";
import IgIcon from "@/images/team/links/instagram.svg";
import LinkedInIcon from "@/images/team/links/linkedin.svg";
import TwitterIcon from "@/images/team/links/twitter.svg";
import FacebookIcon from "@/images/team/links/facebook.svg";
import PlayIcon from "@/images/team/play-icon.svg";
import EmailIcon from "@/images/team/links/mail.svg";
import { classNames } from "@/utils/classNames";

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
      <div className={classNames(styles.row, styles.imageRow)}>
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
          <Image
            src={member.image}
            alt={member.name}
            fill
            style={{ objectFit: "cover" }}
            quality={80}
          />
        </div>
      </div>
      <div className={styles.row}>
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
        <a className={styles.music} href={member.music.url} target='_blank'>
          <div className={styles.musicInner}>
            <figure className={styles.albumArt}>
              <Image src={member.music.image} alt={member.music.name} fill />
            </figure>
            <div>
              <p className={styles.musicTitle}>{member.music.name}</p>
              <p className={styles.artist}>{member.music.artist}</p>
            </div>
            <PlayIcon className={styles.playIcon} />
          </div>
        </a>
      </div>
      <div className={styles.quote}>
        <p className={styles.sectionHeader}>WORDS TO LIVE BY</p>
        <p>{member.quote}</p>
      </div>
    </div>
  );
};
