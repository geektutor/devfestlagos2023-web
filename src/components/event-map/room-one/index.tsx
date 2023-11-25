import classes from "./room-one.module.scss";
import MapNode from "@/components/event-map/poi/mapNode";
import { LOCATIONS } from "@/utils/map";

const RoomOne: React.FC = () => (
  <div className={classes.container} data-room={LOCATIONS.ROOM_1}>
    <p>ROOM 1</p>
    <MapNode type='door' variant='bottomRight' />
    <MapNode type='destination' variant='bottomMiddle' />
  </div>
);

export default RoomOne;
