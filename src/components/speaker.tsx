import Image from "next/image";
import React from "react";

interface SpeakerCardProps {
  imageSrc: string;
  fullname: string;
  role: string;
  company: string;
  variant: "web" | "mobile";
}

export default function SpeakerCard(props: SpeakerCardProps) {
  return (
    <div className={"c-speaker"}>
      <div className='speaker__image__container'>
        <Image
          className='speaker__image'
          width={300}
          height={250}
          src={props.imageSrc}
          alt={props.fullname}
          quality={100}
        />
      </div>
      <div className='text__container'>
        <h3 className='fullname'>
          <strong>{props.fullname}</strong>
        </h3>
        <p className='company'>
          {props.role}, <span>{props.company}</span>
        </p>
      </div>
    </div>
  );
}
