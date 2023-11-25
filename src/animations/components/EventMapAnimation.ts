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

// Use pythagoras to calculate distance between two points
function calculateDistance(x1: number, y1: number, x2: number, y2: number) {
  const a = x2 - x1;
  const b = y2 - y1;
  return Math.sqrt(a * a + b * b);
}

function calculateDistanceBetweenElements(a: Element, b: Element) {
  const aPoint = a.getBoundingClientRect();
  const bPoint = b.getBoundingClientRect();
  return calculateDistance(aPoint.x, aPoint.y, bPoint.x, bPoint.y);
}

async function placeFeet(path: SVGPathElement, svg: SVGElement) {
  const feet = document.getElementById("feet");
  if (!feet) return;

  const pathLength = path.getTotalLength();
  const numFeetPairs = 20; // Number of feet pairs you want
  const spacing = pathLength / numFeetPairs;

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

  for (let i = 0; i <= numFeetPairs - 1; i++) {
    const lengthAtPoint = i * spacing;
    const point = path.getPointAtLength(lengthAtPoint);

    // Get the angle of the line
    const nextPoint = path.getPointAtLength(lengthAtPoint + 1);
    const angle = (Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * 180) / Math.PI;

    const newFeet = feet.cloneNode(true) as SVGPathElement;
    newFeet.style.color = "#12C2E9";
    newFeet.classList.add(feetClass);
    newFeet.setAttribute("transform", `translate(${point.x}, ${point.y}) rotate(${angle})`);

    svg.appendChild(newFeet);

    const progress = i / numFeetPairs;

    const easedProgress = ease(progress);
    const delay = 100 + (1 - easedProgress) * 150; // Adjust numbers as needed

    await sleep(delay);

    if (i < numFeetPairs - 1) {
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
        title: ".event-map-title",
      },
    });
  }

  async animatePath(path: Array<Room>) {
    document.getElementById(pathId)?.remove();
    //@ts-ignore
    [...document.getElementsByClassName(feetClass)].forEach((element) => {
      element.remove();
    });
    const nodes: Array<Element> = [];
    const points: Array<Point> = [];

    type Point = { x: number; y: number };

    let previousEndNode: Point | null = null;

    path.forEach((room, index) => {
      const element = this.element?.querySelector(`[data-room="${room}"]`);

      if (element) {
        const destination = element.querySelector("[data-node='destination']");

        let door: Element | null;

        // @ts-ignore
        if (element.dataset.twoDoors) {
          door = element.querySelector("[data-node='door']");

          const doors = Array.from(element.querySelectorAll("[data-node='door']")) as [
            Element,
            Element,
          ];
          const nextRoom = path[index + 1];
          const nextRoomElement = this.element?.querySelector(`[data-room="${nextRoom}"]`);
          const nextRoomPoint = nextRoomElement!.querySelector("[data-node='destination']")!;

          const doorDistancesToNextRoomPOI = doors.map((door) => {
            return calculateDistanceBetweenElements(door, nextRoomPoint);
          });

          if (doorDistancesToNextRoomPOI[0] < doorDistancesToNextRoomPOI[1]) {
            door = doors[0];
          } else {
            door = doors[1];
          }
        } else {
          door = element.querySelector("[data-node='door']");
        }

        let destinationPoints: Point | null = null;
        let doorPoints: Point | null = null;

        if (destination) {
          const rect = destination.getBoundingClientRect();
          destinationPoints = {
            x: rect.left,
            y: rect.top,
          };
        }

        // If it's just two rooms we just go from one point of interest to another point of interest
        if (door && index + 1 < path.length) {
          const rect = door.getBoundingClientRect();
          doorPoints = {
            x: rect.left,
            y: rect.top,
          };
        }

        if (destinationPoints && doorPoints && previousEndNode) {
          //Find the closest node to the previous node and draw to that
          const destDistance = calculateDistance(
            previousEndNode.x,
            previousEndNode.y,
            destinationPoints.x,
            destinationPoints.y,
          );
          const doorDistance = calculateDistance(
            previousEndNode.x,
            previousEndNode.y,
            doorPoints.x,
            doorPoints.y,
          );

          if (destDistance > doorDistance) {
            points.push(doorPoints, destinationPoints);
          } else {
            points.push(destinationPoints, doorPoints);
          }

          previousEndNode = { ...doorPoints };
        } else {
          if (destinationPoints) {
            points.push(destinationPoints);
          }

          if (doorPoints) {
            points.push(doorPoints);
          }

          if (door) {
            previousEndNode = door.getBoundingClientRect();
          } else if (destination) {
            previousEndNode = destination.getBoundingClientRect();
          }
        }
      }
    });

    const svg = this.elements.svg as SVGSVGElement;

    // Start the path data string
    let pathData = "";

    points.forEach(({ x, y }, index) => {
      // Adjust the coordinates for the SVG's coordinate system
      const svgPoint = getSVGPoint(svg, x, y);

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
    // pathElement.setAttribute("stroke", "transparent");
    pathElement.setAttribute("stroke", "black");
    pathElement.id = pathId;

    // Add the path to the SVG
    svg.appendChild(pathElement);

    await placeFeet(pathElement, svg);

    const title = document.querySelector(".event-map-title") as HTMLParagraphElement;

    const rest = 200;

    if (Math.random() > 0.5) {
      const currentText = title.innerText;
      title.style.color = "transparent";
      await sleep(rest);
      title.style.color = "inherit";
      title.innerText = "MISCHIEF MANAGED";
      await sleep(rest);
      title.style.color = "transparent";
      await sleep(rest);
      title.style.color = "inherit";
      title.innerText = "MISCHIEF MANAGED";
      await sleep(rest * 3);
      title.innerText = currentText;
    } else {
      const currentText = title.innerText;
      title.style.color = "transparent";
      await sleep(rest);
      title.style.color = "inherit";
      title.innerText = "Find me at N1femi on twitter 😉";
      await sleep(2000);
      title.innerText = currentText;
    }

    return nodes;
  }
}
