import { Schedule } from "@/types/Schedule";
import { FC } from "react";

type Props = {
  schedule: Schedule;
};

export const ScheduleCard: FC<Props> = ({ schedule }) => {
  console.log(schedule);
  return (
    <div className='scc'>
      <div className='scc__first_level'>
        <h4 className='scc__title'>{schedule.schedule}</h4>
      </div>

      <div className='scc__footer'>
        <div className='scc__footer__time'>{schedule.time}</div>
        {schedule.Room && (
          <div className='scc__footer__venue'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='8'
              height='8'
              viewBox='0 0 8 8'
              fill='none'
            >
              <circle cx='4' cy='4' r='4' fill='black' />
            </svg>
            {schedule.Room}
          </div>
        )}
      </div>
    </div>
  );
};
