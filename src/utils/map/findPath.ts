import { Room } from "@/utils/map/data";
import { findPathBFS } from "@/utils/map/bfs";
import { findPathAStar } from "@/utils/map/aStar";

export const findPath = (start: Room, end: Room) => {
  const flipCoin = false;

  if (flipCoin) {
    console.log("Used BFS");
    return findPathBFS(start, end);
  } else {
    console.log("Used A star");
    return findPathAStar(start, end);
  }
};
