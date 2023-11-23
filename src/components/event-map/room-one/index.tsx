import { PathStep } from "..";
import classes from "./room-one.module.scss";

const EntryFromExibitionArea = () => {
  return (
    <div className={classes.entryFromExhibitionArea}>
      <div className={classes.path}>
        {(() => {
          return Array(3)
            .fill(" ")
            .map((_, index) => <PathStep key={index} />);
        })()}
      </div>
    </div>
  );
};

const RoomOne: React.FC = () => (
  <div className={classes.container}>
    <p>ROOM 1</p>
    <p className={classes.doorText}>ENTRANCE</p>
    <EntryFromExibitionArea />
  </div>
);

export default RoomOne;
