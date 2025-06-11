import { useState } from 'react';
import { Target } from 'lucide-react';
import './auth.css';

export default function SigninPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sign in attempt:', { username, password });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Logo */}
        <div className="auth-logo">
          <Target className="h-8 w-8 text-blue-500" />
          <span className="auth-logo-text">ORBITSUN</span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-form-group">
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder=" "
              className="auth-input"
              required
            />
            <label htmlFor="username" className="auth-label">Username</label>
          </div>

          <div className="auth-form-group">
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
              className="auth-input"
              required
            />
            <label htmlFor="password" className="auth-label">Password</label>
          </div>

          <button type="submit" className="auth-button">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}