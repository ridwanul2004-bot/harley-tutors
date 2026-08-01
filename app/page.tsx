"use client";

import Image from "next/image";
import { CountUp, DrawnParabola, FloatingSymbols, PosterFlip, Reveal } from "./components/motion";

const whatsapp = "https://wa.me/447517246948?text=Hi%20Harley%20Tutors%2C%20I%27d%20like%20to%20ask%20about%20tuition.";
const instagram = "https://instagram.com/harleytutors";
const email = "mailto:harleytutors@hotmail.com";

const subjects = [
  {
    number: "01",
    title: "Mathematics",
    copy: "From secure number foundations to Further Maths, we build the fluency exam technique is built on top of — not the other way round.",
    tags: ["Primary", "KS3", "GCSE", "A-Level", "Further Maths"]
  },
  {
    number: "02",
    title: "English",
    copy: "Confident reading, precise writing and sharper analysis, built through discussion rather than worksheets alone.",
    tags: ["Primary", "KS3", "GCSE"]
  },
  {
    number: "03",
    title: "Science",
    copy: "Biology, Chemistry and Physics taught as connected ideas, not three separate lists of facts to memorise.",
    tags: ["Biology", "Chemistry", "Physics", "GCSE", "A-Level"]
  },
  {
    number: "04",
    title: "Entrance Exams",
    copy: "Grammar and independent school entry is its own skill. We prepare students for the exam in front of them, not a generic pack.",
    tags: ["SATs", "11+", "13+"]
  }
];

const process = [
  ["Diagnose", "We identify the exact gaps, goals and barriers affecting progress."],
  ["Explain", "We model ideas clearly using examples suited to the student."],
  ["Practise", "Carefully sequenced questions build fluency and independence."],
  ["Review", "We check understanding, share feedback and plan the next step."]
];

const testimonials = [
  {
    quote:
      "Harley Tutors turned my daughter's least favourite subject into the one she now asks to do first. Her maths grade moved up two full levels in two terms.",
    attribution: "Parent of a GCSE student"
  },
  {
    quote:
      "We had under three months before the 11+. Harley Tutors built a plan around exactly what he was weak on, instead of handing us a generic pack of past papers.",
    attribution: "Parent of a Year 6 student"
  },
  {
    quote:
      "I finally understood the topic after years of just memorising it. Lessons felt like working through a problem together, not being talked at.",
    attribution: "A-Level Science student"
  }
];

const futureContent = [
  { label: "YouTube lessons", detail: "Short, focused walkthroughs of the topics students ask about most." },
  { label: "TikTok explainers", detail: "60-second fixes for the misconceptions that trip up whole classes." },
  { label: "Revision guides", detail: "Condensed, exam-board-aligned notes you can actually revise from." },
  { label: "GCSE walkthroughs", detail: "Full past-paper questions solved and explained, step by step." }
];

const resources = [
  { label: "GCSE Formula Sheets", detail: "Every equation you're expected to know, in one place." },
  { label: "Revision Notes", detail: "Topic-by-topic notes written for how exams actually ask questions." },
  { label: "Practice Questions", detail: "Graded questions to build from confident to exam-ready." },
  { label: "Exam Tips", detail: "The technique marks students lose for reasons that have nothing to do with knowledge." }
];

