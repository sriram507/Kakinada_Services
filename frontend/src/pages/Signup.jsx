import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', email: '', phone: '', password: '', role: 'customer', area: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signup(form);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-narrow">
      <Link to="/" className="back-link">← Back to home</Link>
      <h2>Create your account</h2>
      <p className="muted">Join as a customer, or list your business as a professional.</p>
      <div className="form-card">
      <form onSubmit={handleSubmit} className="form">
        <label>
          I am a
          <select value={form.role} onChange={(e) => update('role', e.target.value)}>
            <option value="customer">Customer</option>
            <option value="professional">Professional (e.g. Tailor)</option>
          </select>
        </label>
        <label>
          Name
          <input required value={form.name} onChange={(e) => update('name', e.target.value)} />
        </label>
        <label>
          Email
          <input required type="email" value={form.email} onChange={(e) => update('email', e.target.value)} />
        </label>
        <label>
          Phone
          <input required value={form.phone} onChange={(e) => update('phone', e.target.value)} />
        </label>
        <label>
          Area (Kakinada)
          <input value={form.area} onChange={(e) => update('area', e.target.value)} placeholder="e.g. Jagannaickpur" />
        </label>
        <label>
          Password
          <input required type="password" minLength={6} value={form.password} onChange={(e) => update('password', e.target.value)} />
        </label>

        {error && <p className="error">{error}</p>}

        <button className="btn" type="submit" disabled={loading}>
          {loading ? 'Creating account…' : 'Sign up'}
        </button>
      </form>
      </div>
      <p className="muted">Already have an account? <Link to="/login">Log in</Link></p>
    </div>
  );
}
