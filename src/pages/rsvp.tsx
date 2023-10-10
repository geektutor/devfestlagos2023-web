import React from "react";
import RSVPSignIn from "@/components/rsvp/rsvp-sign-in/rsvp-sign-in";

const RSVP = () => {
  return (
    <div>
      <RSVPSignIn modalIsOpen={true} onClose={() => {}} />
    </div>
  );
};

export default RSVP;
