import Component from "@/animations/classes/Component";
import GSAP from "gsap";
import { CustomEase } from "@/animations/utils/CustomEase";
import Marquee from "@/animations/classes/Marquee";
import { calculateSentences, split } from "@/animations/utils/text";

const easings = {
  LOGO: CustomEase.create("doodle", "0.81, 0.00, 0.00, 1.00"),
  MENU_ITEMS: CustomEase.create("doodle", "0.21, 0.00, 0.00, 1.00"),
  MENU_ARROW: CustomEase.create("doodle", "0.79, 0.00, 0.00, 1.00"),
  MENU_CIRCLE: CustomEase.create("doodle", "0.33, 0.00, 0.67, 1.00"),
  MENU_BUTTON_TEXT: CustomEase.create("doodle", "0.24, 0.00, 0.68, 1.00"),
  GDG_OPACITY: CustomEase.create("doodle", "0.33, 0.00, 0.00, 1.00"),
  GDG_ROTATION: CustomEase.create("doodle", "0.71, 0.00, 0.00, 1.00"),
  LANDING_TITLE: CustomEase.create("doodle", "0.14, 0.00, 0.00, 1.00"),
  LANDING_DESCRIPTION: CustomEase.create("doodle", "0.05, 0.00, 0.00, 1.00"),
  LANDING_IMAGE: CustomEase.create("doodle", "0.60, 0.00, 0.00, 1.00"),
  LANDING_DOODLES: CustomEase.create("doodle", "0.09, 0.00, 0.00, 1.00"),
  SPONSOR_BETTER: CustomEase.create("doodle", "0.13, 0.00, 0.00, 1.00"),
  RECAP_VIDEO: CustomEase.create("doodle", "0.09, 0.00, 0.00, 1.00"),
  SPEAKERS_TITLE: CustomEase.create("doodle", "0.07, 0.00, 0.00, 1.00"),
  SPEAKERS_MEMOJI: CustomEase.create("doodle", "0.89, 0.00, 0.00, 1.00"),
  SPEAKERS_CARDS: CustomEase.create("doodle", "0.91, 0.00, 0.00, 1.00"),
  FAQ_ITEM: CustomEase.create("doodle", "0.11, 0.00, 0.00, 1.00"),
};

const getButtonWithArrowSelectors = (baseSelector: string) => ({
  text: `${baseSelector} span`,
  iconCircle: `${baseSelector} svg path:first-child`,
  iconArrow: `${baseSelector} svg path:last-child`,
});

export default class LandingPage extends Component {
  //@ts-ignore
  marquee: InstanceType<Marquee>;

  constructor() {
    super({
      element: ".landing-page",
      elements: {
        gdgPresents: "[data-gdg-presents]",
        landingTitle: "[data-landing-title] span span",
        landingSubtext: "[data-landing-subtext]",
        landingButtonText: getButtonWithArrowSelectors("[data-landing-button]").text,
        landingButtonIconCircle: getButtonWithArrowSelectors("[data-landing-button]").iconCircle,
        landingButtonIconArrow: getButtonWithArrowSelectors("[data-landing-button]").iconArrow,
        landingDoodles: "[data-landing-doodle]",
        landingScene: "[data-scene]",
        landingSponsorCTA: "[data-sponsor-cta]",
        marqueeList: "[data-marquee-list]",
        marqueeItem: "[data-marquee-item]",
        betterTitle: "[data-better-title]",
        betterSponsor: "[data-better-sponsor]",
        betterLogos: "[data-better-logos] svg",
        recapTitle: "[data-recap-title]",
        recapSubtitle: "[data-recap-subtext]",
        recapVideo: "[data-recap-video]",
        speakersTitle: "[data-speakers-title]",
        speakersTitleWord: "[data-speakers-title-word]",
        speakersSubText: "[data-speakers-subtext]",
        speakersDoodle: "[data-speaker-doodle]",
        speakersMemoji: "[data-speaker-memoji]",
        speakerCards: "[data-speaker-card]",
        speakerButton: "[data-speaker-button]",
        speakerSparkle: "[data-speakers-sparkle]",
        speakersBanner: "[data-speakers-banner]",
        faqTitle: "[data-faq-title]",
        faqSubtitle: "[data-faq-sub]",
        faqItem: "[data-faq-item] div",
      },
    });

    this.elements = {
      ...this.elements,
      menuLogo: document.querySelector("[data-menu-logo]"),
      menuButton: document.querySelector("[data-menu-button]"),
      menuButtonText: document.querySelector(
        getButtonWithArrowSelectors("[data-menu-button]").text,
      ),
      menuButtonIconWhite: document.querySelector(
        getButtonWithArrowSelectors("[data-menu-button]").iconCircle,
      ),
      menuButtonIconArrow: document.querySelector(
        getButtonWithArrowSelectors("[data-menu-button]").iconArrow,
      ),
      //@ts-ignore
      navItems: Array.from(document.querySelectorAll("[data-nav-item] a")),
    };

    this.update();

    const { betterSponsor, landingSubtext, betterTitle, recapTitle, recapSubtitle, speakersTitle, speakersTitleWord, speakersSubText, faqTitle, faqSubtitle} = this.elements;

    this.elements.landingSubtextWords = this.convertToSentences(landingSubtext);
    this.elements.betterTitleWords = this.convertToSentences(betterTitle);
    this.elements.recapTitleWords = this.convertToSentences(recapTitle);
    this.elements.recapSubtitleWords = this.convertToSentences(recapSubtitle);
    this.elements.faqTitleWords = this.convertToSentences(faqTitle);
    this.elements.faqSubtitleWords = this.convertToSentences(faqSubtitle);

    this.elements.betterSponsor = this.addSpan(betterSponsor);
    this.elements.speakersTitle = this.addSpan(speakersTitle);
    this.elements.speakersTitleWord = this.addSpan(speakersTitleWord);
    this.elements.speakersSubText = this.addSpan(speakersSubText);

    this.setup();

    this.animateLanding();
    this.animateBetter();
    this.animateRecap();
    this.animateSpeakers();
    setTimeout(() => {
      this.animateFAQ();
    }, 5000)
  }

