import React from "react";
import Image from "next/image";
import { TertiaryButton } from "./button";

type Props = {
  fullName: string;
  role: string;
  company: string;
  topic: string;
  date: string | Date;
  seatCount: number;
  category: string;
  imageSrc: string;
};

const RSVPTicket = (props: Props) => {
  return (
    <div>
      <div>
        <Image
          className=''
          width={300}
          height={250}
          src={props.imageSrc}
          alt={props.fullName}
          quality={100}
        />
        <p>Tap to See Session</p>
        <h3 className=''>
          <strong>{props.fullName}</strong>
        </h3>
        <h4 className=''>
          {props.role}, <span>{props.company}</span>
        </h4>
      </div>
      <div>
        <div>
          <span>{props.category}</span>
          <span>
            Seats: <span>{props.seatCount}</span>
          </span>
        </div>
        <p></p>
        {/* The date pill goes here */}
        <TertiaryButton>Book a Seat</TertiaryButton>
      </div>
    </div>
  );
};

export default RSVPTicket;
