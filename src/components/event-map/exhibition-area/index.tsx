import { PathStep } from "..";
import classes from "./exhibition-area.module.scss";

const ExitIntoRoomOne = () => {
  return (
    <div className={classes.exitIntoRoomOne}>
      <div className={classes.exitPath}>
        {(() => {
          return Array(3)
            .fill(" ")
            .map((_, index) => <PathStep key={index} />);
        })()}
      </div>
    </div>
  );
};

const ExhibitionArea: React.FC = () => (
  <div className={classes.container}>
    <p>EXHIBITION AREA</p>
    <ExitIntoRoomOne />
  </div>
);

export default ExhibitionArea;
