import Component from "@/animations/classes/Component";
import { CustomEase } from "@/animations/utils/CustomEase";
import gsap from "gsap";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default class PreloaderAnimation extends Component {
  constructor() {
    super({
      element: ".c-preloader",
      elements: {
        bami: ".c-preloader__bami",
        akin: ".c-preloader__akin",
        topLogo: ".c-preloader__top-logo__svg",
        gdgLogo: ".c-preloader__gdg__logo",
        gdgGoogle: ".c-preloader__gdg__google",
        gdgDeveloper: ".c-preloader__gdg__developer",
        gdgGroups: ".c-preloader__gdg__groups",
        devfestLetters: ".c-preloader__devfest__text path",
        twennyThreeLetters: ".c-preloader__devfest__twennythree path",
        lagosText: ".c-preloader__devfest__lagos svg",
        loadingText: ".c-preloader__loading span",
        eyes: ".eye",
        counterWrapper: ".c-preloader__progress__inner",
        counterColumns: ".c-preloader__progress [data-column]",
      },
    });

    this.onMount();
  }

  async onMount() {
    const {
      topLogo: _topLogo,
      gdgLogo: _gdgLogo,
      gdgGoogle: _gdgGoogle,
      gdgDeveloper: _gdgDeveloper,
      gdgGroups: _gdgGroups,
      devfestLetters: _devfestLetters,
      twennyThreeLetters: _twennyThreeLetters,
      lagosText: _lagosText,
      bami: _bami,
      akin: _akin,
      loadingText: _loadingText,
      eyes: _eyes,
      counterColumns: _counterColumns,
      counterWrapper: _counterWrapper,
    } = this.elements;

    const topLogo = _topLogo as SVGElement,
      gdgLogo = _gdgLogo as SVGElement,
      gdgGoogle = _gdgGoogle as SVGElement,
      gdgDeveloper = _gdgDeveloper as SVGElement,
      gdgGroups = _gdgGroups as SVGElement,
      devfestLetters = _devfestLetters as NodeListOf<SVGElement>,
      twennyThreeLetters = _twennyThreeLetters as NodeListOf<SVGElement>,
      lagosText = _lagosText as SVGElement,
      bami = _bami as SVGElement,
      akin = _akin as SVGElement,
      loadingText = _loadingText as HTMLElement,
      eyes = _eyes as NodeListOf<SVGPathElement>,
      counterColumns = _counterColumns as NodeListOf<HTMLElement>,
      counterWrapper = _counterWrapper as HTMLElement;

    await sleep(500);

    //todo: idea maybe set all elements to opacity 0 and then animate them in after setting back to prevent the flash of the elements

    gsap.to(topLogo, {
      y: 0,
      easing: CustomEase.create("top-logo", "0.19, 0.00, 0.00, 1.00"),
      duration: 1.75,
    });

    const gdgEase = CustomEase.create("gdg", "0.38, 0.00, 0.00, 1.00");

    gsap.to([gdgLogo, gdgGoogle, gdgDeveloper, gdgGroups], {
      y: 0,
      easing: gdgEase,
      stagger: 0.083,
      duration: 0.917,
      delay: 0.083,
    });

    const staggerEase = CustomEase.create("", "0.44, 0.00, 0.00, 1.00");

    gsap.to(devfestLetters, {
      y: 0,
      stagger: 0.083,
      delay: 0.417,
      duration: 0.917,
      ease: staggerEase,
    });

    gsap.to(twennyThreeLetters, {
      y: 0,
      stagger: 0.083,
      delay: 0.667,
      duration: 0.917,
      ease: staggerEase,
    });

    gsap.to(lagosText, {
      y: 0,
      delay: 1.05,
      duration: 0.917,
      ease: staggerEase,
    });

    gsap
      .to([akin, bami], {
        opacity: 1,
        duration: 0.667,
        ease: CustomEase.create("gdg", "0.33, 0.00, 0.01, 1.00"),
      })
      .then(() => {
        eyes.forEach((eye) => {
          const bbox = eye.getBBox();
          const centerX = bbox.x + bbox.width;
          const centerY = bbox.y + bbox.height;

          eye.setAttribute("transform-origin", `${centerX}px ${centerY}px`);
        });

        akin.classList.add("play-animation");
        bami.classList.add("play-animation");
      });

    gsap.to(loadingText, {
      y: 0,
      // yPercent: 100,
      ease: staggerEase,
      duration: 0.917,
      delay: 0.667,
    });

    gsap
      .to(counterWrapper, {
        y: 0,
        ease: staggerEase,
        duration: 0.917,
      })
      .then(() => {
        const columnTwo = counterColumns[1];
        const columnThree = counterColumns[2];

        this.scrollColumnToNumber(columnTwo, 2);

        this.scrollColumnToNumber(columnThree, 3, 0.25);
      });
  }

  scrollColumnToNumber(column: HTMLElement, number: number, delay = 0) {
    const numberElement = column.querySelectorAll("span")[9 - number];
    const ease = CustomEase.create("counter", "0.33, 0.00, 0.67, 1.00");

    return gsap.to(column, {
      ease,
      y: -numberElement.offsetTop,
      duration: (0.45 * number) / 1.75,
      delay,
    });
  }
}
