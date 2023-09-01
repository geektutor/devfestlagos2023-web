import Image from "next/image";
import React from "react";

interface SpeakerCardProps {
  imageSrc: string;
  fullname: string;
  role: string;
  company: string;
  backgroundColor?: string;
}

export default function SpeakerCard(props: SpeakerCardProps) {
  return (
    <div className='c-speaker'>
      <div className='c-speaker__image'>
        <Image className='c-speaker__image__inner' src={props.imageSrc} alt={props.fullname} fill />
      </div>
      <div
        className='c-speaker__text__container'
        style={{
          backgroundColor: props.backgroundColor,
        }}
      >
        <h3 className='c-speaker__fullname'>
          <strong>{props.fullname}</strong>
        </h3>
        <h4 className='c-speaker__company'>
          {props.role}, <span>{props.company}</span>
        </h4>
      </div>
    </div>
  );
}
