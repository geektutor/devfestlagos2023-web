import Component from "@/animations/classes/Component";
import { Room } from "@/utils/map";

const pathId = "map-directions";

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
    pathElement.setAttribute("stroke", "black");
    pathElement.id = pathId;

    // Add the path to the SVG
    svg.appendChild(pathElement);

    pathElement.classList.add("map_path");

    return nodes;
  }
}
