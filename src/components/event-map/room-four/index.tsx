import classes from "./room-four.module.scss";
import MapNode from "@/components/event-map/poi/mapNode";

const RoomFour: React.FC = () => (
  <div className={classes.container}>
    <p>ROOM 4</p>
    <MapNode type='door' variant='bottomLeft' />
    <MapNode type='destination' variant='middle' />
  </div>
);

export default RoomFour;
