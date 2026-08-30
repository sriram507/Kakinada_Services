import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/client';

export default function BookTailor() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    slotDate: '',
    slotTime: '',
    visitType: 'tailor_visits',
    customerNote: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!user) {
      setError('Please log in as a customer to book a slot.');
      return;
    }

    setLoading(true);
    try {
      const slotDateTime = new Date(`${form.slotDate}T${form.slotTime}`).toISOString();
      await api.post('/leads', {
        category: 'tailor',
        slotDateTime,
        visitType: form.visitType,
        customerNote: form.customerNote,
      });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not create booking. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (!user) {
    return (
      <div className="page-narrow">
        <p>Please <Link to="/login">log in</Link> as a customer to book a tailor slot.</p>
      </div>
    );
  }

  if (success) {
    return (
      <div className="page-narrow">
        <h2>Booking request received</h2>
        <p>We've noted your slot request. Our team will contact you shortly to confirm and connect you with a tailor.</p>
        <Link to="/" className="btn">Back to home</Link>
      </div>
    );
  }

  return (
    <div className="page-narrow">
      <Link to="/tailor" className="back-link">← Back to tailors</Link>
      <span className="section-label">Tailor Services</span>
      <h2>Book a Tailor Slot</h2>
      <p className="muted">Tell us when suits you — we'll confirm with a tailor shortly.</p>

      <div className="form-card">
      <form onSubmit={handleSubmit} className="form">
        <label>
          Preferred date
          <input required type="date" value={form.slotDate} onChange={(e) => update('slotDate', e.target.value)} />
        </label>
        <label>
          Preferred time
          <input required type="time" value={form.slotTime} onChange={(e) => update('slotTime', e.target.value)} />
        </label>
        <label>
          Visit type
          <select value={form.visitType} onChange={(e) => update('visitType', e.target.value)}>
            <option value="tailor_visits">Tailor visits me</option>
            <option value="customer_visits_shop">I'll visit the shop</option>
          </select>
        </label>
        <label>
          Notes (what do you need stitched?)
          <textarea value={form.customerNote} onChange={(e) => update('customerNote', e.target.value)} rows={3} />
        </label>

        {error && <p className="error">{error}</p>}

        <button className="btn" type="submit" disabled={loading}>
          {loading ? 'Booking…' : 'Request Booking'}
        </button>
      </form>
      </div>
    </div>
  );
}
