import classes from "./hallway.module.scss";
import MapNode from "@/components/event-map/poi/mapNode";
import { LOCATIONS } from "@/utils/map";

const Hallway: React.FC = () => (
  <div className={classes.container} data-room={LOCATIONS.HALLWAY}>
    <p className={classes.text1}>HALLWAY</p>
    <MapNode type='destination' variant='middle' />
    <MapNode type='door' variant='hallway' />
  </div>
);

export default Hallway;
