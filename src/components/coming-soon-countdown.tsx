import React, { useEffect } from "react";
import ClockDots from "@/images/home/clock-dots.svg";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns";
import { TertiaryButton } from "@/components/button";

const devFestDate = new Date("2023-11-25");

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
        DevFest <span className='strikethrough'>Laygurzz</span> Lagos 2023 is coming on the 25th and
        26th of November 🥰
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
        <div className='c-countdown__clock__dots'>
          <ClockDots />
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
      <TertiaryButton>Save my slot</TertiaryButton>
    </section>
  );
};
