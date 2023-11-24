import classes from "./event-map.module.scss";
import ExhibitionArea from "./exhibition-area";
import Hallway from "./hallway";
import RoomFour from "./room-four";
import RoomOne from "./room-one";
import RoomThree from "./room-three";
import RoomTwo from "./room-two";
import SpeakersRoom from "./speakers-room";
import Stairs from "./stairs";
import ToiletLeft from "./toilet-left";
import ToiletRight from "./toilet-right";

export const PathStep = () => {
  return <div className={`${classes.pathStep}`} />;
};

const EventMap: React.FC = () => (
  <div className={classes.container}>
    <p className={classes.title}>LANDMARK EVENT CENTER LAYOUT</p>
    <div className={classes.mapGrid}>
      <ExhibitionArea />
      <RoomOne />
      <RoomTwo />
      <Hallway />
      <Stairs />
      <ToiletLeft />
      <RoomThree />
      <RoomFour />
    </div>
  </div>
);

export default EventMap;
