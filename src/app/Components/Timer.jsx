import Image from "next/image";
import React from "react";

const Timer = () => {
  return (
    <div className="timer-container">
      <div className="timer-info">
        DevFest <s>Laygurzz</s> Lagos 2023 is coming on the 25th and 26th of
        November 🥰
      </div>
      <div className="timer-cta">
        <h2>Are you ready?</h2>
      </div>
      <div className="timer-sub">
        <div>
          <div className="timer-digits">00</div>
          <div className="timer-unit">Days</div>
        </div>
        <div>
          <div className="timer-digits">00</div>
          <div className="timer-unit">Hours</div>
        </div>
        <div>
          <div className="timer-digits">00</div>
          <div className="timer-unit">Minutes</div>
        </div>
        <div>
          <div className="timer-digits">00</div>
          <div className="timer-unit">Seconds</div>
        </div>
      </div>
      <div>
        <button
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          Grab Your Early Bird Ticket
          <Image src="/arrow.png" height={4} width={20} />
        </button>
      </div>
    </div>
  );
};

export default Timer;
