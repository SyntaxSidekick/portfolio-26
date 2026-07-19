export function ContactSection() {
  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <div className="contact-panel">
          <div className="contact-intro">
            <p className="eyebrow">Let's Build Something Great</p>

            <h2>
              I&rsquo;m currently open<br />
              to new opportunities.
            </h2>

            <div className="availability-grid">
              <ul>
                <li>Full-time roles</li>
                <li>Contract work</li>
                <li>Consulting</li>
              </ul>

              <ul>
                <li>Remote or onsite</li>
                <li>Orlando, FL</li>
                <li>Open to relocation</li>
              </ul>
            </div>
          </div>

          <div className="contact-details">
            <a className="button button-primary contact-button" href="mailto:hello@riadkilani.com">
              <span>Let's Connect</span>
              <span aria-hidden="true">&rarr;</span>
            </a>

            <p>Or reach out directly</p>

            <address>
              <a href="mailto:hello@riadkilani.com">
                <span aria-hidden="true">&#9993;</span>
                hello@riadkilani.com
              </a>

              <span>
                <span aria-hidden="true">&#8982;</span>
                Orlando, FL
              </span>
            </address>

            <div className="social-links" aria-label="Social links">
              <a href="#" aria-label="LinkedIn">in</a>
              <a href="#" aria-label="GitHub">GH</a>
              <a href="#" aria-label="CodePen">CP</a>
              <a href="#" aria-label="X">X</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
