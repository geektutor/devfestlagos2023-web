import Component from "@/animations/classes/Component";
import { CustomEase } from "@/animations/utils/CustomEase";
import gsap from "gsap";

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
      },
    });

    this.onMount();
  }

  onMount() {
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
      eyes = _eyes as NodeListOf<SVGPathElement>;

    gsap.from(topLogo, {
      y: 0,
      yPercent: 100,
      easing: CustomEase.create("top-logo", "0.19, 0.00, 0.00, 1.00"),
      delay: 0.815,
      duration: 1.2,
    });

    const gdgEase = CustomEase.create("gdg", "0.38, 0.00, 0.00, 1.00");

    gsap.from([gdgLogo, gdgGoogle, gdgDeveloper, gdgGroups], {
      y: 0,
      yPercent: 105,
      easing: gdgEase,
      stagger: 0.2,
      duration: 0.917,
      delay: 0.3,
    });

    const staggerEase = CustomEase.create("", "0.44, 0.00, 0.00, 1.00");

    gsap.from(devfestLetters, {
      y: 106,
      stagger: 0.08,
      delay: 0.3,
      duration: 0.917,
      ease: staggerEase,
    });

    gsap.from(twennyThreeLetters, {
      y: 34,
      stagger: 0.08,
      delay: 0.3,
      duration: 0.917,
      ease: staggerEase,
    });

    gsap.from(lagosText, {
      y: 37,
      delay: 1,
      duration: 0.917,
      ease: staggerEase,
    });

    gsap
      .to([akin, bami], {
        opacity: 1,
        duration: 1.3,
        ease: staggerEase,
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

    gsap.from(loadingText, {
      y: 0,
      yPercent: 100,
      ease: staggerEase,
      duration: 0.917,
      delay: 0.3,
    });
  }
}
