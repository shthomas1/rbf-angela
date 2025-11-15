import React, { useEffect, useState } from "react";
import {
  FaCameraRetro,
  FaVideo,
  FaPenNib,
  FaPaperPlane,
  FaBullhorn,
  FaHandshake,
} from "react-icons/fa";
import "./App.css";

const highlightServices = [
  {
    title: "Photography",
    description:
      "Editorial, lifestyle, and product photography crafted to tell your brand story with clarity and emotion.",
    icon: <FaCameraRetro />,
  },
  {
    title: "Video Production",
    description:
      "Documentaries, commercials, and social campaigns filmed with cinematic precision and purposeful storytelling.",
    icon: <FaVideo />,
  },
  {
    title: "Creative Strategy",
    description:
      "Concept development, scripting, and campaign planning designed to connect with your audience everywhere they are.",
    icon: <FaPenNib />,
  },
];

const serviceOptions = [
  "Commercial Photography",
  "Brand Films",
  "Aerial & Drone Coverage",
  "Event Coverage",
  "Post-Production Editing",
  "Retainer Partnership",
];

const expertise = [
  {
    icon: <FaPaperPlane />,
    title: "Aerial Perspectives",
    copy: "FAA-certified pilots capturing sweeping visuals that elevate every narrative.",
  },
  {
    icon: <FaBullhorn />,
    title: "Campaign Support",
    copy: "Integrated launch plans that bridge the gap between content creation and distribution.",
  },
  {
    icon: <FaHandshake />,
    title: "Collaborative Process",
    copy: "From pre-production to delivery, we co-create with your team for a seamless experience.",
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
                title="Thomas Media aerial and production reel"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?controls=0&rel=0&modestbranding=1&autoplay=1&mute=1&loop=1&playlist=dQw4w9WgXcQ&playsinline=1"
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
              Immersive aerial, interview, and on-location production for brands ready to
              launch.
            </div>
          </div>
        </div>
        <div className="hero-overlay" />
        <nav className="nav">
          <div className="logo">Thomas Media</div>
          <ul className="nav-links">
            <li><a href="#services">Services</a></li>
            <li><a href="#approach">Approach</a></li>
            <li><a href="#work">Work</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <a className="nav-cta" href="#contact">
            Request a Quote
          </a>
        </nav>
        <div className="hero-content">
          <p className="hero-eyebrow">Drone and full-service media production</p>
          <h1>Visual storytelling that starts in the sky and lands in every channel.</h1>
          <p className="hero-copy">
            Thomas Media captures sweeping drone footage, polished interviews, and
            scroll-stopping photography for agencies, lifestyle brands, and events across
            the country. From discovery to final delivery, we build campaigns that move
            people to act.
          </p>
          <div className="hero-actions">
            <a className="primary" href="#contact">
              Book Your Free Consultation
            </a>
            <a className="secondary" href="#work">
              View Recent Work
            </a>
          </div>
          <div className="stats">
            <div>
              <span className="stat-number">15+</span>
              <span className="stat-label">Years capturing brands</span>
            </div>
            <div>
              <span className="stat-number">320</span>
              <span className="stat-label">Campaigns delivered</span>
            </div>
            <div>
              <span className="stat-number">9.7/10</span>
              <span className="stat-label">Client satisfaction</span>
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

      <section id="work" className="showcase">
        <div className="showcase-text">
          <p className="section-eyebrow">Our work</p>
          <h2>Clean aesthetics. Genuine moments. Thoughtful execution.</h2>
          <p>
            Every campaign is custom-built around the soul of your brand. We scout
            environments, craft lighting, and direct talent to produce images that feel
            lived-in yet refined. The result is a library of assets ready for print,
            digital, and experiential use.
          </p>
          <div className="featured-logos">
            <span>Urban Threads</span>
            <span>Harborlight Hotels</span>
            <span>Silverline Agency</span>
            <span>Northwind Events</span>
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
        <p className="section-eyebrow">How we work</p>
        <h2>Collaborative production anchored in strategy.</h2>
        <p className="approach-intro">
          We start with discovery to understand your goals, audience, and aesthetic. Our
          team guides you through pre-production, on-location direction, and post
          finishing with clear communication at every step.
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

      <section className="cta">
        <div className="cta-content">
          <p className="section-eyebrow">Tailored partnerships</p>
          <h2>From one-day shoots to year-long retainers, we scale with you.</h2>
          <p>
            Whether you need coverage for a signature event or a content engine to fuel
            your marketing calendar, Thomas Media delivers consistent, on-brand visuals
            across every channel.
          </p>
          <a className="primary light" href="#contact">
            Book a Free Consultation
          </a>
        </div>
      </section>

      <section className="testimonials">
        <p className="section-eyebrow">Testimonials</p>
        <h2>Stories from clients who trust our lens.</h2>
        <div className="testimonial-grid">
          <article>
            <p>
              “Thomas Media translated our product launch into imagery that still drives
              engagement months later. Their team anticipated every need on set.”
            </p>
            <span>— Maya Chen, Creative Director at Silverline</span>
          </article>
          <article>
            <p>
              “From location scouting to final edits, they handled our national campaign
              with polish and professionalism. We felt supported the entire time.”
            </p>
            <span>— Jordan Ellis, VP Marketing at Harborlight Hotels</span>
          </article>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="contact-intro">
          <p className="section-eyebrow">Request services</p>
          <h2>Schedule your free discovery consultation.</h2>
          <p>
            Share a few details about your project. We’ll follow up within one business
            day to confirm a free consult, align on goals, and provide a tailored
            production roadmap.
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
              Company or organization
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Your company"
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
            Desired timeline
            <select
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
            >
              <option value="">Select timeframe</option>
              <option value="2-4 weeks">2–4 weeks</option>
              <option value="1-2 months">1–2 months</option>
              <option value="3-6 months">3–6 months</option>
              <option value="ongoing">Ongoing partnership</option>
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
              Thank you! We’ll be in touch shortly to learn more about your vision.
            </p>
          )}
        </form>
      </section>

      <footer className="footer">
        <div>
          <h3>Thomas Media</h3>
          <p>Headquartered in Dallas • Producing worldwide</p>
        </div>
        <div className="footer-links">
          <a href="mailto:hello@thomasmedia.com">hello@thomasmedia.com</a>
          <a href="tel:+12145551234">214.555.1234</a>
        </div>
        <p className="footer-copy">© {new Date().getFullYear()} Thomas Media. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
