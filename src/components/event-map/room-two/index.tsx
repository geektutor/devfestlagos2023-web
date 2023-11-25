import classes from "./room-two.module.scss";
import MapNode from "@/components/event-map/poi/mapNode";
import { LOCATIONS } from "@/utils/map";

const RoomTwo: React.FC = () => (
  <div className={classes.container} data-room={LOCATIONS.ROOM_2}>
    <p>ROOM 2</p>
    <MapNode type='door' variant='room2' />
    <MapNode type='destination' variant='bottomMiddle' />
  </div>
);

export default RoomTwo;
