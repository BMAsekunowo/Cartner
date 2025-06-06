import React from 'react';
import '../styles/Testimonials.css';

const testimonials = [
  {
    name: "Alex Morgan",
    role: "UX Designer",
    feedback: "Cartner makes shopping fun again! Coordinating purchases with my roommates is now super easy.",
    color: "#6B5B95",
  },
  {
    name: "Liam Chen",
    role: "Freelance Developer",
    feedback: "Budgeting is easier when I can split cart items live. This is innovation at its finest.",
    color: "#FF6F61",
  },
  {
    name: "Fatima Bello",
    role: "Student",
    feedback: "My friends and I love the session feature. It's like multiplayer shopping!",
    color: "#88B04B",
  },
  {
    name: "Noah Kim",
    role: "Entrepreneur",
    feedback: "Cartner has changed the way I approach deals. Great for teams and startups.",
    color: "#009B77",
  },
  {
    name: "Emma J.",
    role: "Photographer",
    feedback: "Sleek, simple and social. I love the whole concept of shared shopping.",
    color: "#F7CAC9",
  }
];

const Testimonials = () => {
  return (
    <section className="testimonials-section">
      <h2>💬 What Our Users Say</h2>
      <div className="testimonials-container">
        {testimonials.map((t, index) => (
          <div className="testimonial-card" key={index}>
            <div className="profile-circle" style={{ backgroundColor: t.color }}>
              {t.name.charAt(0)}
            </div>
            <div className="testimonial-text">
              <p className="quote">"{t.feedback}"</p>
              <p className="user">— {t.name}, <span>{t.role}</span></p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;