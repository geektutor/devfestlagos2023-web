import React from "react";
import { talks } from "@/mock-data";
// import RSVPSignIn from "@/components/rsvp/rsvp-sign-in/rsvp-sign-in";
import RSVPTicket from "@/components/rsvp/rsvp-ticket";

const RSVP = () => {
  return (
    <div>
      <RSVPTicket talk={talks[0]} onClose={() => {}} modalIsOpen={true} />

      {/* <RSVPSignIn modalIsOpen={true} onClose={() => {}} /> */}
    </div>
  );
};

export default RSVP;
