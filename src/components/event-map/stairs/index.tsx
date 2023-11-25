import classes from "./stairs.module.scss";
import MapNode from "@/components/event-map/poi/mapNode";
import { LOCATIONS } from "@/utils/map";

const Stairs: React.FC = () => (
  <div className={classes.container} data-room={LOCATIONS.STAIRS}>
    STAIRS
    <MapNode type='destination' variant='middle' />
  </div>
);

export default Stairs;
