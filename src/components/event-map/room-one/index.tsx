import classes from "./room-one.module.scss";

const RoomOne: React.FC = () => (
  <div className={classes.container}>
    <p>ROOM 1</p>
    <p className={classes.doorText}>ENTRANCE</p>
  </div>
);

export default RoomOne;
