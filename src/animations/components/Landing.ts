// @ts-nocheck I can't deal with the type issues right now :)
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
  FAQ: CustomEase.create("doodle", "0.11, 0.00, 0.00, 1.00"),
  NO_MATTER_WHAT: CustomEase.create("doodle", "0.17, 0.00, 0.00, 1.00"),
  HYPE: CustomEase.create("doodle", "0.18, 0.00, 0.00, 1.00"),
  FOOTER: CustomEase.create("doodle", "0.12, 0.00, 0.00, 1.00"),
  TALKS: CustomEase.create("doodle", "0.16, 0.00, 0.00, 1.00"),
  TALK_IMAGE: CustomEase.create("doodle", "0.84, 0.00, 0.00, 1.00"),
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const buttonSelectors = {
  text: `span`,
  iconCircle: `svg path:first-child`,
  iconArrow: `svg path:last-child`,
};

export default class LandingPage extends Component {
  //@ts-ignore
  marquee: InstanceType<Marquee>;

  constructor() {
    super({
      element: ".landing-page",
      elements: {
        sections: "section",
        header: "header",
        footer: "footer",
        animateSentences: "[data-animate-sentences]",
        animateY: "[data-animate-y]",
        animateYFull: "[data-animate-y-full]",
        animateYChildren: "[data-animate-y-children-full]",
        animateCanvas: "[data-animate-canvas]",
        hideForCanvas: "[data-hide-for-canvas]",
        addSpan: "[data-add-span]",
        animateButtons: "[data-animate-button]",
        fadeIn: "[data-fade-in]",
        marqueeList: "[data-marquee-list]",
        marqueeItem: "[data-marquee-item]",

        gdgPresents: "[data-gdg-presents]",
        landingDoodles: "[data-landing-doodle]",
        landingSponsorCTA: "[data-sponsor-cta]",
        speakersDoodle: "[data-speaker-doodle]",
        speakersMemoji: "[data-speaker-memoji]",
        speakerCards: "[data-speaker-card]",
        speakersBanner: "[data-speakers-banner]",
        speakersSection: "[data-speakers-section]",
      },
    });

    this.update();

    const { animateSentences, speakersSection, addSpan } = this.elements;

    addSpan.forEach(this.addSpan);
    animateSentences.forEach(this.convertToSentences);

    this.setupSections();
    this.setup();

    const animations = [[speakersSection, this.animateSpeakers]];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.some((entry) => {
          if (entry.isIntersecting) {
            const target = animations.findIndex((e) => e[0] === entry.target);

            if (target > -1) {
              observer.unobserve(entry.target);
              animations[target][1].call(this);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.7,
      },
    );

    animations.forEach((animation) => {
      observer.observe(animation[0]);
    });

    this.animateLanding();
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

  setupSections() {
    const { sections, header, footer } = this.elements;

    if (!(sections instanceof NodeList)) return;

    const sectionsArray = Array.from(sections).concat([header, footer]);

    sectionsArray.forEach((section, index) => {
      section.dataset.index = index;
    });

    const sectionElements: Array<Array<Node>> = [];

    const processElement = (element: Node) => {
      let parentSection = element.closest("section");

      if (!parentSection) {
        parentSection = element.closest("header") || element.closest("footer");
      }

      const index = Number(parentSection.dataset.index);

      if (!sectionElements[index]) {
        sectionElements[index] = [];
      }

      sectionElements[index].push(element);
    };

    Object.values(this.elements).forEach((element) => {
      if (!element || Array.isArray(element)) return;

      if (element instanceof NodeList) {
        element.forEach(processElement);
      } else {
        processElement(element);
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.some((entry) => {
          if (entry.isIntersecting) {
            const section = entry.target;

            const index = section.dataset.index;

            const elements = sectionElements[index];

            const sectionDelay = section.dataset.sectionDelay;

            elements.forEach(async (element) => {
              if (sectionDelay && !element.dataset.animateCanvas) {
                await sleep(Number(sectionDelay) * 1000);
              }

              if (element.dataset.animateSentences) {
                this.animateSentences(element);
              }

              if (element.dataset.animateYFull) {
                this.animateYFull(element);
              }

              if (element.dataset.animateYChildrenFull) {
                this.animateYChildrenFull(element);
              }

              if (element.dataset.animateButton) {
                this.animateButton(element);
              }

              if (element.dataset.fadeIn) {
                this.fadeIn(element);
              }

              if (element.dataset.animateY) {
                this.animateY(element);
              }

              if (element.dataset.animateCanvas) {
                this.animateCanvas(element);
              }
            });

            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: [0.3, 0.7],
      },
    );

    sectionsArray.forEach((animation) => {
      observer.observe(animation);
    });
  }

  animateCanvas(canvas: HTMLCanvasElement) {
    this.canvas = {
      progress: 0,
    };

    this.context = canvas.getContext("2d");

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    GSAP.to(this.canvas, {
      // canvas
      duration: 0.75,
      // duration: 3,
      // delay: 0.5,
      ease: easings.LANDING_DOODLES,
      onComplete: () => {
        canvas.closest("section").querySelector("[data-hide-for-canvas]").style.opacity = 1;
        // GSAP.set(this.elements.overlay, { opacity: 0 });

        // todo: we may not need this if we have a singleton preloader keep an eye on that.
        // GSAP.set(this.elements.canvas, { background: "white" });

        // resolve();
      },
      onUpdate: () => this.onUpdateCanvas(canvas),
      progress: 1,
    });
  }

  animateSentences(element: HTMLElement) {
    const words = calculateSentences(this.getWords(element as HTMLElement));
    const delay = Number(element.dataset.delay) || 0;
    const stagger = Number(element.dataset.stagger) || 0.084;
    const datasetEasing = element.dataset.easing as keyof typeof easings;
    const easing = easings[datasetEasing] || easings.LANDING_DESCRIPTION;

    words.forEach((sentence, index) => {
      GSAP.to(sentence, {
        yPercent: 0,
        duration: 1,
        ease: easing,
        delay: delay + stagger * index,
      });
    });
  }

  animateYFull(element) {
    const delay = Number(element.dataset.delay) || 0;
    const datasetEasing = element.dataset.easing as keyof typeof easings;
    const easing = easings[datasetEasing] || easings.LANDING_DESCRIPTION;

    const targetElement = element.dataset.addSpan ? element.querySelector("span") : element;

    GSAP.to(targetElement, {
      yPercent: 0,
      duration: 1,
      ease: easing,
      delay,
    });
  }

  animateYChildrenFull(element) {
    const delay = Number(element.dataset.delay) || 0;
    const stagger = Number(element.dataset.stagger) || 0.084;
    const datasetEasing = element.dataset.easing as keyof typeof easings;
    const easing = easings[datasetEasing] || easings.LANDING_DESCRIPTION;

    GSAP.to(element.children, {
      y: 0,
      duration: 1,
      ease: easing,
      delay,
      stagger,
    });
  }

  animateButton(button: HTMLElement) {
    const delay = Number(button.dataset.delay) || 0.783;

    GSAP.to(button.querySelector(buttonSelectors.iconArrow), {
      scaleX: 1,
      ease: easings.MENU_ARROW,
      duration: 0.917,
      delay: delay + 0.384,
    });

    GSAP.to(button.querySelector(buttonSelectors.iconCircle), {
      scale: 1,
      ease: easings.MENU_CIRCLE,
      duration: 0.55,
      delay: delay + 0.2,
    });

    GSAP.to(button.querySelector(buttonSelectors.text), {
      opacity: 1,
      ease: easings.MENU_BUTTON_TEXT,
      duration: 0.25,
      delay: delay,
    });
  }

  fadeIn(element: HTMLElement) {
    const delay = Number(element.dataset.delay) || 0;
    const datasetEasing = element.dataset.easing as keyof typeof easings;
    const easing = easings[datasetEasing] || easings.LANDING_IMAGE;

    GSAP.to(element, {
      opacity: 1,
      duration: 1,
      ease: easing,
      delay,
    });
  }

  animateY(element: HTMLElement) {
    const delay = Number(element.dataset.delay) || 0;
    const datasetEasing = element.dataset.easing as keyof typeof easings;
    const easing = easings[datasetEasing] || easings.SPEAKERS_TITLE;

    GSAP.to(element, {
      y: 0,
      duration: 1,
      delay,
      ease: easing,
    });
  }

  setup() {
    const {
      gdgPresents,
      landingDoodles,
      landingSponsorCTA,
      speakersDoodle,
      speakersMemoji,
      speakerCards,
      speakersBanner,
      animateSentences,
      animateYFull,
      animateYChildren,
      animateButtons,
      fadeIn,
      animateY,
      hideForCanvas,
    } = this.elements;

    GSAP.set(
      [
        [...animateYFull].map((element) => {
          if (element.dataset.addSpan) {
            return element.querySelector("span");
          } else {
            return element;
          }
        }),
        [...animateSentences].map((element) => element.querySelectorAll("span span")), //todo: replace with one function that gets words and calcs seentence
      ],
      {
        yPercent: 100,
      },
    );

    [...animateYChildren].map((element) => {
      GSAP.set(element.children, {
        y: element.offsetHeight,
      });
    });

    GSAP.set(
      [...animateButtons].map((button) => button.querySelector(buttonSelectors.iconArrow)),
      {
        scaleX: 0,
        transformOrigin: "left",
      },
    );

    GSAP.set(
      [
        [...animateButtons].map((button) => button.querySelector(buttonSelectors.iconCircle)),
        speakersMemoji,
        speakerCards,
      ],
      {
        scale: 0,
        transformOrigin: "center",
      },
    );

    GSAP.set(speakerCards, {
      x: "+400",
    });

    GSAP.set(
      [
        [...animateButtons].map((button) => button.querySelector(buttonSelectors.text)),
        speakersBanner,
        landingDoodles,
        speakersDoodle,
        fadeIn,
        hideForCanvas,
      ],
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

    [...animateY].forEach((element) => {
      GSAP.set(element, {
        y: element.dataset.animateY,
      });
    });

    this.element?.scrollTo({
      top: 0,
    });

    this.element?.classList.add("is-active");
  }

  animateLanding() {
    const { gdgPresents, landingDoodles, landingSponsorCTA } = this.elements;

    GSAP.to(gdgPresents, {
      rotate: -10,
      duration: 1,
      ease: easings.GDG_ROTATION,
    });

    GSAP.to(landingSponsorCTA, {
      rotate: 0,
      duration: 0.896,
      ease: "none",
      delay: 0.167,
    });

    GSAP.to(landingDoodles, {
      opacity: 1,
      duration: 1,
      ease: easings.LANDING_IMAGE,
      delay: 0.083,
      stagger: 0.083,
    });
  }

  animateSpeakers() {
    const { speakersDoodle, speakersMemoji, speakerCards, speakerButton } = this.elements;

    GSAP.to(speakersDoodle, {
      opacity: 1,
      duration: 1,
      ease: easings.GDG_OPACITY,
    });

    GSAP.to(speakerButton, {
      y: 0,
      duration: 1,
      delay: 0.8,
      ease: easings.SPEAKERS_TITLE,
    });

    GSAP.to(speakersMemoji, {
      scale: 1,
      duration: 1,
      ease: easings.SPEAKERS_MEMOJI,
    });

    GSAP.to(speakerCards, {
      x: 0,
      scale: 1,
      duration: 1.417,
      ease: easings.SPEAKERS_CARDS,
      stagger: 0.083,
      onComplete: () => {
        this.marquee = new Marquee({
          element: this.elements.marqueeList,
          elements: {
            items: this.elements.marqueeItem,
            list: this.elements.marqueeList,
          },
        });
      },
    });
  }

  update() {
    this.marquee?.update();
    window.requestAnimationFrame(this.update);
  }

  onUpdateCanvas(canvas) {
    this.context.clearRect(0, 0, canvas.width, canvas.height);
    this.context.save();
    this.context.beginPath();

    const numberOfSegments = 80;
    this.widthSegments = Math.ceil(canvas.width / numberOfSegments);
    this.context.moveTo(canvas.width, canvas.height);
    this.context.lineTo(0, canvas.height);

    const t = (1 - this.canvas.progress) * canvas.height;
    // const amplitude = 250 * Math.sin(this.canvas.progress * Math.PI);
    const amplitude = 150 * Math.sin(this.canvas.progress * Math.PI);

    this.context.lineTo(0, t);

    for (let index = 0; index <= this.widthSegments; index++) {
      const n = numberOfSegments * index;
      const r = t - Math.sin((n / canvas.width) * Math.PI) * amplitude;

      this.context.lineTo(n, r);
    }

    this.context.fillStyle = this.color;
    this.context.fill();
    this.context.restore();
  }
}
