import Component from "@/animations/classes/Component";
import { Room } from "@/utils/map";

const pathId = "map-directions";
const feetClass = "new-elements";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function easeOutQuad(t: number) {
  return t * (2 - t);
}

function easeInQuad(t: number) {
  return t * t;
}

function easeOutCubic(t: number) {
  return --t * t * t + 1;
}

async function placeFeet(path: SVGPathElement, svg: SVGElement) {
  const feet = document.getElementById("feet");
  if (!feet) return;

  const pathLength = path.getTotalLength();
  const numFeetPairs = 20; // Number of feet pairs you want
  const spacing = pathLength / numFeetPairs;

  for (let i = 0; i <= numFeetPairs; i++) {
    const lengthAtPoint = i * spacing;
    const point = path.getPointAtLength(lengthAtPoint);

    // Get the angle of the line
    const nextPoint = path.getPointAtLength(lengthAtPoint + 1);
    const angle = (Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * 180) / Math.PI;

    const newFeet = feet.cloneNode(true) as SVGPathElement;
    newFeet.style.color = "#12C2E9";
    newFeet.classList.add(feetClass);
    newFeet.setAttribute("transform", `translate(${point.x - 10}, ${point.y}) rotate(${angle})`);

    svg.appendChild(newFeet);

    const progress = i / numFeetPairs;

    const randomNumber = Math.random();

    let ease = easeInQuad;

    if (randomNumber > 0.3 && randomNumber < 0.6) {
      ease = easeOutQuad;
      console.log("Used ease out quad");
    } else if (randomNumber > 0.6) {
      ease = easeOutCubic;
      console.log("Used ease out cubic");
    } else {
      console.log("Used ease in quad");
    }

    const easedProgress = ease(progress);
    const delay = 100 + (1 - easedProgress) * 200; // Adjust numbers as needed

    await sleep(delay);

    if (i < numFeetPairs) {
      //@ts-ignore
      newFeet.style.opacity = 0.5;
    }
  }
}

function getSVGPoint(element: SVGSVGElement, x: number, y: number) {
  const pt = element.createSVGPoint();
  pt.x = x;
  pt.y = y;

  const ctm = element.getScreenCTM();
  if (!ctm) {
    throw new Error("Unable to get CTM from element.");
  }

  return pt.matrixTransform(ctm.inverse());
}

export default class EventMapAnimation extends Component {
  constructor() {
    super({
      element: ".event-map",
      elements: {
        room: "[data-room]",
        svg: ".event-map-svg",
      },
    });
  }

  animatePath(path: Array<Room>) {
    document.getElementById(pathId)?.remove();
    //@ts-ignore
    [...document.getElementsByClassName(feetClass)].forEach((element) => {
      element.remove();
    });
    const nodes: Array<Element> = [];

    path.forEach((room, index) => {
      const element = this.element?.querySelector(`[data-room="${room}"]`);

      if (element) {
        const destination = element.querySelector("[data-node='destination']");
        const door = element.querySelector("[data-node='door']");

        if (destination) {
          nodes.push(destination);
        }

        if (door && index + 1 < path.length) {
          nodes.push(door);
        }
      }
    });

    const svg = this.elements.svg as SVGSVGElement;

    // Start the path data string
    let pathData = "";

    nodes.forEach((node, index) => {
      // Get the position of the dot relative to the viewport
      const { left, top } = node.getBoundingClientRect();

      // Adjust the coordinates for the SVG's coordinate system
      const svgPoint = getSVGPoint(svg, left, top);

      // If it's the first dot, move to it, otherwise draw a line to it
      if (index === 0) {
        pathData += `M${svgPoint.x},${svgPoint.y}`;
      } else {
        pathData += ` L${svgPoint.x},${svgPoint.y}`;
      }
    });

    // Create a new path element
    const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
    pathElement.setAttribute("d", pathData);
    pathElement.setAttribute("fill", "none");
    pathElement.setAttribute("stroke", "transparent");
    pathElement.id = pathId;

    // Add the path to the SVG
    svg.appendChild(pathElement);

    placeFeet(pathElement, svg);

    return nodes;
  }
}
