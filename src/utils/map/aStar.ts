import { MAP } from "@/utils/map/data";

class EventCenter {
  graph: Map<string, string[]>;
  venueName?: string;

  constructor(venueName?: string) {
    this.graph = new Map();
    this.venueName = venueName;
  }

  addLocation(location: string, neighbors: string[]) {
    this.graph.set(location, neighbors);
  }

  findShortestPath(start: string, destination: string): string[] | null {
    const openSet: string[] = [start];
    const cameFrom: Record<string, string | null> = { [start]: null };
    const gScore: Record<string, number> = { [start]: 0 };

    while (openSet.length > 0) {
      const current = this.getMinScoreNode(openSet, gScore);
      if (current === destination) {
        return this.reconstructPath(cameFrom, current);
      }

      openSet.splice(openSet.indexOf(current), 1);

      for (const neighbor of this.graph.get(current) || []) {
        const tentativeGScore = gScore[current] + 1;

        if (!gScore.hasOwnProperty(neighbor) || tentativeGScore < gScore[neighbor]) {
          cameFrom[neighbor] = current;
          gScore[neighbor] = tentativeGScore;

          if (!openSet.includes(neighbor)) {
            openSet.push(neighbor);
          }
        }
      }
    }

    return null;
  }

  private getMinScoreNode(nodes: string[], scores: Record<string, number>): string {
    return nodes.reduce((minNode, node) => (scores[node] < scores[minNode] ? node : minNode));
  }

  private reconstructPath(cameFrom: Record<string, string | null>, current: string): string[] {
    const path: string[] = [current];
    while (cameFrom[current] !== null) {
      current = cameFrom[current]!;
      path.unshift(current);
    }
    return path;
  }
}

const eventCenter = new EventCenter("Landmark Event Centre");

Object.entries(MAP).forEach(([key, value]) => {
  eventCenter.addLocation(key, value);
});

export const findPathAStar = (start: string, end: string) => {
  return eventCenter.findShortestPath(start, end);
};
