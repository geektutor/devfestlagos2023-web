import React, { useEffect } from "react";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns";
import { TertiaryButton } from "@/components/button";
import { ticketsUrl } from "@/utils/urls";

const devFestDate = new Date("2023-11-24");

export const ComingSoonCountdown = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setCurrentTime] = React.useState<number | null>(null);

  useEffect(() => {
    setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
  }, []);

  if (!_) return null;

  return (
    <section className='c-countdown'>
      <div className='c-countdown__dates'>
        DevFest <span className='strikethrough'>Laygurzz</span> Lagos 2023 is coming on the 24th and
        25th of November 🥰
      </div>
      <p className='c-countdown__title'>Are you ready?</p>
      <div className='c-countdown__clock'>
        <div className='c-countdown__clock__slot first-child'>
          <div className='c-countdown__clock__slot__value'>
            {differenceInDays(devFestDate, Date.now())}
          </div>
          <span className='c-countdown__clock__slot__label'>Days</span>
        </div>
        <div className='c-countdown__clock__slot'>
          <div className='c-countdown__clock__slot__value'>
            {differenceInHours(devFestDate, Date.now()) % 24}
          </div>
          <span className='c-countdown__clock__slot__label'>Hours</span>
        </div>
        <div className='c-countdown__clock__slot'>
          <div className='c-countdown__clock__slot__value'>
            {differenceInMinutes(devFestDate, Date.now()) % 60}
          </div>
          <span className='c-countdown__clock__slot__label'>Minutes</span>
        </div>
        <div className='c-countdown__clock__slot last-child'>
          <div className='c-countdown__clock__slot__value'>
            {differenceInSeconds(devFestDate, Date.now()) % 60}
          </div>
          <span className='c-countdown__clock__slot__label'>Seconds</span>
        </div>
      </div>
      <TertiaryButton onClick={() => window.open(ticketsUrl, "_blank")}>
        Grab Your Early Bird Tickets
      </TertiaryButton>
    </section>
  );
};
