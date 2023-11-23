import classes from "./room-two.module.scss";

const RoomTwo: React.FC = () => (
  <div className={classes.container}>
    <p>ROOM 2</p>
    <p className={classes.doorText}>EXIT</p>
  </div>
);

export default RoomTwo;
