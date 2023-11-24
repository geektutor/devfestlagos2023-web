import classes from "./room-three.module.scss";
import MapNode from "@/components/event-map/poi/mapNode";
import { LOCATIONS } from "@/utils/map";

const RoomThree: React.FC = () => (
  <div className={classes.container} data-room={LOCATIONS.ROOM_3}>
    <p>ROOM 3</p>
    <MapNode type='destination' variant='middle' />
    <MapNode type='door' variant='bottomRight' />
  </div>
);

export default RoomThree;