  convertToSentences(element: HTMLElement) {
    split({
      element,
    });

    split({
      element,
    });

    element.dataset.sentences = "true";

    return calculateSentences(this.getWords(element as HTMLElement));
  }

  getWords(element: HTMLElement) {
    return element.querySelectorAll("span span");
  }

  addSpan(element: HTMLElement) {
    const currentHTML = element.innerHTML;
    element.innerHTML = `<span>${currentHTML}</span>`;
    element.dataset.lineAnimation = "true";

    return element.querySelector("span");
  }

  setup() {
    const {
      menuLogo,
      navItems,
      menuButtonText,
      menuButtonIconWhite,
      menuButtonIconArrow,
      gdgPresents,
      landingTitle,
      landingButtonText,
      landingButtonIconCircle,
      landingButtonIconArrow,
      landingDoodles,
      landingScene,
      landingSponsorCTA,
      landingSubtextWords,
      betterSponsor,
      betterLogos,
      betterTitleWords,
      recapTitleWords,
      recapSubtitleWords,
      recapVideo,
      speakersTitle,
      speakersTitleWord,
      speakersSubText,
      speakersDoodle,
      speakersMemoji,
      speakerCards,
      speakerButton,
      speakerSparkle,
      speakersBanner,
      faqTitleWords,
      faqSubtitleWords,
      faqItem
    } = this.elements;

    GSAP.set(
      [
        menuLogo,
        navItems,
        landingTitle,
        landingSubtextWords,
        betterSponsor,
        betterTitleWords,
        betterLogos,
        recapTitleWords,
        recapSubtitleWords,
        speakersTitle,
        speakersTitleWord,
        speakersSubText,
        faqTitleWords,
        faqSubtitleWords
      ],
      {
        yPercent: 100,
      },
    );

    GSAP.set([menuButtonIconArrow, landingButtonIconArrow], {
      scaleX: 0,
      transformOrigin: "left",
    });

    GSAP.set([menuButtonIconWhite, landingButtonIconCircle, speakersMemoji, speakerCards], {
      scale: 0,
      transformOrigin: "center",
    });

    GSAP.set(speakerCards, {
      x: "+400"
    })

    GSAP.set(
      [speakersBanner, menuButtonText, landingButtonText, landingDoodles, landingScene, gdgPresents, recapVideo, speakersDoodle, speakerSparkle],
      {
        opacity: 0,
      },
    );

    GSAP.set([gdgPresents], {
      rotate: 0,
      transformOrigin: "left",
    });

    GSAP.set([landingSponsorCTA], {
      rotate: -540,
    });

    GSAP.set([recapVideo], {
      y: "+200",
    });

    GSAP.set(faqItem, {
      y: "+100",
    });

    GSAP.set(speakerButton, {
      y: "+240",
    });
  }

