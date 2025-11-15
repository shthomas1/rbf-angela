import React, { useEffect, useState } from "react";
import {
  FaPaperPlane,
  FaHandshake,
  FaUserNurse,
  FaSyringe,
  FaHeartbeat,
  FaGlassCheers,
} from "react-icons/fa";
import "./App.css";

const highlightServices = [
  {
    title: "Injectables & Skin Renewal",
    description:
      "Neurotoxins, dermal fillers, and skin boosters tailored to your facial anatomy for refreshed, never-frozen results.",
    icon: <FaSyringe />,
  },
  {
    title: "Private Botox & Filler Events",
    description:
      "Concierge parties at homes and offices with concierge-level prep, sterile technique, and group-friendly perks.",
    icon: <FaGlassCheers />,
  },
  {
    title: "Wellness Consults",
    description:
      "RN-led skin assessments, treatment mapping, and post-care coaching grounded in a decade of emergency medicine experience.",
    icon: <FaHeartbeat />,
  },
];

const serviceOptions = [
  "Botox / Dysport neurotoxin",
  "Lip, cheek, or under-eye filler",
  "Microneedling with PRP",
  "Chemical peels and glow facials",
  "Vitamin injections & B-12 boosts",
  "Private Botox party or group event",
];

const expertise = [
  {
    icon: <FaUserNurse />,
    title: "Safety-first nursing",
    copy: "Ten years in Trauma ER and critical care, so sterile technique and emergency readiness are always built in.",
  },
  {
    icon: <FaPaperPlane />,
    title: "Treatment mapping",
    copy: "Custom dosing, facial balancing, and multi-visit plans that respect budget, downtime, and comfort.",
  },
  {
    icon: <FaHandshake />,
    title: "Concierge experience",
    copy: "In-studio or on-site care with clear pre-care, pain management options, and texting for quick follow-ups.",
  },
];

