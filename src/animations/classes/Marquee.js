import AutoBind from "../utils/bind";
import Prefix from "prefix";
import { getOffset, mapEach } from "../utils/dom";
import { lerp } from "../utils/math";

export default class Marquee {
  constructor({ element, elements }) {
    AutoBind(this);

    this.element = element;
    this.elements = elements;

    this.transformPrefix = Prefix("transform");
    this.disableVelocity = false;

    this.scroll = {
      ease: 0.1,
      position: 0,
      current: 0,
      target: 0,
      last: 0,
      clamp: 0,
    };

    mapEach(this.elements.items, (element) => {
      const offset = getOffset(element);

      element.extra = 0;
      element.width = offset.width;
      element.offset = element.offsetLeft;
      element.position = 0;
    });

    this.length = this.elements.items.length;

    this.width = this.elements.items[0].width;
    this.widthTotal = this.elements.list.getBoundingClientRect().width;

    this.velocityValue = 1;
    this.velocity = this.velocityValue;

    this.addEventListeners();
    this.enable();
  }

  enable() {
    this.isEnabled = true;

    this.elements.list.addEventListener("mouseenter", () => {
      this.hovered = true;
    });

    this.elements.list.addEventListener("mouseleave", () => {
      this.hovered = false;
    });

    this.update();
  }

  disable() {
    this.isEnabled = false;

    mapEach(this.elements.items, (element) => {
      this.transform(element, 0, 0, 0);
    });
  }

  onTouchDown(event) {
    this.elements.list.classList.add("dragging");

    if (!this.isEnabled) return;

    this.isDown = true;

    this.scroll.position = this.scroll.current;
    this.start = event.touches ? event.touches[0].clientX : event.clientX;
  }

  onTouchMove(event) {
    if (!this.isDown || !this.isEnabled) return;

    const x = event.touches ? event.touches[0].clientX : event.clientX;
    const distance = (this.start - x) * 2;

    this.scroll.target = this.scroll.position + distance;
  }

  onTouchUp() {
    this.elements.list.classList.remove("dragging");
    if (!this.isEnabled) return;

    this.isDown = false;
  }

  onWheel() {
    // if (!this.isEnabled) return;
    // const normalized = NormalizeWheel(event);
    // const speed = normalized.pixelY * 0.5;
    // this.scroll.target += speed;
  }

  transform(element, x) {
    element.style[this.transformPrefix] = `translate3d(${Math.floor(x)}px, 0, 0)`;
  }

  onResize() {
    this.width = this.elements.items[0].getBoundingClientRect().width;
    this.widthTotal = this.elements.list.getBoundingClientRect().width;

    this.scroll = {
      ease: 0.1,
      position: 0,
      current: 0,
      target: 0,
      last: 0,
    };

    mapEach(this.elements.items, (element) => {
      this.transform(element, 0);

      const offset = getOffset(element);

      element.extra = 0;
      element.width = offset.width;
      element.offset = offset.left;
      element.position = 0;
    });
  }

  addEventListeners() {
    this.elements.list.addEventListener("mousedown", this.onTouchDown, {
      passive: true,
    });
    this.elements.list.addEventListener("mousemove", this.onTouchMove, {
      passive: true,
    });
    this.elements.list.addEventListener("mouseup", this.onTouchUp, {
      passive: true,
    });

    this.elements.list.addEventListener("touchstart", this.onTouchDown, {
      passive: true,
    });
    this.elements.list.addEventListener("touchmove", this.onTouchMove, {
      passive: true,
    });
    this.elements.list.addEventListener("touchend", this.onTouchUp, {
      passive: true,
    });
  }

  update() {
    if (!this.isEnabled) return;

    if (this.element.classList.contains("active")) {
      this.disableVelocity = false;
    } else {
      this.disableVelocity = true;
    }

    this.scroll.target += this.velocity;

    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);

    this.isVelocity = this.hovered || this.disableVelocity;

    const scrollClamp = Math.round(this.scroll.current % this.widthTotal);

    if (this.scroll.current < this.scroll.last) {
      this.direction = "down";
      this.velocity = this.isVelocity ? 0 : -this.velocityValue;
    } else {
      this.direction = "up";
      this.velocity = this.isVelocity ? 0 : this.velocityValue;
    }

    mapEach(this.elements.items, (element) => {
      element.position = -this.scroll.current - element.extra;

      const offset = element.position + element.offset + element.width;

      element.isBefore = offset < 0;
      element.isAfter = offset > this.widthTotal;

      if (this.direction === "up" && element.isBefore) {
        element.extra = element.extra - this.widthTotal;

        element.isBefore = false;
        element.isAfter = false;
      }

      if (this.direction === "down" && element.isAfter) {
        element.extra = element.extra + this.widthTotal;

        element.isBefore = false;
        element.isAfter = false;
      }

      element.clamp = element.extra % scrollClamp;

      this.transform(element, element.position);
    });

    this.scroll.last = this.scroll.current;
    this.scroll.clamp = scrollClamp;
  }
}
