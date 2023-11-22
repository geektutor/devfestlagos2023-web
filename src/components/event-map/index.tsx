import classes from "./event-map.module.scss";
import ExhibitionArea from "./exhibition-area";
import RoomOne from "./room-one";

const EventMap: React.FC = () => (
  <div className={classes.container}>
    <p className={classes.title}>LANDMARK EVENT CENTER LAYOUT</p>
    <div className={classes.blocks}>
      <ExhibitionArea />
      <RoomOne />
    </div>
  </div>
);

export default EventMap;
