import Component from "@/animations/classes/Component";
import { CustomEase } from "@/animations/utils/CustomEase";
import { split } from "@/animations/utils/text";
import gsap from "gsap";
import { EasingFunction } from "@/animations/types/gsap";
import { recapBounce } from "@/animations/easings";

export default class Homepage extends Component {
  easings: {
    DOODLE_EASE: EasingFunction;
    TITLE_EASE: EasingFunction;
    BOUNCE: EasingFunction;
  };
  hasPlayedBounceAnimation: boolean = false;

  constructor() {
    super({
      element: ".c-home",
      elements: {
        globeDoodle: ".c-home__intro__globe-doodle",
        peopleDoodle: ".c-home__intro__people-doodle",
        repeatDoodle: ".c-home__intro__repeat-doodle",
        videoDoodle: ".c-home__intro__video-doodle",
        title: ".c-home__intro__title",
        recapImages: "[data-recap-image]",
        recapWrapper: ".c-home__recap",
      },
    });

    this.easings = {
      DOODLE_EASE: CustomEase.create("doodle", "0.3, -0.05, 0.7, -0.5"),
      TITLE_EASE: CustomEase.create("doodle", "0.45, 1.45, 0.8, 1"),
      BOUNCE: CustomEase.create("doodle", recapBounce),
    };

    split({
      element: this.elements.title,
    });

    this.onMount();
    this.setupBounceAnimation();
  }

  onMount() {
    const {
      globeDoodle: _globeDoodle,
      peopleDoodle: _peopleDoodle,
      repeatDoodle: _repeatDoodle,
      videoDoodle: _videoDoodle,
      title: _title,
    } = this.elements;

    const globeDoodle = _globeDoodle as HTMLElement;
    const peopleDoodle = _peopleDoodle as HTMLElement;
    const repeatDoodle = _repeatDoodle as HTMLElement;
    const videoDoodle = _videoDoodle as HTMLElement;
    const title = _title as HTMLElement;

    const isMobile = window.innerWidth <= 430;

    const tl = gsap.timeline();

    tl.from(
      globeDoodle,
      {
        x: isMobile ? -window.innerWidth : window.innerWidth * -0.272,
        y: -24,
        ease: this.easings.DOODLE_EASE,
        delay: 0.4,
        duration: 0.6,
      },
      "doodle",
    );

    tl.from(
      repeatDoodle,
      {
        x: window.innerWidth * 0.306,
        y: 1085,
        ease: this.easings.DOODLE_EASE,
        delay: 0.8,
        duration: 0.6,
      },
      "doodle",
    );

    tl.from(
      peopleDoodle,
      {
        x: window.innerWidth * 0.833,
        y: -150,
        ease: this.easings.DOODLE_EASE,
        delay: 1.6,
        duration: 0.6,
      },
      "doodle",
    );

    tl.from(
      videoDoodle,
      {
        x: isMobile ? window.innerWidth * -0.2 : window.innerWidth * 1.118,
        y: 558,
        ease: this.easings.DOODLE_EASE,
        delay: 1.2,
        duration: 0.6,
      },
      "doodle",
    );

    tl.set(title, { opacity: 1 }, "doodle");

    tl.fromTo(
      title.querySelectorAll("span"),
      {
        y: -90,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 0.3,
        delay: 0.2,
      },
      "doodle",
    );
  }

  setupBounceAnimation() {
    const { recapImages: _recapImages, recapWrapper: _recapWrapper } = this.elements;

    const recapImages = _recapImages as NodeListOf<HTMLElement>;
    const recapWrapper = _recapWrapper as HTMLElement;

    const tl = gsap.timeline({
      paused: true,
      onComplete: () => {
        this.hasPlayedBounceAnimation = true;
      },
    });

    const windowHeight = window.innerHeight;
    const imageDistances = [76, 189, 126, 306, 80, 82];

    recapImages.forEach((image, index) => {
      tl.from(
        image,
        { duration: 2.5, y: -windowHeight - imageDistances[index], ease: this.easings.BOUNCE },
        "bounce",
      );
    });

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.hasPlayedBounceAnimation) {
            tl.resume(0);
            intersectionObserver.disconnect();
          }
        });
      },
      { threshold: 0.6, rootMargin: "-100px 0px 0px 0px" },
    );

    intersectionObserver.observe(recapWrapper);
  }
}
