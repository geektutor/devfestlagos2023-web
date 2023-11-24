import classes from "./exhibition-area.module.scss";
import MapNode from "@/components/event-map/poi/mapNode";

const ExhibitionArea: React.FC = () => (
  <div className={classes.container}>
    <p>EXHIBITION AREA</p>
    <MapNode type='door' variant='bottomRight' />
    <MapNode type='destination' variant='bottomMiddle' />
  </div>
);

export default ExhibitionArea;
