import Link from "next/link";
import { FAQ } from "@/components/faq/FAQ";

export const faqs: FAQ[] = [
  {
    question: "1. So, what is DevFest Lagos 2023?",
    answer:
      "DevFest Lagos 2023 is a two-day developer festival that will bring together technology enthusiasts, developers, designers, beginners, veterans and experts alike. It will also gather  tech ecosystem drivers and thought leaders. It features keynotes, workshops, speaker-led sessions, and codelabs on various technology topics. The event offers a platform to learn, connect, network, and explore the latest developments in the tech industry.",
  },
  {
    question: "2. When and where is DevFest Lagos 2023 taking place?",
    answer:
      "DevFest Lagos 2023 will be held on November 24th and 25th, 2023, starting at 9:00 AM each day. The venue is Landmark, Oniru, Lagos.",
  },
  {
    question: "3. How can I register for DevFest Lagos 2023?",
    answer: (
      <>
        To attend DevFest Lagos 2023, you must register through the official event registration
        platform at <Link href='/'>DevFestLagos.com</Link>. You can choose between a two-day ticket
        or a single-day ticket.
      </>
    ),
  },
  {
    question: "4. Is DevFest Lagos 2023 the first edition of this event?",
    answer:
      "No, DevFest Lagos 2023 is the sixth edition of DevFest Lagos. It has a rich history of bringing together the tech community in Lagos for valuable experiences and learning opportunities.",
  },
  {
    question: "5. Who is organizing DevFest Lagos 2023?",
    answer:
      "DevFest Lagos 2023 is organized by GDG Lagos (Google Developer Group Lagos) with the support of incredible partners and a dedicated team of volunteers.",
  },
  {
    question: "6. What topics will be covered during the event?",
    answer:
      "DevFest Lagos 2023 will cover a wide range of topics, including Web development, Cloud computing, Android development, Flutter, Design, Machine Learning/AI, Cybersecurity, Technical Writing, and more. These sessions will be happening across multiple tracks, concurrently across the different breakout rooms in the venue. While it is a Google-supported event, organized by the Google Developers Group Lagos (GDG Lagos) it will encompass many other tech-related subjects.",
  },
  {
    question: "7. Is DevFest Lagos 2023 only for Google-related technologies?",
    answer:
      "No, DevFest Lagos 2023 is not limited to Google technologies. While Google is a supporter of the event, it will cover a diverse array of technology topics, including those beyond the Google ecosystem.",
  },
  {
    question: "8. Who are the sponsors and partners of DevFest Lagos 2023?",
    answer:
      "DevFest Lagos 2023 is supported by multiple startups and partners from the technology industry. Their contributions help make this event possible and enhance the overall experience. To find out how to be a part of this DevFest as a Partner or Sponsor, please send an email to team@gdglagos.com and we’d be happy to engage and discuss the options.",
  },
  {
    question: "9. What can I expect from DevFest Lagos 2023?",
    answer:
      "DevFest Lagos 2023 promises an exciting and enriching experience. You can expect to learn from industry experts, connect with like-minded professionals, network with potential collaborators, and gain insights into the latest trends and innovations in technology.",
  },
  {
    question: "10. Is there a code of conduct for attendees?",
    answer: (
      <>
        Yes, there is a community conduct guideline that all attendees are expected to follow. We
        are committed to creating a safe and inclusive environment for all participants. Please
        review and adhere to our{" "}
        <a target='_blank' href='https://developers.google.com/community-guidelines'>
          conduct guidelines
        </a>{" "}
        to ensure a respectful and enjoyable experience for everyone.
      </>
    ),
  },
  {
    question: "11. How can I get updates and announcements about DevFest Lagos 2023?",
    answer:
      "Stay tuned for updates and announcements by following our official social media channels and checking the event website. You can also subscribe to our newsletter to receive the latest information about speakers, sessions, and event details.",
  },
  {
    question: "12. How can I contact the organizers if I have additional questions?",
    answer:
      "For any further inquiries or assistance, you can reach out to the event organizers via email at contact@devfestlagos.com. We are here to help and ensure your DevFest Lagos 2023 experience is memorable and informative.",
  },
  {
    question: "13. Will there be a livestream of the event for remote attendees?",
    answer:
      "No, there won't be a livestream of DevFest Lagos 2023. The event is designed for in-person attendance only.",
  },
  {
    question: "14. Can I transfer my ticket to someone else if I am unable to attend?",
    answer:
      "No, tickets for DevFest Lagos 2023 are not transferrable. Each ticket is tied to a specific attendee and cannot be transferred to another person.",
  },
  {
    question: "15. Are there limited seats available for the event?",
    answer:
      "Yes, there are limited seats available for DevFest Lagos 2023. We recommend securing your ticket as soon as possible to guarantee your spot at the event.",
  },
  {
    question: "16. When do the Early Bird ticket sales end?",
    answer:
      "Early Bird ticket sales for DevFest Lagos 2023 will end on October 21, 2023. Be sure to take advantage of this special pricing before the deadline.Yes, there are limited seats available for DevFest Lagos 2023. We recommend securing your ticket as soon as possible to guarantee your spot at the event.",
  },
  {
    question: "17. Can I still submit a proposal for a session or workshop (Call for Papers)?",
    answer:
      "We regret to inform you that we are no longer accepting Call for Papers (CFP) submissions. The schedule for sessions and workshops is being finalized.",
  },
  {
    question: "18. Will the sessions be recorded, and will they be available for viewing later?",
    answer:
      "Yes, all sessions at DevFest Lagos 2023 will be recorded, edited, and eventually published. This means you will have the opportunity to access the content even after the event has concluded. This is especially helpful for attendees who may miss some sessions during the event. Stay tuned for information on how to access the recorded sessions.",
  },
  {
    question: "19. Can I volunteer to help make DevFest Lagos 2023 a success?",
    answer:
      "Yes, we welcome volunteers who are passionate about contributing to the success of DevFest Lagos 2023. To join our volunteer team, please follow us on our social media channels for updates and information on how to get involved.",
  },
];

