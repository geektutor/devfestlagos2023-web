import classes from "./exhibition-area.module.scss";
import MapNode from "@/components/event-map/poi/mapNode";
import { LOCATIONS } from "@/utils/map";

const ExhibitionArea: React.FC = () => (
  <div className={classes.container} data-room={LOCATIONS.EXHIBITION}>
    <p>EXHIBITION AREA</p>
    <MapNode type='door' variant='bottomRight' />
    <MapNode type='destination' variant='bottomMiddle' />
  </div>
);

export default ExhibitionArea;