export default function Home() {
  return (
    <main>
      <div className="feather-watermark feather-watermark-hero" aria-hidden="true">
        <Image src="/harley-logo.png" fill alt="" />
      </div>

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
        <FloatingSymbols />
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />
        <div className="hero-copy">
          <p className="eyebrow">PERSONALISED ONLINE TUITION · PRIMARY TO A-LEVEL</p>
          <h1>Making difficult subjects <span>make sense.</span></h1>
          <p className="hero-lead">
            Harley Tutors exists because most students aren&apos;t behind on ability — they&apos;re behind on
            an explanation that actually fit how they think. We build lessons around the student, not a worksheet.
          </p>
          <div className="hero-actions">
            <a className="button button-gold" href={whatsapp} target="_blank" rel="noreferrer">Discuss tuition</a>
            <a className="button button-ghost" href="#subjects">Explore subjects</a>
          </div>
          <div className="trust-row" aria-label="Key information">
            <span><strong><CountUp value={600} suffix="+" /></strong> tutoring hours</span>
            <span><strong>KS1&ndash;KS5</strong> support</span>
            <span><strong><CountUp value={5} /></strong> exam stages covered</span>
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
              <DrawnParabola />
              <div className="lesson-progress"><span /></div>
              <div className="feedback-pill">✓ Clear method secured</div>
            </div>
          </div>
          <div className="floating-card card-one"><b>Confidence</b><span>↑ Improving</span></div>
          <div className="floating-card card-two"><b>Next step</b><span>Exam practice</span></div>
        </div>
      </section>

      <section className="credibility-band">
        <p>Built by people who&apos;ve sat where you&apos;re sitting.</p>
        <p>Every lesson planned, never improvised.</p>
        <p>Progress you can actually see.</p>
      </section>

      <section className="section" id="subjects">
        <Reveal>
          <div className="section-heading">
            <div><p className="eyebrow dark">WHAT WE TEACH</p><h2>Support that meets students where they are.</h2></div>
            <p>Whether a student is catching up, building confidence or aiming for the highest grades, every lesson is adapted to their needs.</p>
          </div>
        </Reveal>
        <div className="subject-grid">
          {subjects.map((subject, i) => (
            <Reveal delay={i * 90} key={subject.title}>
              <article className="subject-card">
                <span className="subject-number">{subject.number}</span>
                <h3>{subject.title}</h3>
                <p>{subject.copy}</p>
                <div className="tags">{subject.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section split-section" id="about">
        <Reveal>
          <div className="founder-panel">
            <div className="founder-monogram">RH</div>
            <div className="founder-monogram founder-monogram-two">SH</div>
            <div className="quote-mark">&ldquo;</div>
            <blockquote>
              Students should never feel embarrassed about not understanding something. Our job is to find a
              better way to explain it — every time, until it lands.
            </blockquote>
            <p>— Ridwan &amp; Shafi, Co-founders of Harley Tutors</p>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="split-copy">
            <p className="eyebrow dark">TWO FOUNDERS, ONE PHILOSOPHY</p>
            <h2>More than answers. We build understanding.</h2>
            <p>
              Harley Tutors was founded by two students who spent years tutoring before it was a business —
              first out of necessity, then because they couldn&apos;t stop noticing the same thing: students
              rarely struggle because they lack ability. They struggle because an explanation, a pace, or a
              type of practice never quite matched how they think.
            </p>
            <div className="founder-bios">
              <div className="founder-bio">
                <h4>Ridwan</h4>
                <p>
                  A Physics graduate and Teach First Mathematics trainee, Ridwan has spent hundreds of hours
                  in classrooms and one-to-one lessons. He built Harley Tutors around a simple rule: no
                  student should leave a lesson more confused about how they&apos;re doing than when they
                  arrived.
                </p>
              </div>
              <div className="founder-bio">
                <h4>Shafi</h4>
                <p>
                  Currently training in medicine, Shafi brings a diagnostic instinct to how Harley Tutors
                  teaches — find the actual root of a misunderstanding before treating the symptom of a
                  wrong answer. He shapes how Harley Tutors shows up for every family, from the first message
                  onward.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="section lesson-demo-section" id="inside-a-lesson">
        <Reveal>
          <div className="section-heading">
            <div><p className="eyebrow dark">WHAT A LESSON ACTUALLY LOOKS LIKE</p><h2>Inside a Harley Tutors lesson.</h2></div>
            <p>Not a lecture, and not a worksheet in a video call. Here&apos;s roughly what a real session looks like on screen.</p>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div className="whiteboard">
            <div className="whiteboard-bar"><i /><i /><i /><span>Shared whiteboard</span><span className="whiteboard-live">● Live</span></div>
            <div className="whiteboard-body">
              <div className="whiteboard-steps">
                <div className="wb-step wb-step-1"><span className="wb-tag">Step 1</span> Simplify: 3(x + 2) = 21</div>
                <div className="wb-step wb-step-2"><span className="wb-tag">Step 2</span> Expand: 3x + 6 = 21</div>
                <div className="wb-step wb-step-3 wb-corrected">
                  <span className="wb-tag">Step 3</span> <span className="wb-strike">3x = 15</span> <span className="wb-fix">3x = 15 ✓</span>
                </div>
                <div className="wb-step wb-step-4 wb-highlight"><span className="wb-tag">Step 4</span> x = 5</div>
              </div>
              <div className="whiteboard-note">
                <span className="wb-note-avatar">RH</span>
                <p>Nice — that correction in step 3 is exactly the kind of slip we drill out. Try the harder version now.</p>
              </div>
              <div className="whiteboard-progress">
                <div className="whiteboard-progress-label">Topic mastery</div>
                <div className="lesson-progress"><span className="wb-progress-fill" /></div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="process-section" id="approach">
        <Reveal>
          <div className="section-heading light">
            <div><p className="eyebrow">HOW LESSONS WORK</p><h2>A clear route from confusion to confidence.</h2></div>
            <p>Each lesson follows a purposeful cycle, so students understand what they are learning, why it matters and what comes next.</p>
          </div>
        </Reveal>
        <div className="process-grid">
          {process.map(([title, copy], index) => (
            <Reveal delay={index * 90} key={title}>
              <article>
                <span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section value-section" id="pricing">
        <Reveal>
          <div>
            <p className="eyebrow dark">PERSONALISED TUITION</p>
            <h2>Focused support from <span>£25 per hour.</span></h2>
            <p>Pricing depends on the subject, level and lesson arrangement. We first discuss what the student needs and whether Harley Tutors is the right fit.</p>
            <a className="button button-dark" href={whatsapp} target="_blank" rel="noreferrer">Check availability</a>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <ul>
            <li><b>Personalised lesson planning</b><span>Every session targets the student&apos;s current needs.</span></li>
            <li><b>One-to-one teaching</b><span>Full attention, space to ask questions and no pressure to keep up with a class.</span></li>
            <li><b>Resources and practice</b><span>Purposeful materials selected to strengthen understanding.</span></li>
            <li><b>Parent feedback</b><span>Clear updates on progress, strengths and next steps.</span></li>
          </ul>
        </Reveal>
      </section>

      <section className="section testimonial-section">
        <Reveal>
          <div className="section-heading">
            <div><p className="eyebrow dark">IN THEIR WORDS</p><h2>What families notice first.</h2></div>
            <p>A few honest reflections on what changes once lessons start.</p>
          </div>
        </Reveal>
        <div className="testimonial-grid">
          {testimonials.map((t, i) => (
            <Reveal delay={i * 100} key={t.attribution}>
              <figure className="testimonial-card">
                <span className="testimonial-mark">&ldquo;</span>
                <blockquote>{t.quote}</blockquote>
                <figcaption>{t.attribution}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="feather-divider" aria-hidden="true">
        <Image src="/harley-logo.png" width={34} height={34} alt="" />
      </div>

      <section className="section future-section">
        <Reveal>
          <div className="section-heading">
            <div><p className="eyebrow dark">BEYOND THE LESSON</p><h2>Learn with Harley Tutors, any time.</h2></div>
            <p>We&apos;re building free content so help isn&apos;t limited to lesson hours. Here&apos;s what&apos;s on the way.</p>
          </div>
        </Reveal>
        <div className="future-grid">
          {futureContent.map((item, i) => (
            <Reveal delay={i * 80} key={item.label}>
              <div className="future-card">
                <span className="coming-soon-pill">Coming soon</span>
                <h3>{item.label}</h3>
                <p>{item.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section resources-section">
        <Reveal>
          <div className="section-heading">
            <div><p className="eyebrow dark">FREE RESOURCES</p><h2>Useful before you&apos;ve even booked a lesson.</h2></div>
            <p>A growing library of exam-ready materials, free for anyone to use.</p>
          </div>
        </Reveal>
        <div className="resource-grid">
          {resources.map((item, i) => (
            <Reveal delay={i * 80} key={item.label}>
              <div className="resource-card">
                <div className="resource-icon" aria-hidden="true" />
                <h3>{item.label}</h3>
                <p>{item.detail}</p>
                <span className="coming-soon-pill coming-soon-pill-light">Coming soon</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="final-cta">
        <div className="feather-watermark feather-watermark-cta" aria-hidden="true">
          <Image src="/harley-logo.png" fill alt="" />
        </div>
        <Image src="/harley-logo.png" width={128} height={128} alt="" />
        <p className="eyebrow">READY TO GET STARTED?</p>
        <h2>Let&apos;s find out what is holding your child back.</h2>
        <p>Tell us their year group, subject and current goals. We&apos;ll recommend the most suitable next step.</p>
        <a className="button button-gold" href={whatsapp} target="_blank" rel="noreferrer">Message Harley Tutors</a>
      </section>

      <footer>
        <div className="footer-brand"><Image src="/harley-logo.png" width={76} height={76} alt="Harley Tutors" /><span>HARLEY TUTORS</span></div>
        <div className="footer-links">
          <a href="#subjects">Subjects</a>
          <a href="#approach">Approach</a>
          <a href="#about">About</a>
          <a href={whatsapp}>WhatsApp</a>
          <a href={instagram} target="_blank" rel="noreferrer">Instagram</a>
          <a href={email}>Email</a>
        </div>
        <p>© 2026 Harley Tutors. All rights reserved.</p>
      </footer>

      <PosterFlip />
    </main>
  );
}
