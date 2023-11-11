import styles from "./dp.gen.module.scss";
import React from "react";
import Logo from "@/images/dp-generator/logo.svg";
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
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const description = `I ${name}, will be at the devFest Lagos 2023🤭🥳. Be there🫵🏾`;

  console.log("tracking photo", photo);

  // HTML2canvas implementation
  const handleDownload = () => {
    if (sectionRef.current) {
      const sectionElement = sectionRef.current;

      const loadImages = () => {
        const imageElements = Array.from(sectionElement.querySelectorAll("img, svg"));

        return Promise.allSettled<void>(
          imageElements.map((img) => {
            return new Promise<void>((resolve) => {
              if (img instanceof HTMLImageElement || img instanceof SVGImageElement) {
                img.onload = () => resolve();
                img.dispatchEvent(new Event("load"));
              } else {
                resolve();
              }
            });
          }),
        );
      };

      loadImages().then(() => {
        // All images have loaded, proceed to capture the section with html2canvas
        html2canvas(sectionElement, { scale: 4, useCORS: true }).then((canvas) => {
          // Get the canvas as a data URL with maximum quality
          const image = canvas.toDataURL("image/png", 1.0);

          // Create a download link for the captured image
          const downloadLink = document.createElement("a");
          downloadLink.href = image;
          downloadLink.download = `${name}-devfest-2023.png`;
          downloadLink.click();
        });
      });
    }
  };

  const handleRedo = () => handleRegenerate(false);

  const handleShareOnWhatsApp = () => {
    const text = encodeURIComponent(`${description}\n${photo}`);
    const whatsAppShareUrl = `https://wa.me/?text=${text}`;

    window.open(whatsAppShareUrl, "_blank");
  };

  return (
    <div className={styles.main_container}>
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
              // style={{
              //   backgroundImage: `url(${photo})`,
              // }}
              className={styles.img_holder}
            >
              <div className={styles.doodle_1}>
                <Image src={Doodle} alt='Doodle' />
              </div>
              <div className={styles.doodle_2}>
                <Image src={Move} alt='Move' />
              </div>
              <figure className={styles.doodle_3}>
                <Image src={Cup} alt='Cup' />
              </figure>
              {photo && (
                <>
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                  >
                    <Image
                      width={340}
                      height={340}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                        borderRadius: "50%",
                      }}
                      src={photo as string}
                      alt={name}
                    />
                  </div>
                </>
              )}
              <div className={styles.name}>😌 {name}</div>
            </div>
            <div className={styles.be_there}>WILL BE AT</div>

            <div className={styles.logo_container}>
              <Logo className={styles.logo} />
            </div>

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
          <PrimaryButton className={styles.btn_solid} onClick={handleShareOnWhatsApp}>
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
    </div>
  );
};
