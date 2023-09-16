import React from "react";
import CloseCircle from "@/images/close-circle.svg";
import { SecondaryButton, TertiaryButton } from "@/components/button";

const RSVPSignIn = () => {
  return (
    <div>
      <button className='' onClick={() => {}}>
        <CloseCircle />
      </button>
      <div>{/* Emoticon goes here */}</div>
      <div>{/* Arrow Doodle  */}</div>
      <h2>We need your email to save you a spot</h2>
      <p>Confirm your registration to RSVP and book a seat in your favourite sessions.</p>
      <form>
        <div>
          <label htmlFor='email'>Enter Email</label>
          <input type='email' id='email' />
        </div>
        <div>
          <label htmlFor='ticket'>Enter Ticket Number</label>
          <input type='number' id='ticket' />
          <div>The Ticket No. is sent to your email when you register</div>
        </div>
        <TertiaryButton onClick={() => {}}>Proceed</TertiaryButton>
        <SecondaryButton onClick={() => {}}>Don’t have a ticket? 👉🏽 Register</SecondaryButton>
      </form>
    </div>
  );
};

export default RSVPSignIn;
