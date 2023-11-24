export const LOCATIONS = Object.freeze({
  EXHIBITION: "EXHIBITION",
  ROOM_1: "ROOM_1",
  ROOM_2: "ROOM_2",
  STAIRS: "STAIRS",
  HALLWAY: "HALLWAY",
  TOILET_1: "TOILET_1",
  ROOM_3: "ROOM_3",
  ROOM_4: "ROOM_4",
  ENTRANCE: "ENTRANCE",
  EXIT: "EXIT",
  FIRST_FLOOR: "FIRST_FLOOR",
  SECOND_FLOOR: "SECOND_FLOOR",
});

export type Room = keyof typeof LOCATIONS;

export const mapAnimationDurations = {
  [`${LOCATIONS.EXHIBITION}_${LOCATIONS.ROOM_1}` as const]: 0.3,
};

export type MapAnimationTypes = keyof typeof mapAnimationDurations;

export const MAP: Partial<Record<Room, Array<Room>>> = {
  [LOCATIONS.EXHIBITION]: [LOCATIONS.ROOM_1],
  [LOCATIONS.ROOM_1]: [LOCATIONS.EXHIBITION, LOCATIONS.ROOM_2, LOCATIONS.ENTRANCE],
  [LOCATIONS.ROOM_2]: [LOCATIONS.ROOM_1, LOCATIONS.EXIT, LOCATIONS.HALLWAY],
  [LOCATIONS.ROOM_3]: [LOCATIONS.STAIRS],
  [LOCATIONS.ROOM_4]: [LOCATIONS.STAIRS],
  [LOCATIONS.STAIRS]: [LOCATIONS.ROOM_3, LOCATIONS.HALLWAY, LOCATIONS.ROOM_4],
  [LOCATIONS.HALLWAY]: [LOCATIONS.ROOM_2, LOCATIONS.STAIRS, LOCATIONS.TOILET_1],
  [LOCATIONS.TOILET_1]: [LOCATIONS.HALLWAY],
  [LOCATIONS.ENTRANCE]: [LOCATIONS.ROOM_1],
  [LOCATIONS.EXIT]: [LOCATIONS.ROOM_2],
};

export const LOCATION_TO_STRING_MAP = {
  [LOCATIONS.ENTRANCE]: "Entrance",
  [LOCATIONS.EXIT]: "Exit",
  [LOCATIONS.EXHIBITION]: "Exhibition Area",
  [LOCATIONS.ROOM_1]: "Room 1",
  [LOCATIONS.ROOM_2]: "Room 2",
  [LOCATIONS.ROOM_3]: "Room 3",
  [LOCATIONS.ROOM_4]: "Room 4",
  [LOCATIONS.HALLWAY]: "Hallway",
  [LOCATIONS.STAIRS]: "Stairs",
  [LOCATIONS.TOILET_1]: "Toilet",
};

export const STRING_TO_LOCATION_MAP = {
  Entrance: LOCATIONS.ENTRANCE,
  Exit: LOCATIONS.EXIT,
  "Exhibition Area": LOCATIONS.EXHIBITION,
  "Room 1": LOCATIONS.ROOM_1,
  "Room 2": LOCATIONS.ROOM_2,
  "Room 3": LOCATIONS.ROOM_3,
  "Room 4": LOCATIONS.ROOM_4,
  Hallway: LOCATIONS.HALLWAY,
  Stairs: LOCATIONS.STAIRS,
  Toilet: LOCATIONS.TOILET_1,
};
