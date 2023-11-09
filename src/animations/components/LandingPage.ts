import Component from "@/animations/classes/Component";
import Marquee from "@/animations/classes/Marquee";

export default class LandingPage extends Component {
  //@ts-ignore
  marquee: InstanceType<Marquee>;

  constructor() {
    super({
      element: ".landing-page",
      elements: {
        marqueeList: "[data-marquee-list]",
        marqueeItem: "[data-marquee-item]",
      },
    });

    this.marquee = new Marquee({
      element: this.elements.marqueeList,
      elements: {
        items: this.elements.marqueeItem,
        list: this.elements.marqueeList,
      },
    });

    this.update();
  }

  update() {
    this.marquee?.update();
    window.requestAnimationFrame(this.update);
  }
}