  animateLanding() {
    const {
      menuLogo,
      navItems,
      menuButtonText,
      menuButtonIconWhite,
      menuButtonIconArrow,
      gdgPresents,
      landingTitle,
      landingButtonText,
      landingButtonIconCircle,
      landingButtonIconArrow,
      landingDoodles,
      landingScene,
      landingSponsorCTA,
      landingSubtextWords,
    } = this.elements;

    GSAP.to(menuLogo, {
      yPercent: 0,
      ease: easings.LOGO,
      duration: 1,
    });

    GSAP.to(navItems, {
      yPercent: 0,
      ease: easings.MENU_ITEMS,
      duration: 1,
      stagger: 0.08,
      delay: 0.08,
    });

    GSAP.to([menuButtonIconArrow, landingButtonIconArrow], {
      scaleX: 1,
      ease: easings.MENU_ARROW,
      duration: 0.917,
      delay: 1.367,
    });

    GSAP.to([menuButtonIconWhite, landingButtonIconCircle], {
      scale: 1,
      ease: easings.MENU_CIRCLE,
      duration: 0.55,
      delay: 0.983,
    });

    GSAP.to([menuButtonText, landingButtonText], {
      opacity: 1,
      ease: easings.MENU_BUTTON_TEXT,
      duration: 0.25,
      delay: 0.783,
    });

    GSAP.to(gdgPresents, {
      rotate: -10,
      duration: 1,
      ease: easings.GDG_ROTATION,
    });

    GSAP.to(gdgPresents, {
      opacity: 1,
      duration: 1,
      ease: easings.GDG_OPACITY,
    });

    GSAP.to(landingSponsorCTA, {
      rotate: 0,
      duration: 0.896,
      ease: "none",
      delay: 0.167,
    });

    GSAP.to(landingTitle, {
      yPercent: 0,
      duration: 1,
      ease: easings.LANDING_TITLE,
      delay: 0.167,
      stagger: 0.084,
    });

    landingSubtextWords.forEach((sentence, index) => {
      GSAP.to(sentence, {
        yPercent: 0,
        duration: 1,
        ease: easings.LANDING_DESCRIPTION,
        delay: 0.333 + 0.084 * index,
      });
    });

    GSAP.to(landingScene, {
      opacity: 1,
      duration: 1,
      ease: easings.LANDING_IMAGE,
      delay: 0.35,
    });

    GSAP.to(landingDoodles, {
      opacity: 1,
      duration: 1,
      ease: easings.LANDING_IMAGE,
      delay: 0.083,
      stagger: 0.083,
    });
  }

  animateBetter() {
    const { betterSponsor, betterLogos, betterTitleWords } = this.elements;

    betterTitleWords.forEach((sentence, index) => {
      GSAP.to(sentence, {
        yPercent: 0,
        duration: 1,
        ease: easings.SPONSOR_BETTER,
        delay: 0.083 * index,
      });
    });

    GSAP.to(betterSponsor, {
      yPercent: 0,
      duration: 1,
      ease: easings.SPONSOR_BETTER,
      delay: 0.167,
    });

    GSAP.to(betterLogos, {
      yPercent: 0,
      duration: 1,
      ease: easings.SPONSOR_BETTER,
      delay: 0.083,
      stagger: 0.083,
    });
  }

  animateRecap() {
    const { recapTitleWords, recapSubtitleWords, recapVideo } = this.elements;

    recapTitleWords.forEach((sentence, index) => {
      GSAP.to(sentence, {
        yPercent: 0,
        duration: 1,
        ease: easings.SPONSOR_BETTER,
        delay: 0.083 * index,
      });
    });

    recapSubtitleWords.forEach((sentence, index) => {
      GSAP.to(sentence, {
        yPercent: 0,
        duration: 1,
        ease: easings.SPONSOR_BETTER,
        delay: 0.083 * index + 0.167,
      });
    });

    GSAP.to(recapVideo, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: easings.RECAP_VIDEO,
      delay: .35,
    });
  }

  animateSpeakers(){
    const {
      speakersTitle,
      speakersTitleWord,
      speakersSubText,
      speakersDoodle,
      speakersMemoji,
      speakerCards,
      speakerButton,
      speakerSparkle,
      speakersBanner
    } = this.elements;

    GSAP.to([speakersDoodle, speakerSparkle], {
      opacity: 1,
      duration: 1,
      ease: easings.GDG_OPACITY,
    });

    GSAP.to(speakersBanner, {
      opacity: 1,
      duration: 1,
      delay: .84,
      ease: easings.GDG_OPACITY,
    });

    GSAP.to([speakersTitle, speakersTitleWord, speakersSubText], {
      yPercent: 0,
      duration: 1,
      ease: easings.SPEAKERS_TITLE,
      stagger: .084
    });

    GSAP.to(speakerButton, {
      y: 0,
      duration: 1,
      delay: .8,
      ease: easings.SPEAKERS_TITLE
    });

    GSAP.to(speakersMemoji, {
      scale: 1,
      duration: 1,
      ease: easings.SPEAKERS_MEMOJI
    });

    GSAP.to(speakerCards, {
      x: 0,
      scale: 1,
      duration: 1.417,
      ease: easings.SPEAKERS_CARDS,
      stagger: .083,
      onComplete: () => {
        this.marquee = new Marquee({
          element: this.elements.marqueeList,
          elements: {
            items: this.elements.marqueeItem,
            list: this.elements.marqueeList,
          },
        });
      }
    });
  }

  animateFAQ(){
    const {
      faqTitleWords,
      faqSubtitleWords,
      faqItem
    } = this.elements;

    [...faqTitleWords, ...faqSubtitleWords].forEach((sentence, index) => {
      GSAP.to(sentence, {
        yPercent: 0,
        duration: 1,
        ease: easings.FAQ_ITEM,
        delay: .084 * index
      });
    })

    GSAP.to(faqItem, {
      y: 0,
      delay: .333,
      duration: 1,
      ease: easings.FAQ_ITEM,
      stagger: .084
    })
  }

  update() {
    this.marquee?.update();
    window.requestAnimationFrame(this.update);
  }
}
