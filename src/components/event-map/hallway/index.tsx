import classes from "./hallway.module.scss";
import MapNode from "@/components/event-map/poi/mapNode";

const Hallway: React.FC = () => (
  <div className={classes.container}>
    <p className={classes.text1}>HALLWAY</p>
    <MapNode type='destination' variant='middle' />
  </div>
);

export default Hallway;
