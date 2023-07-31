import AutoBind from "../utils/bind";

export default class Component {
  innerWidth: number;
  selector: string | HTMLElement;
  selectorChildren: { [key: string]: string | HTMLElement | NodeList };
  element?: HTMLElement | null;
  elements: { [key: string]: HTMLElement | Element | NodeList | null | Array<string> } = {};

  constructor({
    element,
    elements,
  }: {
    element: string | HTMLElement;
    elements: { [key: string]: string | HTMLElement | NodeList };
  }) {
    AutoBind(this);

    this.innerWidth = window.innerWidth;

    this.selector = element;
    this.selectorChildren = { ...elements };
    this.create();
    this.addEventListener();
  }

  create() {
    if (this.selector instanceof HTMLElement) {
      this.element = this.selector;
    } else {
      this.element = document.querySelector(this.selector);
    }

    this.elements = {};

    Object.keys(this.selectorChildren).forEach((key) => {
      const entry = this.selectorChildren[key];

      if (entry instanceof HTMLElement || entry instanceof NodeList || Array.isArray(entry)) {
        this.elements[key] = entry;
      } else {
        if (this.element) {
          const elements = this.element.querySelectorAll(entry);

          if (elements.length === 0) {
            this.elements[key] = null;
          } else if (elements.length === 1) {
            this.elements[key] = this.element.querySelector(entry);
          }
        }
      }
    });
  }

  onResize() {}

  addEventListener() {
    window.addEventListener(
      "resize",
      () => {
        if (this.innerWidth === window.innerWidth) return;
        this.onResize();
        this.innerWidth = window.innerWidth;
      },
      { passive: true },
    );
  }
}
