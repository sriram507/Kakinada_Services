import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Scissors } from 'lucide-react';
import api from '../api/client';

export default function TailorCategory() {
  const [tailors, setTailors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get('/professionals', { params: { category: 'tailor' } })
      .then((res) => setTailors(res.data))
      .catch(() => setError('Could not load tailors right now.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page">
      <Link to="/" className="back-link">← Back to all services</Link>
      <span className="section-label">Tailor Services</span>
      <h2>Tailors in Kakinada</h2>
      <p className="muted">Book a slot — the tailor visits you, or you visit their shop.</p>

      {loading && <p className="muted">Loading tailors…</p>}
      {error && <p className="error">{error}</p>}

      {!loading && tailors.length === 0 && (
        <p className="muted">No tailors listed yet. Check back soon.</p>
      )}

      <div className="grid" style={{ marginTop: 24 }}>
        {tailors.map((t) => (
          <div key={t._id} className="card">
            <div className="card-icon"><Scissors size={20} strokeWidth={2} /></div>
            <h3>{t.businessName}</h3>
            <p>{t.specialization}</p>
            <p className="muted">{t.experienceYears} years experience</p>
            <p>{t.description}</p>
          </div>
        ))}
      </div>

      <div className="cta-box">
        <h3>Ready to book?</h3>
        <p className="muted">Choose your slot and visit type — our team will confirm with a tailor.</p>
        <Link to="/tailor/book" className="btn">Book a Tailor Slot</Link>
      </div>
    </div>
  );
}
