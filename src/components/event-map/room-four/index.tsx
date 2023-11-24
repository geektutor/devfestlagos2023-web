import classes from "./room-four.module.scss";
import MapNode from "@/components/event-map/poi/mapNode";
import { LOCATIONS } from "@/utils/map";

const RoomFour: React.FC = () => (
  <div className={classes.container} data-room={LOCATIONS.ROOM_4}>
    <p>ROOM 4</p>
    <MapNode type='door' variant='bottomLeft' />
    <MapNode type='destination' variant='middle' />
  </div>
);

export default RoomFour;
