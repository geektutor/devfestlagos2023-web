import React, { useState } from "react";
import UpArrow from "@/images/up-arrow.svg";
import DownArrow from "@/images/down-arrow.svg";

interface FAQProps {
  question: string;
  answer: string;
}

export default function FAQ(props: FAQProps) {
  const [show, setShow] = useState(false);

  return (
    <div className='c-faq'>
      <div onClick={() => setShow(!show)} className='c-faq__question'>
        <h4>{props.question}</h4>
        {show ? <UpArrow /> : <DownArrow />}
      </div>
      {show ? (
        <div className='c-faq__answer'>
          <h4>{props.answer}</h4>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
