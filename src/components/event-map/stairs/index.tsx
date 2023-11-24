import classes from "./stairs.module.scss";
import MapNode from "@/components/event-map/poi/mapNode";

const Stairs: React.FC = () => (
  <div className={classes.container}>
    STAIRS
    <MapNode type='destination' variant='middle' />
    <MapNode type='door' variant='bottomMiddle' />
  </div>
);

export default Stairs;
