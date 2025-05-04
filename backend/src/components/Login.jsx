// src/components/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  // Maneja cambios en los inputs
  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Envía el formulario
  const handleSubmit = e => {
    e.preventDefault();

    /* ----------------------------------------------------
       TODO: aquí vendrá la validación real (consulta al backend)
       De momento, siempre damos acceso:
    ---------------------------------------------------- */
    navigate('/catalogo');
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card shadow-sm" style={{ maxWidth: '420px', width: '100%' }}>
        <div className="card-body p-4">
          <h2 className="card-title mb-4 text-center">Iniciar sesión</h2>

          <form onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div className="form-floating mb-3">
              <input
                type="email"
                name="email"
                className="form-control"
                id="loginEmail"
                placeholder="usuario@ejemplo.com"
                value={form.email}
                onChange={handleChange}
                required
              />
              <label htmlFor="loginEmail">Correo electrónico</label>
            </div>

            {/* Password */}
            <div className="form-floating mb-4">
              <input
                type="password"
                name="password"
                className="form-control"
                id="loginPassword"
                placeholder="Contraseña"
                value={form.password}
                onChange={handleChange}
                required
              />
              <label htmlFor="loginPassword">Contraseña</label>
            </div>

            {/* Botón */}
            <button className="btn btn-primary w-100" type="submit">
              Entrar
            </button>
          </form>
        </div>

        {/* Pie opcional */}
        <div className="card-footer py-3 text-center">
          <small className="text-muted">
            {/* Este enlace no hace nada aún: */}
            ¿No tienes cuenta? <a href="#">Regístrate</a>
          </small>
        </div>
      </div>
    </div>
  );
}

export default Login;
