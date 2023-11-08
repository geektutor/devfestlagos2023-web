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
// import domToImage from "dom-to-image";

interface Props {
  name: string;
  theme: string;
  photo: string | null;
  handleRegenerate: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DpGen: React.FC<Props> = ({ name, photo, theme, handleRegenerate }) => {
  const sectionRef = React.useRef<HTMLElement | null>(null);

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
        html2canvas(sectionElement, { scale: 3, useCORS: true }).then((canvas) => {
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

  // domToImage implementation
  // const handleDownload = () => {
  //   if (sectionRef.current) {
  //     const sectionElement = sectionRef.current as HTMLElement;

  //     // Use dom-to-image to capture the section content as an image
  //     domToImage
  //       .toPng(sectionElement, { quality: 1.0 }) // Set the image quality to 1.0 for maximum quality
  //       .then((dataUrl) => {
  //         // Create a download link for the captured image
  //         const downloadLink = document.createElement("a");
  //         downloadLink.href = dataUrl;
  //         downloadLink.download = `${name}-devfest-2023.png`;
  //         downloadLink.click();
  //       })
  //       .catch((error) => {
  //         console.error("Error capturing image:", error);
  //       });
  //   }
  // };

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
                <Image src={Doodle} alt='Doodle' />
              </figure>
              <figure className={styles.doodle_2}>
                <Image src={Move} alt='Move' />
              </figure>
              <figure className={styles.doodle_3}>
                <Image src={Cup} alt='Cup' />
              </figure>
              {/* {photo && <Image width={340} height={340} src={photo as string} alt={name} />} */}
              <div className={styles.name}>😌 {name}</div>
            </div>
            <div className={styles.be_there}>WILL BE AT</div>

            {/* <Image className={styles.img_logo} src={Logo} alt='logo' width={"200"} height={"150"} /> */}

            {/* <div className={styles.img_logo}></div> */}

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
