import styles from "./dp.gen.module.scss";
import React from "react";
import Logo from "@/images/logo.svg";
import Image from "next/image";
import Doodle from "@/images/right-doodle.png";
import Move from "@/images/move-icon.png";
import Cup from "@/images/cup-code.png";
import DownloadIcon from "@/images/download-icon.svg";
import RedoIcon from "@/images/redo-icon.svg";
import ShareIcon from "@/images/share-icon.svg";
import { PrimaryButton } from "@/components/button";
import html2canvas from "html2canvas";

interface Props {
  name: string;
  theme: string;
  photo: string | null;
  handleRegenerate: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DpGen: React.FC<Props> = ({ name, photo, theme, handleRegenerate }) => {
  const sectionRef = React.useRef(null);

  const handleDownload = () => {
    if (sectionRef.current) {
      const sectionElement = sectionRef.current;

      // Use html2canvas to capture the section content as an image
      html2canvas(sectionElement, { scale: 2 }).then((canvas) => {
        const image = canvas.toDataURL("image/png");

        // Create a download link for the captured image
        const downloadLink = document.createElement("a");
        downloadLink.href = image;
        downloadLink.download = `${name}-devfest-2023.png`;
        downloadLink.click();
      });
    }
  };

  const handleRedo = () => handleRegenerate(false);

  return (
    <>
      <section
        ref={sectionRef}
        className={`
     ${styles.dp_gen_section}

     ${
       theme === "green"
         ? styles.green
         : theme === "blue"
         ? styles.blue
         : theme === "yellow"
         ? styles.yellow
         : theme === "red"
         ? styles.red
         : ""
     }
     `}
      >
        <div className={styles.overlay}>
          <div className={styles.box1}></div>
          <div className={styles.box2}></div>
          <div className={styles.content}>
            <div
              style={{
                backgroundImage: `url(${photo})`,
              }}
              className={styles.img_holder}
            >
              <figure className={styles.doodle_1}>
                <Image src={Doodle} alt='Doodle' quality={100} />
              </figure>
              <figure className={styles.doodle_2}>
                <Image src={Move} alt='Move' quality={100} />
              </figure>
              <figure className={styles.doodle_3}>
                <Image src={Cup} alt='Cup' quality={100} />
              </figure>
              {/* {photo && <Image width={340} height={340} src={photo as string} alt={name} />} */}
              <div className={styles.name}>😌 {name}</div>
            </div>
            <div className={styles.be_there}>WILL BE AT</div>
            <Logo className={styles.logo} />

            <ul className={styles.group}>
              <li className={styles.list}>
                <div className={styles.name}>Get tickets at</div>
                <div className={styles.value}>devfestlagos.com</div>
              </li>
              <li className={styles.list}>
                <div className={styles.name}>Date</div>
                <div className={styles.value}>24-25th Nov</div>
              </li>
              <li className={styles.list}>
                <div className={styles.name}>Venue</div>
                <div className={styles.value}>Landmark Event Center</div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.action_section}>
        <div className={styles.content}>
          <PrimaryButton className={styles.btn_solid}>
            <ShareIcon /> Share
          </PrimaryButton>
          <PrimaryButton onClick={handleDownload} className={styles.btn_outline}>
            <DownloadIcon /> Download
          </PrimaryButton>
          <PrimaryButton onClick={handleRedo} className={styles.btn_outline}>
            <RedoIcon /> Regenerate
          </PrimaryButton>
        </div>
      </section>
    </>
  );
};
