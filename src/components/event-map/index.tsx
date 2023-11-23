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
    <div className={classes.blocks}>
      <div className={classes.emptyCell}></div>
      <div className={classes.roomThreeAndFourWrapper}>
        <RoomThree />
        <RoomFour />
      </div>
      <div>
        <ExhibitionArea />
      </div>
      <div>
        <RoomOne />
      </div>
      <div>
        <RoomTwo />
      </div>
      <div className={classes.toiletsStarsAndHalls}>
        <div className={classes.toilets}>
          <ToiletLeft />
          <ToiletRight />
        </div>

        <div className={classes.hallwayWrapper}>
          <Hallway />
        </div>

        <div className={classes.stairsAndSpeakers}>
          <div className={classes.stairs}>
            <Stairs />
          </div>
          <div className={classes.speakers}>
            <SpeakersRoom />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default EventMap;
