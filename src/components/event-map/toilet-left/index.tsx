import classes from "./toilet-left.module.scss";
import MapNode from "@/components/event-map/poi/mapNode";

const ToiletLeft: React.FC = () => (
  <div className={classes.container}>
    <p className={classes.text}>TOILET</p>
    <MapNode type='destination' variant='middle' />
    <MapNode type='door' variant='topMiddle' />
  </div>
);

export default ToiletLeft;