function App() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    services: [],
    timeline: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!videoReady) {
        setVideoError(true);
      }
    }, 6000);

    return () => clearTimeout(timeout);
  }, [videoReady]);

  const toggleService = (service) => {
    setFormData((prev) => {
      const exists = prev.services.includes(service);
      return {
        ...prev,
        services: exists
          ? prev.services.filter((item) => item !== service)
          : [...prev.services, service],
      };
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    setFormData({
      name: "",
      company: "",
      email: "",
      phone: "",
      services: [],
      timeline: "",
      message: "",
    });
  };

  return (
    <div className="app">
      <header className="hero">
        <div className="hero-media" aria-hidden="true">
          {!videoError && (
            <div className={`hero-video ${videoReady ? "is-visible" : ""}`}>
              <iframe
                title="RBF Aesthetics experience"
                src="https://www.youtube.com/embed/YdyxZci2f9E?controls=0&rel=0&modestbranding=1&autoplay=1&mute=1&loop=1&playlist=YdyxZci2f9E&playsinline=1"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                onLoad={() => setVideoReady(true)}
                onError={() => setVideoError(true)}
              />
            </div>
          )}
          <div
            className={`hero-media-fallback ${
              videoReady && !videoError ? "is-hidden" : ""
            }`}
          >
            <div className="fallback-message">
              Nurse-led injectables, regenerative skin services, and concierge Botox
              parties designed to meet you where you are.
            </div>
          </div>
        </div>
        <div className="hero-overlay" />
        <nav className="nav">
          <div className="logo">RBF Aesthetics</div>
          <ul className="nav-links">
            <li><a href="#services">Services</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#scheduling">Scheduling</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <a className="nav-cta" href="#contact">
            Schedule a Visit
          </a>
        </nav>
        <div className="hero-content">
          <p className="hero-eyebrow">Nurse-led aesthetics + concierge care</p>
          <h1>Radiant results with safety-first clinical expertise.</h1>
          <p className="hero-copy">
            RBF delivers injectables, regenerative skin services, and private Botox
            parties guided by a Trauma ER RN. Expect sterile technique, anatomy-first
            dosing, and a calm bedside manner—whether you visit the studio or book a
            concierge event.
          </p>
          <div className="hero-actions">
            <a className="primary" href="#contact">
              Book Your Consultation
            </a>
            <a className="secondary" href="#services">
              Explore Services
            </a>
          </div>
          <div className="stats">
            <div>
              <span className="stat-number">10+</span>
              <span className="stat-label">Years as an RN</span>
            </div>
            <div>
              <span className="stat-number">500+</span>
              <span className="stat-label">Aesthetic appointments cared for</span>
            </div>
            <div>
              <span className="stat-number">24 hrs</span>
              <span className="stat-label">Average response time</span>
            </div>
          </div>
        </div>
      </header>

      <section id="services" className="highlight">
        {highlightServices.map((service) => (
          <article key={service.title} className="highlight-card">
            <div className="icon-circle">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </article>
        ))}
      </section>

      <section id="about" className="showcase">
        <div className="showcase-text">
          <p className="section-eyebrow">About RBF</p>
          <h2>Led by a Trauma ER nurse with a passion for confidence-building aesthetics.</h2>
          <p>
            RBF is run by an RN with a decade in emergency and critical care. She brings
            swift clinical judgment, a gentle touch, and a teacher’s patience to every
            appointment—whether it’s a lip refresh, a first-time neurotoxin session, or a
            Botox party for your closest friends. Safety, consent, and comfort are always
            prioritized.
          </p>
          <div className="featured-logos">
            <span>Mobile concierge visits</span>
            <span>Private parties</span>
            <span>Studio appointments</span>
            <span>Long-term plans</span>
          </div>
        </div>
        <div className="showcase-gallery">
          <div className="gallery-main" />
          <div className="gallery-stack">
            <div className="gallery-item" />
            <div className="gallery-item" />
          </div>
        </div>
      </section>

      <section id="approach" className="approach">
        <p className="section-eyebrow">How your visit flows</p>
        <h2>Clinical protocols with a concierge feel.</h2>
        <p className="approach-intro">
          Expect clear pre-care, numbing or comfort options, and post-treatment guidance
          you can text about anytime. Every plan is personalized to downtime, event dates,
          and the results you’re hoping for.
        </p>
        <div className="approach-grid">
          {expertise.map((item) => (
            <article key={item.title} className="approach-card">
              <div className="icon-circle">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="scheduling" className="cta">
        <div className="cta-content">
          <p className="section-eyebrow">Scheduling</p>
          <h2>Studio visits or mobile Botox parties—built around your calendar.</h2>
          <p>
            Weekday and select weekend availability. Mobile group events include travel
            within the metro area, custom pre-party instructions, and a post-event follow
            up to make sure everyone feels great. Solo visits can be booked for a full
            consultation or same-day treatment when appropriate.
          </p>
          <ul>
            <li>Virtual consults for new clients who want to talk through options first.</li>
            <li>Group minimums and hostess perks available for Botox and filler parties.</li>
            <li>Text-first follow-up within 24 hours for any questions or concerns.</li>
          </ul>
          <a className="primary light" href="#contact">
            Hold a Time
          </a>
        </div>
      </section>

      <section className="testimonials">
        <p className="section-eyebrow">Testimonials</p>
        <h2>People-first care that keeps clients glowing.</h2>
        <div className="testimonial-grid">
          <article>
            <p>
              “I was nervous about my first Botox appointment, but she explained
              everything and mapped my dosing. Zero bruising and I love how natural it
              looks.”
            </p>
            <span>— Anna G., first-time neurotoxin client</span>
          </article>
          <article>
            <p>
              “We hosted a small Botox party for my sister’s birthday and the experience
              was so professional—numbing, aftercare, and follow-ups for everyone.”
            </p>
            <span>— Melissa R., private event host</span>
          </article>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="contact-intro">
          <p className="section-eyebrow">Request services</p>
          <h2>Schedule your consultation or private event.</h2>
          <p>
            Share the treatments you’re interested in, when you’d like to book, and where
            you prefer to be seen. You’ll get a response within one business day with the
            next steps and prep guidance.
          </p>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <label>
              Full name
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Jane Doe"
                required
              />
            </label>
            <label>
              Appointment setting (studio, home, office)
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Example: Studio, my home, birthday party venue"
              />
            </label>
            <label>
              Email address
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
            </label>
            <label>
              Phone number
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(555) 123-4567"
              />
            </label>
          </div>

          <fieldset className="services">
            <legend>Services needed</legend>
            <div className="service-options">
              {serviceOptions.map((service) => (
                <label key={service} className="checkbox">
                  <input
                    type="checkbox"
                    checked={formData.services.includes(service)}
                    onChange={() => toggleService(service)}
                  />
                  <span>{service}</span>
                </label>
              ))}
            </div>
          </fieldset>

            <label>
              Preferred timing
              <select
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
              >
              <option value="">Select timeframe</option>
              <option value="This week">This week</option>
              <option value="Next 2 weeks">Next 2 weeks</option>
              <option value="Next month">Next month</option>
              <option value="Future event">Future event (share date below)</option>
              </select>
            </label>

          <label>
            Project details
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              placeholder="Tell us about your brand, goals, and any key dates."
            />
          </label>

          <button type="submit" className="primary">
            Submit request
          </button>
          {submitted && (
            <p className="form-success">
              Thank you! We’ll be in touch shortly to confirm details and get you
              scheduled.
            </p>
          )}
        </form>
      </section>

      <footer className="footer">
        <div>
          <h3>RBF Aesthetics</h3>
          <p>Concierge aesthetics in the metro area and beyond</p>
        </div>
        <div className="footer-links">
          <a href="mailto:hello@rbfaesthetics.com">hello@rbfaesthetics.com</a>
          <a href="tel:+19725551234">972.555.1234</a>
        </div>
        <p className="footer-copy">© {new Date().getFullYear()} RBF Aesthetics. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
