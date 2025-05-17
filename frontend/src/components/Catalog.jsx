import { useState, useRef, useEffect } from 'react';
import bgImage from '/OIP.jpeg';                     // mismo fondo que Login.jsx

const DEFAULT_IMG =
  'https://via.placeholder.com/800x600.png?text=Imagen+no+disponible';

function Catalog() {
  const [juegos, setJuegos]   = useState([]);
  const [show, setShow]       = useState(false);
  const [nuevo, setNuevo]     = useState({ nombre: '', descripcion: '', imagen: '' });
  const nombreRef             = useRef(null);

  /* Enfocar 1er input cuando abre modal */
  useEffect(() => { if (show && nombreRef.current) nombreRef.current.focus(); }, [show]);

  const handleChange = e => setNuevo({ ...nuevo, [e.target.name]: e.target.value });

  const handleAdd = e => {
    e.preventDefault();
    setJuegos([
      ...juegos,
      { ...nuevo, imagen: nuevo.imagen.trim() || DEFAULT_IMG },
    ]);
    setNuevo({ nombre: '', descripcion: '', imagen: '' });
    setShow(false);
  };

  /* ─── estilos inline para fondo/overlay ─── */
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

  return (
    <div style={wrapperStyle}>
      <div style={overlayStyle} />

      {/* ───────── Top bar ───────── */}
      <header className="top-bar d-flex justify-content-between align-items-center px-3">
        <div className="d-flex align-items-center gap-2">
          <img src="/GameHub_Logo.png" alt="logo" height="38" />
          <span className="fw-bold fs-5 text-white">GameHub</span>
        </div>
        <div className="text-white small d-flex gap-4 flex-wrap">
          <span>🎮 Juegos en catálogo: {juegos.length}</span>
          <span>📥 Agrega más títulos</span>
        </div>
      </header>

      {/* ───────── Contenido ───────── */}
      <main className="flex-grow-1 position-relative" style={{ zIndex: 1 }}>
        <div className="container py-5">
          {/* Encabezado y botón */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold text-white">Catálogo de Juegos</h2>
            <button className="btn btn-success" onClick={() => setShow(true)}>
              ➕ Añadir juego
            </button>
          </div>

          {/* Tarjetas */}
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
            {juegos.map((j, idx) => (
              <div className="col" key={idx}>
                <div className="card h-100 shadow-sm">
                  <img
                    src={j.imagen}
                    alt={j.nombre}
                    style={{ height: '180px', width: '100%', objectFit: 'cover' }}
                  />
                  <div className="p-4 d-flex flex-column">
                    <h5 className="fw-semibold">{j.nombre}</h5>
                    <p className="text-muted flex-grow-1">{j.descripcion}</p>
                    <a href="#" className="btn btn-primary w-100 mt-2">
                      Ver más
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* ───────── Bottom bar ───────── */}
      <footer className="bottom-bar d-flex justify-content-center align-items-center text-white small">
        <span>Versión 0.1.0 • Build abc123 • © 2025 GameHub</span>
      </footer>

      {/* ───────── Modal para nuevo juego ───────── */}
      {show && (
        <div
          className="modal fade show"
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,.5)' }}
          onClick={() => setShow(false)}
        >
          <div
            className="modal-dialog"
            onClick={e => e.stopPropagation()} /* evita cerrar al click interno */
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Nuevo juego</h5>
                <button type="button" className="btn-close" onClick={() => setShow(false)} />
              </div>

              <form onSubmit={handleAdd}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                      ref={nombreRef}
                      name="nombre"
                      className="form-control"
                      value={nuevo.nombre}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <textarea
                      name="descripcion"
                      className="form-control"
                      value={nuevo.descripcion}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">URL de imagen (opcional)</label>
                    <input
                      name="imagen"
                      className="form-control"
                      value={nuevo.imagen}
                      onChange={handleChange}
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShow(false)}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Agregar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Catalog;
