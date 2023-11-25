import { Room } from "@/utils/map/data";
import { findPathBFS } from "@/utils/map/bfs";
import { findPathAStar } from "@/utils/map/aStar";

export const findPath = (start: Room, end: Room) => {
  // Currently the BFS does this https://imgur.com/a/AfKs7ku on some animations so I need to use A* by default because it's weighted.
  // I'll try to figure out incorportating BFS with weights later
  if (false) {
    console.log("Used BFS");
    return findPathBFS(start, end);
  } else {
    console.log("Used A star");
    return findPathAStar(start, end);
  }
};
