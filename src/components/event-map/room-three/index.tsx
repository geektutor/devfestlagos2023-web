import classes from "./room-three.module.scss";
import MapNode from "@/components/event-map/poi/mapNode";

const RoomThree: React.FC = () => (
  <div className={classes.container}>
    <p>ROOM 3</p>
    <MapNode type='destination' variant='middle' />
    <MapNode type='door' variant='bottomRight' />
  </div>
);

export default RoomThree;
