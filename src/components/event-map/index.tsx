import classes from "./event-map.module.scss";
import ExhibitionArea from "./exhibition-area";
import Hallway from "./hallway";
import RoomFour from "./room-four";
import RoomOne from "./room-one";
import RoomThree from "./room-three";
import RoomTwo from "./room-two";
import Stairs from "./stairs";
import ToiletLeft from "./toilet-left";
import Doorway from "@/components/event-map/doorway/doorway";
import { classNames } from "@/utils/classNames";

export const PathStep = () => {
  return <div className={`${classes.pathStep}`} />;
};

const EventMap: React.FC = () => {
  return (
    <div className={classes.container}>
      <p className={classes.title}>LANDMARK EVENT CENTER LAYOUT</p>
      <div className={classNames(classes.mapGrid, "event-map")}>
        <svg
          className={classNames(classes.svg, "event-map-svg")}
          width='400'
          height='400'
          viewBox='0 0 400 400'
        >
          <g width='17' height='15' fill='none' id='feet' color='transparent'>
            <path
              d='M7.60587 5.50312C7.08718 5.96994 6.36101 6.12555 5.66078 5.96994C5.32364 5.91807 4.98649 5.76247 4.75308 5.52906C4.72715 5.50312 4.70121 5.50312 4.67528 5.47719V5.42532C4.64934 5.39939 4.62341 5.37345 4.59747 5.32158C4.57154 5.29565 4.57154 5.26971 4.54561 5.24378C4.51967 5.21784 4.51967 5.19191 4.51967 5.19191C4.18252 4.72509 4.07879 4.07673 4.44187 3.35057C5.09023 2.05385 7.13905 1.6389 8.22829 1.48329C8.66918 1.43142 9.11006 1.30175 9.52501 1.0424C11.7035 -0.280251 13.2336 -0.124644 14.1932 0.316241C14.9194 0.679323 15.464 1.30175 15.7752 2.05385C16.657 4.25827 15.8789 5.32158 14.8934 5.84027C13.9339 6.33302 12.7927 6.28116 11.8332 5.76247L11.1329 5.42532C10.5883 5.11411 9.9659 4.98443 9.31754 5.01037C8.87665 5.0363 8.33203 5.11411 7.83928 5.24378C7.78741 5.34752 7.7096 5.42532 7.60587 5.50312Z'
              fill='currentColor'
            />
            <path
              d='M3.45633 9.4955C2.93764 9.02868 2.21148 8.87307 1.51125 9.02868C1.1741 9.08055 0.836955 9.23615 0.603545 9.46956C0.577611 9.4955 0.551677 9.4955 0.525742 9.52143L0.499807 9.54737C0.473873 9.5733 0.447939 9.59924 0.422004 9.6511C0.39607 9.67704 0.39607 9.70297 0.370135 9.72891C0.344201 9.75484 0.344201 9.78078 0.344201 9.78078C0.00705397 10.2476 -0.0966835 10.896 0.266398 11.6221C0.940693 12.9448 2.98951 13.3597 4.07876 13.5153C4.51964 13.5672 4.96053 13.6969 5.37548 13.9562C7.55397 15.2789 9.0841 15.1233 10.0437 14.6824C10.7698 14.3193 11.3145 13.6969 11.6257 12.9448C12.5074 10.7404 11.7294 9.67704 10.7439 9.15835C9.78433 8.6656 8.64321 8.71747 7.68364 9.23615L7.00934 9.62517C6.46472 9.93638 5.8423 10.0661 5.19394 10.0401C4.75305 10.0142 4.20843 9.93638 3.71567 9.80671C3.63787 9.65111 3.56007 9.5733 3.45633 9.4955Z'
              fill='currentColor'
            />
          </g>
        </svg>
        <ExhibitionArea />
        <RoomOne />
        <RoomTwo />
        <Hallway />
        <Stairs />
        <ToiletLeft />
        <RoomThree />
        <RoomFour />
        <Doorway variant='exit' />
        <Doorway variant='entrance' />
      </div>
    </div>
  );
};

export default EventMap;
