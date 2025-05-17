import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '/OIP.jpeg';            // imagen de fondo

function Login() {
  const navigate        = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    navigate('/catalogo');                  // ← validar después
  };

  /* Estilos inline que solucionan el alto completo y el overlay */
  const wrapperStyle = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: `url(${bgImage}) center / cover no-repeat`,
    position: 'relative',
  };

  const overlayStyle = {
    position: 'absolute',
    inset: 0,
    background: 'rgba(0,0,0,.45)',
    backdropFilter: 'blur(4px)',
    zIndex: 0,
  };

  const cardStyle = {
    zIndex: 1,                  // sobre el overlay
    width: '100%',
    maxWidth: '380px',
    padding: '2rem 2.5rem',
    borderRadius: '16px',
    background: '#fff',
    border: '2px solid #e5e5e5',
    boxShadow: '0 8px 26px rgba(0,0,0,.2)',
    color: '#000',
  };

  return (
    <div style={wrapperStyle}>
      <div style={overlayStyle} />

      {/* Top bar ------------------------------------------------ */}
      <header className="top-bar d-flex justify-content-between align-items-center px-3">
        <div className="d-flex align-items-center gap-2">
          <img src="/GameHub_Logo.png" alt="logo" height="38" />
          <span className="fw-bold fs-5 text-white">GameHub</span>
        </div>
        <div className="text-white small d-flex gap-4 flex-wrap">
          <span>🎮 Jugadores online: 12 543</span>
          <span>🆕 Nuevos títulos hoy: 7</span>
        </div>
      </header>

      {/* Login card -------------------------------------------- */}
      <main className="flex-grow-1 d-flex align-items-center justify-content-center">
        <div style={cardStyle}>
          <h2 className="text-center mb-4 fw-bold">Iniciar sesión</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="correo"
                value={form.email}
                onChange={handleChange}
                required
              />
              <label>Correo electrónico</label>
            </div>

            <div className="form-floating mb-4">
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="contraseña"
                value={form.password}
                onChange={handleChange}
                required
              />
              <label>Contraseña</label>
            </div>

            <button className="btn btn-primary w-100">Entrar</button>
          </form>
        </div>
      </main>

      {/* Bottom bar ------------------------------------------- */}
      <footer className="bottom-bar d-flex justify-content-center align-items-center text-white small">
        <span>Versión 0.1.0 • Build abc123 • © 2025 GameHub</span>
      </footer>
    </div>
  );
}

export default Login;
