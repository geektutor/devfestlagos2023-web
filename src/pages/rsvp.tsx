import React from "react";
// import { talks } from '@/mock-data'
import RSVPSignIn from "@/components/rsvp/rsvp-sign-in/rsvp-sign-in";
// import RSVPTicket from '@/components/rsvp/rsvp-ticket'

const RSVP = () => {
  return (
    <div>
      {/* {talks.map((talk, index) => (
        <RSVPTicket talk={talk} key={index}/>
      ))} */}

      <RSVPSignIn />
    </div>
  );
};

export default RSVP;
