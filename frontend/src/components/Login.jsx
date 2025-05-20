import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import bgImage from '/OIP.jpeg';

function Login() {
const navigate = useNavigate();

const handleLogin = credentialResponse => {
console.log('Credencial JWT:', credentialResponse.credential);
// Aquí puedes decodificar el token si quieres info del usuario
navigate('/catalogo');
};

const wrapperStyle = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  background: `url(${bgImage}) center / cover no-repeat`, // ✅ usando backticks `
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
zIndex: 1,
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

  <main className="flex-grow-1 d-flex align-items-center justify-content-center">
    <div style={cardStyle}>
      <h2 className="text-center mb-4 fw-bold">Iniciar sesión con Google</h2>
      <GoogleLogin onSuccess={handleLogin} onError={() => console.log('Error')} />
    </div>
  </main>

  <footer className="bottom-bar d-flex justify-content-center align-items-center text-white small">
    <span>Versión 0.1.0 • Build abc123 • © 2025 GameHub</span>
  </footer>
</div>
);
}

export default Login;

