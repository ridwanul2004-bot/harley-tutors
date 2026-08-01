import Image from "next/image";

const whatsapp = "https://wa.me/447517246948?text=Hi%20Harley%20Tutors%2C%20I%27d%20like%20to%20ask%20about%20tuition.";

const subjects = [
  {
    number: "01",
    title: "Mathematics",
    copy: "From secure foundations to top-grade exam technique, we make every step clear and purposeful.",
    tags: ["Primary", "KS3", "GCSE", "A-Level"]
  },
  {
    number: "02",
    title: "English",
    copy: "Build confident reading, precise writing and stronger analysis through structured, personalised support.",
    tags: ["Primary", "SATs", "KS3", "GCSE"]
  },
  {
    number: "03",
    title: "Science",
    copy: "Turn complex ideas into clear understanding across Biology, Chemistry and Physics.",
    tags: ["Primary", "KS3", "GCSE", "A-Level Physics"]
  }
];

const process = [
  ["Diagnose", "We identify the exact gaps, goals and barriers affecting progress."],
  ["Explain", "We model ideas clearly using examples suited to the student."],
  ["Practise", "Carefully sequenced questions build fluency and independence."],
  ["Review", "We check understanding, share feedback and plan the next step."]
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Harley Tutors home">
          <Image src="/harley-logo.png" width={86} height={86} alt="Harley Tutors feather logo" priority />
          <span>HARLEY TUTORS</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#subjects">Subjects</a>
          <a href="#approach">Our approach</a>
          <a href="#about">About</a>
          <a href="#pricing">Pricing</a>
        </nav>
        <a className="nav-cta" href={whatsapp} target="_blank" rel="noreferrer">Book a consultation</a>
      </header>

      <section className="hero" id="top">
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />
        <div className="hero-copy">
          <p className="eyebrow">PERSONALISED ONLINE TUITION · PRIMARY TO A-LEVEL</p>
          <h1>Making difficult subjects <span>make sense.</span></h1>
          <p className="hero-lead">
            One-to-one tutoring in Maths, English and Science, built around how each student learns — not a one-size-fits-all worksheet.
          </p>
          <div className="hero-actions">
            <a className="button button-gold" href={whatsapp} target="_blank" rel="noreferrer">Discuss tuition</a>
            <a className="button button-ghost" href="#subjects">Explore subjects</a>
          </div>
          <div className="trust-row" aria-label="Key information">
            <span><strong>600+</strong> tutoring hours</span>
            <span><strong>KS1–KS5</strong> support</span>
            <span><strong>1-to-1</strong> personalised lessons</span>
          </div>
        </div>

        <div className="hero-visual" aria-label="Illustration of an online maths lesson">
          <div className="lesson-window">
            <div className="window-bar"><i /><i /><i /><span>Harley Tutors · Live lesson</span></div>
            <div className="lesson-content">
              <div className="lesson-label">TODAY&apos;S FOCUS</div>
              <h2>Solving quadratics</h2>
              <div className="equation">x² + 5x + 6 = 0</div>
              <div className="working">
                <span>(x + 2)(x + 3) = 0</span>
                <span className="gold-text">x = −2 or x = −3</span>
              </div>
              <div className="lesson-progress"><span /></div>
              <div className="feedback-pill">✓ Clear method secured</div>
            </div>
          </div>
          <div className="floating-card card-one"><b>Confidence</b><span>↑ Improving</span></div>
          <div className="floating-card card-two"><b>Next step</b><span>Exam practice</span></div>
        </div>
      </section>

      <section className="credibility-band">
        <p>Clear teaching.</p><p>Stronger confidence.</p><p>Better results.</p>
      </section>

      <section className="section" id="subjects">
        <div className="section-heading">
          <div><p className="eyebrow dark">WHAT WE TEACH</p><h2>Support that meets students where they are.</h2></div>
          <p>Whether a student is catching up, building confidence or aiming for the highest grades, every lesson is adapted to their needs.</p>
        </div>
        <div className="subject-grid">
          {subjects.map((subject) => (
            <article className="subject-card" key={subject.title}>
              <span className="subject-number">{subject.number}</span>
              <h3>{subject.title}</h3>
              <p>{subject.copy}</p>
              <div className="tags">{subject.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="section split-section" id="about">
        <div className="founder-panel">
          <div className="founder-monogram">RI</div>
          <div className="quote-mark">“</div>
          <blockquote>Students should never feel embarrassed about not understanding something. Our job is to find a better way to explain it.</blockquote>
          <p>— Ridwan, Founder of Harley Tutors</p>
        </div>
        <div className="split-copy">
          <p className="eyebrow dark">BUILT FROM REAL TEACHING EXPERIENCE</p>
          <h2>More than answers. We build understanding.</h2>
          <p>
            Harley Tutors was founded by Ridwan, a Physics graduate, experienced private tutor and Teach First secondary Mathematics trainee.
          </p>
          <p>
            After hundreds of hours of tutoring, one thing became clear: students often struggle not because they lack ability, but because the explanation, pace or practice has not matched what they need.
          </p>
          <div className="credentials">
            <span>Physics graduate</span><span>600+ hours taught</span><span>Classroom-trained</span>
          </div>
        </div>
      </section>

      <section className="process-section" id="approach">
        <div className="section-heading light">
          <div><p className="eyebrow">HOW LESSONS WORK</p><h2>A clear route from confusion to confidence.</h2></div>
          <p>Each lesson follows a purposeful cycle, so students understand what they are learning, why it matters and what comes next.</p>
        </div>
        <div className="process-grid">
          {process.map(([title, copy], index) => (
            <article key={title}>
              <span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section value-section" id="pricing">
        <div>
          <p className="eyebrow dark">PERSONALISED TUITION</p>
          <h2>Focused support from <span>£25 per hour.</span></h2>
          <p>Pricing depends on the subject, level and lesson arrangement. We first discuss what the student needs and whether Harley Tutors is the right fit.</p>
          <a className="button button-dark" href={whatsapp} target="_blank" rel="noreferrer">Check availability</a>
        </div>
        <ul>
          <li><b>Personalised lesson planning</b><span>Every session targets the student&apos;s current needs.</span></li>
          <li><b>One-to-one teaching</b><span>Full attention, space to ask questions and no pressure to keep up with a class.</span></li>
          <li><b>Resources and practice</b><span>Purposeful materials selected to strengthen understanding.</span></li>
          <li><b>Parent feedback</b><span>Clear updates on progress, strengths and next steps.</span></li>
        </ul>
      </section>

      <section className="final-cta">
        <Image src="/harley-logo.png" width={128} height={128} alt="" />
        <p className="eyebrow">READY TO GET STARTED?</p>
        <h2>Let&apos;s find out what is holding your child back.</h2>
        <p>Tell us their year group, subject and current goals. We&apos;ll recommend the most suitable next step.</p>
        <a className="button button-gold" href={whatsapp} target="_blank" rel="noreferrer">Message Harley Tutors</a>
      </section>

      <footer>
        <div className="footer-brand"><Image src="/harley-logo.png" width={76} height={76} alt="Harley Tutors" /><span>HARLEY TUTORS</span></div>
        <div className="footer-links"><a href="#subjects">Subjects</a><a href="#approach">Approach</a><a href="#about">About</a><a href={whatsapp}>WhatsApp</a></div>
        <p>© 2026 Harley Tutors. All rights reserved.</p>
      </footer>
    </main>
  );
}
