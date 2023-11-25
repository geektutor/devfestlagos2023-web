import { LOCATION_TO_STRING_MAP, LOCATIONS, Room } from "@/utils/map/data";

type Direction = "N" | "E" | "S" | "W" | "NE" | "SE" | "SW" | "NW";

type DM = Partial<Record<Room, Partial<Record<Room, Direction>>>>;

const DirectionedMap: DM = {
  [LOCATIONS.EXHIBITION]: {
    [LOCATIONS.ROOM_1]: "SE",
  },
  [LOCATIONS.ROOM_1]: {
    [LOCATIONS.EXHIBITION]: "SW",
    [LOCATIONS.ROOM_2]: "E",
    [LOCATIONS.ENTRANCE]: "S",
  },
  [LOCATIONS.ROOM_2]: {
    [LOCATIONS.ROOM_1]: "W",
    [LOCATIONS.EXIT]: "S",
    [LOCATIONS.HALLWAY]: "E",
  },
  [LOCATIONS.ROOM_3]: {
    [LOCATIONS.STAIRS]: "E",
  },
  [LOCATIONS.ROOM_4]: {
    [LOCATIONS.STAIRS]: "W",
  },
  [LOCATIONS.STAIRS]: {
    [LOCATIONS.ROOM_3]: "W",
    [LOCATIONS.ROOM_4]: "E",
  },
  [LOCATIONS.HALLWAY]: {
    [LOCATIONS.ROOM_2]: "W",
    [LOCATIONS.STAIRS]: "N",
  },
  [LOCATIONS.TOILET_1]: {
    [LOCATIONS.HALLWAY]: "N",
  },
  [LOCATIONS.ENTRANCE]: {
    [LOCATIONS.ROOM_1]: "N",
  },
  [LOCATIONS.EXIT]: {
    [LOCATIONS.ROOM_2]: "N",
  },
};

const roomToStairsText = "Take the exit out of [ROOM] to the Stairs";

const DirectionalGuides: Record<Direction, { text: string; angle: number }> = {
  N: {
    text: "Go straight to [START] into [END]",
    angle: -90,
  },
  S: {
    text: "Go straight to [START] into [END]",
    angle: 90,
  },
  W: {
    text: "Turn left and go through [START] into [END]",
    angle: -180,
  },
  E: {
    text: "Turn right and go through [START] into [END]",
    angle: 0,
  },
  NE: {
    text: "Move to [START] into [END]",
    angle: -45,
  },
  NW: {
    text: "Move to [START] into [END]",
    angle: -135,
  },
  SW: {
    text: "Move to [START] into [END]",
    angle: 135,
  },
  SE: {
    text: "Move to [START] into [END]",
    angle: 45,
  },
};

export type DirectionText = {
  text: string;
  angle?: number;
  icon: "arrow" | "stairs-up" | "stairs-down" | "arrived" | "right" | "left";
};

export const generateDirectionText = (path: Room[]) => {
  const pathPairs: Array<Array<Room>> = [];

  path.forEach((room, index) => {
    if (index === 0) return;

    const pair = [path[index - 1], room];
    pathPairs.push(pair);

    if (room === LOCATIONS.STAIRS) {
      if (index !== path.length - 1) {
        const nextLocation = path[index + 1];

        let target: Room = LOCATIONS.FIRST_FLOOR;

        // @ts-ignore
        if ([LOCATIONS.ROOM_3, LOCATIONS.ROOM_4].includes(nextLocation)) {
          target = LOCATIONS.SECOND_FLOOR;
        }

        pathPairs.push([LOCATIONS.STAIRS, target]);
      }
    }
  });

  const strings: Array<DirectionText> = [];

  pathPairs.forEach((pair) => {
    const [location, destination] = pair;

    const destinationIsAFloor =
      destination === LOCATIONS.FIRST_FLOOR || destination === LOCATIONS.SECOND_FLOOR;
    if (destinationIsAFloor) {
      // We're on the stairs step
      if (pair[1] === LOCATIONS.SECOND_FLOOR) {
        strings.push({
          text: "Take the stairs to the second floor",
          icon: "stairs-up",
        });
      } else {
        strings.push({
          text: "Take the stairs to the first floor",
          icon: "stairs-down",
        });
      }
    } else {
      const locationIsStairs = location === "STAIRS";
      // @ts-ignore Explain: Man I'm tired I'll fix this later (...He proceeds to never fix it) todo:
      let locationString = LOCATION_TO_STRING_MAP[location];
      if (!locationIsStairs) {
        locationString += ` exit`;
      }

      const destinationString = LOCATION_TO_STRING_MAP[destination];

      const directionToGo = DirectionedMap[location]?.[destination];

      if (!directionToGo) return;
      const guide = DirectionalGuides[directionToGo];

      if (destination === "STAIRS") {
        const guideText = roomToStairsText.replace("[ROOM]", locationString);
        strings.push({
          angle: guide.angle,
          text: guideText,
          icon: "arrow",
        });
      } else {
        const guideText = guide.text
          .replaceAll("[START]", locationString)
          .replaceAll("[END]", destinationString);

        let icon: DirectionText["icon"] = "arrow";
        if (directionToGo === "W") {
          icon = "left";
        } else if (directionToGo === "E") {
          icon = "right";
        }

        if (location.startsWith("ROOM") && destination.startsWith("ROOM")) {
          icon = "arrow";
        }

        strings.push({
          angle: guide.angle,
          text: guideText,
          icon,
        });
      }
    }
  });

  strings.push({
    text: "You have reached your destination",
    icon: "arrived",
  });

  return strings;
};
