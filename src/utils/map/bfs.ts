import { MAP, Room } from "./data";

export const findPathBFS = (start: Room, end: Room) => {
  const queue = [start];
  const visited: Room[] = [start];

  const previousRoom: Partial<Record<Room, Room>> = {};

  while (queue.length) {
    const currentNode = queue.pop()!;

    const neighbors = MAP[currentNode];

    neighbors.forEach((neighbor) => {
      if (!visited.includes(neighbor)) {
        visited.push(neighbor);
        queue.push(neighbor);
        previousRoom[neighbor] = currentNode;
      }
    });

    if (currentNode === end) {
      break;
    }
  }

  const path = [];
  let currentRoom = end;

  while (currentRoom !== start) {
    path.push(currentRoom);
    currentRoom = previousRoom[currentRoom]!;
  }

  path.push(start);

  return path.reverse();
};
