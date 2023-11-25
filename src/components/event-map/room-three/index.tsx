import classes from "./room-three.module.scss";
import MapNode from "@/components/event-map/poi/mapNode";
import { LOCATIONS } from "@/utils/map";

const RoomThree: React.FC = () => (
  <div className={classes.container} data-room={LOCATIONS.ROOM_3} data-two-doors>
    <p>ROOM 3</p>
    <MapNode type='destination' variant='middle' />
    <MapNode type='door' variant='room3Left' />
    <MapNode type='door' variant='room3Right' />
  </div>
);

export default RoomThree;
