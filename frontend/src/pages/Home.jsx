import { Link } from 'react-router-dom';
import {
  Scissors, Scale, Calculator, Megaphone, Laptop2, Home as HomeIcon,
  Search, MessageCircle, CheckCircle2, ShieldCheck, MapPin, Clock,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const CATEGORIES = [
  { key: 'tailor', label: 'Tailor Services', desc: 'Book a slot — home visit or shop visit for measurements and stitching.', live: true, Icon: Scissors },
  { key: 'advocate', label: 'Advocate Services', desc: 'Browse listed advocates and reach out directly.', live: false, Icon: Scale },
  { key: 'ca', label: 'CA Services', desc: 'Tax, GST, and accounting professionals near you.', live: false, Icon: Calculator },
  { key: 'digital_marketing', label: 'Digital Marketing', desc: 'Grow your business online with local experts.', live: false, Icon: Megaphone },
  { key: 'it_technical', label: 'IT Technical Services', desc: 'Repairs, setup, and technical training.', live: false, Icon: Laptop2 },
  { key: 'real_estate', label: 'Real Estate Services', desc: 'Buy, sell, or rent property in Kakinada.', live: false, Icon: HomeIcon },
];

const STEPS = [
  { Icon: Search, title: 'Browse a category', desc: 'Explore tailors, advocates, CAs, and more — all based in and around Kakinada.' },
  { Icon: MessageCircle, title: 'Connect', desc: 'Book a slot or reach out — our team helps you connect with the right professional.' },
  { Icon: CheckCircle2, title: 'Get it done', desc: 'Meet, get the work done, and come back next time you need a trusted local hand.' },
];

const TRUST_POINTS = [
  { Icon: MapPin, label: 'Kakinada-based', desc: 'Every professional serves this city' },
  { Icon: ShieldCheck, label: 'Verified listings', desc: 'Professionals are checked before going live' },
  { Icon: Clock, label: 'Quick response', desc: 'Most requests answered within hours' },
];

function StitchMark() {
  return (
    <svg className="hero-stitch" viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 190 C 80 40, 160 200, 220 60 S 300 30, 300 30" stroke="#2F6F5E" strokeWidth="3" strokeDasharray="10 9" strokeLinecap="round"/>
      <circle cx="20" cy="190" r="5" fill="#C99A3E" />
      <circle cx="300" cy="30" r="5" fill="#C99A3E" />
      <path d="M245 20 L300 30 L285 75" stroke="#163C31" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}

export default function Home() {
  const { user, logout } = useAuth();

  return (
    <div>
      <div className="topbar">
        <Link to="/" className="brand">
          <Scissors size={22} strokeWidth={2.2} />
          Kakinada Services
        </Link>
        <nav>
          {user ? (
            <>
              <span className="muted">Hi, {user.name}</span>
              <button className="link-btn" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Log in</Link>
              <Link to="/signup" className="btn-outline">Sign up</Link>
            </>
          )}
        </nav>
      </div>

      <section className="hero">
        <div>
          <span className="hero-eyebrow">Kakinada · Local Services</span>
          <h2>Every trusted professional <em>your city</em> has to offer, in one place.</h2>
          <p>From the tailor down the road to the CA who knows local business — book, browse, and connect without the guesswork.</p>
          <div className="hero-actions">
            {!user && <Link to="/signup" className="btn">Get started</Link>}
            <a href="#categories" className="btn-outline">Browse services</a>
          </div>
        </div>
        <StitchMark />
      </section>

      {/* Trust bar */}
      <div className="trust-bar">
        {TRUST_POINTS.map(({ Icon, label, desc }) => (
          <div className="trust-item" key={label}>
            <Icon size={18} strokeWidth={2} />
            <div>
              <strong>{label}</strong>
              <span>{desc}</span>
            </div>
          </div>
        ))}
      </div>

      <hr className="stitch-divider" />

      {/* Categories */}
      <div className="page" style={{ paddingTop: 0 }} id="categories">
        <span className="section-label">Browse by category</span>
        <h2 className="section-title">Services people in Kakinada actually need</h2>
        <div className="grid">
          {CATEGORIES.map(({ key, label, desc, live, Icon }) => (
            <div key={key} className={`card ${!live ? 'card-disabled' : ''}`}>
              <div className="card-icon"><Icon size={20} strokeWidth={2} /></div>
              <h3>{label}</h3>
              <p>{desc}</p>
              {live ? (
                <Link to={`/${key}`} className="btn">Browse tailors</Link>
              ) : (
                <span className="badge">Coming soon</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div className="how-it-works">
        <div className="page" style={{ padding: '0 28px' }}>
          <span className="section-label" style={{ color: '#C9D6CF' }}>How it works</span>
          <h2 className="section-title" style={{ color: 'white' }}>Three steps, start to finish</h2>
          <div className="steps-grid">
            {STEPS.map(({ Icon, title, desc }, i) => (
              <div className="step-card" key={title}>
                <div className="step-number">{String(i + 1).padStart(2, '0')}</div>
                <Icon size={22} strokeWidth={2} />
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="page">
        <div className="cta-box">
          <h3>Have a business to list?</h3>
          <p className="muted">Tailors and other professionals can sign up to reach customers across Kakinada.</p>
          <Link to="/signup" className="btn">List your business</Link>
        </div>
      </div>

      <footer className="footer">
        <div className="brand" style={{ color: '#C9D6CF' }}>
          <Scissors size={18} strokeWidth={2.2} />
          Kakinada Services
        </div>
        <p>Connecting Kakinada to trusted local professionals.</p>
      </footer>
    </div>
  );
}
