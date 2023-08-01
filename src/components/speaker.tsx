import Image from "next/image";
import React from "react";

interface SpeakerCardProps {
  imageSrc: string;
  fullname: string;
  role: string;
  company: string;
}

export default function SpeakerCard(props: SpeakerCardProps) {
  return (
    <div className={"c-speaker"}>
      <div className='speaker_image_container'>
        <Image
          className='speaker_image'
          width={300}
          height={250}
          src={props.imageSrc}
          alt={props.fullname}
          quality={100}
        />
      </div>
      <div className='text_container'>
        <h3>{props.fullname}</h3>
        <p className='body-5'>
          {props.role}, <span>{props.company}</span>
        </p>
      </div>
    </div>
  );
}