export const paidDevFestQuestions = [
  {
    title: "Q1. Why do I have to pay for DevFest Lagos 2023 when previous editions were free?",
    children: (
      <p>
        DevFest Lagos 2023 is the first pay-to-attend DevFest in our history, and there are several
        compelling reasons behind this change. We believe that paying for a DevFest ticket offers
        you distinct advantages and value compared to a free event.
      </p>
    ),
  },
  {
    title: "Q2. What benefits do I get from purchasing a ticket?",
    children: (
      <>
        <p>
          Charging a nominal fee for DevFest Lagos 2023 aligns with our commitment to sustainability
          and community support. This decision was made to enhance your experience in the following
          ways:
        </p>
        <br />
        <p>
          Reduced No-Shows: A paid ticket helps reduce the number of no-shows, ensuring a more
          engaged and focused audience during the two-day event.
        </p>
        <br />
        <p>
          Premium Content: Devfest Lagos 2023 will offer exclusive access to high-quality, in-depth
          content, workshops, and sessions led by tech industry experts and innovation leaders.
          You&apos;ll gain valuable insights and knowledge that can significantly impact your
          career.
        </p>
        <br />
        <p>
          Networking Opportunities: Attendees will have the chance to connect with fellow
          professionals, speakers, and sponsors in a more intimate and focused setting, opening
          doors to new opportunities and collaborations.
        </p>
        <br />
        <p>
          Interactive Workshops: Most sessions will include hands-on workshops and interactive
          experiences, allowing you to apply what you&apos;ve learned in real-time, enhancing your
          skills and understanding.
        </p>
        <br />
        <p>
          Exclusive Resources: You&apos;ll receive access to event materials, presentation slides,
          and additional resources that are not freely available, serving as valuable references
          long after the event ends.
        </p>
        <br />
        <p>
          Enhanced Experience: We prioritize your experience, providing comfortable seating,
          refreshments, and other amenities that contribute to an enjoyable and productive event.
        </p>
        <br />
        <p>
          Supporting/Scaling the Event: Charging a fee also opens up opportunities to scale the
          event, potentially reaching a wider audience while delivering even more value to
          attendees. Your ticket purchase helps support the event&apos;s organization, ensuring the
          continued provision of valuable content, attracting top-notch speakers, and improving the
          overall event experience.
        </p>
        <br />
        <p>
          By investing in the event&apos;s infrastructure and content, we aim to provide you with a
          more enriching and fulfilling experience at DevFest Lagos 2023.
        </p>
        <br />
      </>
    ),
  },
];
