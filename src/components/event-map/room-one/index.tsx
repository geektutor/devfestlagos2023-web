import classes from "./room-one.module.scss";
import MapNode from "@/components/event-map/poi/mapNode";

const RoomOne: React.FC = () => (
  <div className={classes.container}>
    <p>ROOM 1</p>
    <MapNode type='door' variant='bottomRight' />
    <MapNode type='destination' variant='bottomMiddle' />
  </div>
);

export default RoomOne;
