import Image from "next/image";
import AnchorAvatar from "../images/anchor-avatar.png";

export interface IScheduleCard {
  title: string;
  image: string;
}

export const ScheduleCard = () => {
  return (
    <div className='scc'>
      <div className='scc__first_level'>
        <div className='scc__img_holder'>
          <div className='scc__img_holder__anchor'>Anchor</div>
          <Image src={AnchorAvatar} alt='Anchor Avatar' className='scc__img_holder__avatar' />
        </div>

        <h4 className='scc__title'>🍽️ WTM + WW Breakfast / Registration</h4>
      </div>

      <div className='scc__footer'>
        <div className='scc__footer__time'>9:00 AM - 10:00 AM</div>
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
          Venue Entrance
        </div>
        <div className='scc__footer__view'>
          View Description
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
          >
            <path
              d='M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.06 11.27L12.53 14.8C12.38 14.95 12.19 15.02 12 15.02C11.81 15.02 11.62 14.95 11.47 14.8L7.94 11.27C7.80052 11.1289 7.7223 10.9384 7.7223 10.74C7.7223 10.5416 7.80052 10.3511 7.94 10.21C8.23 9.92 8.71 9.92 9 10.21L12 13.21L15 10.21C15.29 9.92 15.77 9.92 16.06 10.21C16.35 10.5 16.35 10.97 16.06 11.27Z'
              fill='#4285F4'
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
