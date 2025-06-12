import React, { useRef } from "react";
import "../../styles/Testimonials.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const testimonials = [
  {
    name: "Hannah T.",
    title: "Frequent Shopper",
    quote: "Makes group shopping a breeze. Easy to use and efficient!",
    avatar: "/avatars/hannah.png",
  },
  {
    name: "Jason W.",
    title: "Budget Conscious Buyer",
    quote:
      "The smart budgeting feature has helped us stay on track with our expenses.",
    avatar: "/avatars/jason.png",
  },
  {
    name: "Emily R.",
    title: "On-the-Go Mom",
    quote:
      "Love the synced lists. I can add items on the go and everyone stays updated in real time.",
    avatar: "/avatars/emily.png",
  },
  {
    name: "Aisha M.",
    title: "Family Organizer",
    quote:
      "I feel closer to my family and friends all because of Cartner. It’s brought us together in such a simple way.",
    avatar: "/avatars/aisha.png",
  },
  {
    name: "Daniel K.",
    title: "Minimalist Shopper",
    quote:
      "Cartner removes the chaos from group buying. Just one shared list and we’re all sorted.",
    avatar: "/avatars/daniel.png",
  },
  {
    name: "Sophia B.",
    title: "College Roommate",
    quote:
      "We use Cartner to plan our shared groceries and cleaning supplies — zero drama, all teamwork!",
    avatar: "/avatars/sophia.png",
  },
  {
    name: "Marcus J.",
    title: "Tech Dad",
    quote:
      "Even my teenage kids love Cartner. It makes joint shopping something we actually enjoy.",
    avatar: "/avatars/marcus.png",
  },
  {
    name: "Lily S.",
    title: "Event Planner",
    quote:
      "Cartner makes managing party supply lists with clients super efficient. Game changer for my work!",
    avatar: "/avatars/lily.png",
  },
  {
    name: "Tyler N.",
    title: "Weekend Shopper",
    quote:
      "Finally an app that doesn’t overcomplicate shopping with friends. Cartner just works.",
    avatar: "/avatars/tyler.png",
  },
];

function Testimonials() {
  const scrollRef = useRef();

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === "left" ? -320 : 320,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="testimonial-section">
      <h2 className="testimonial-heading">What Our Users Are Saying</h2>

      <div className="testimonial-scroll-wrapper">
        <button
          className="testimonial-scroll-btn left"
          onClick={() => scroll("left")}
        >
          <FaChevronLeft />
        </button>

        <div className="testimonial-scroll" ref={scrollRef}>
          {testimonials.map((t, i) => (
            <div className="testimonial-card" key={i}>
              <img src={t.avatar} alt={t.name} className="testimonial-avatar" />
              <p className="testimonial-quote">
                <span> “</span>
                {t.quote}”
              </p>
              <p className="testimonial-name">{t.name}</p>
              <p className="testimonial-title">{t.title}</p>
            </div>
          ))}
        </div>

        <button
          className="testimonial-scroll-btn right"
          onClick={() => scroll("right")}
        >
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
}

export default Testimonials;
