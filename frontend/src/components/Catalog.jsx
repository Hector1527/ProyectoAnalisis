import { useState, useRef, useEffect } from 'react';
import bgImage from '/OIP.jpeg';

const DEFAULT_IMG = 'https://via.placeholder.com/800x600.png?text=Imagen+no+disponible';

function Catalog() {
  const [juegos, setJuegos] = useState([]);
  const [show, setShow] = useState(false);
  const [nuevo, setNuevo] = useState({
    nombre: '',
    genero: '',
    descripcion: '',
    imagen: '',
    fechaLanzamiento: '',
    plataformas: '',
    calificacion: ''
  });
  const nombreRef = useRef(null);

  // Obtener juegos del backend al montar el componente
  useEffect(() => {
    fetch('https://laboratorioanalisis.freedynamicdns.net/api/juegos')
      .then(res => {
        if (!res.ok) throw new Error('Error al obtener juegos');
        return res.json();
      })
      .then(data => setJuegos(data.juegos || []))
      .catch(err => {
        console.error(err);
        alert('Error al cargar los juegos del servidor');
      });
  }, []);

  // Enfocar input al abrir modal
  useEffect(() => {
    if (show && nombreRef.current) nombreRef.current.focus();
  }, [show]);

  const handleChange = e => setNuevo({ ...nuevo, [e.target.name]: e.target.value });

  // Agregar juego: enviar POST y actualizar estado local
  const handleAdd = e => {
    e.preventDefault();
    if (!nuevo.nombre || !nuevo.descripcion) {
      alert('Nombre y descripción son obligatorios');
      return;
    }

  const nuevoJuego = {
    nombre: nuevo.nombre,
    genero: nuevo.genero,
    descripcion: nuevo.descripcion,
    imagen: nuevo.imagen.trim() || DEFAULT_IMG,
    fechaLanzamiento: nuevo.fechaLanzamiento,
    plataformas: nuevo.plataformas.split(',').map(p => p.trim()), // convierte a array
    calificacion: parseFloat(nuevo.calificacion) // asegura que sea número
  };

    console.log("Juego a enviar:", nuevoJuego);

    fetch('https://laboratorioanalisis.freedynamicdns.net/api/juegos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoJuego),
    })
      .then(res => {
        if (!res.ok) throw new Error('Error al guardar el juego');
        return res.json();
      })
      .then(juegoGuardado => {
        setJuegos([...juegos, juegoGuardado]);
        setNuevo({ nombre: '', descripcion: '', imagen: '' });
        setShow(false);
      })
      .catch(async err => {
        console.error(err);
        try {
          const errorData = await err.response.json();
          alert('Error al guardar el juego: ' + (errorData.error || 'Error desconocido'));
        } catch {
          alert('Error al guardar el juego en el servidor');
        }
      });
  };

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

      <main className="flex-grow-1 position-relative" style={{ zIndex: 1 }}>
        <div className="container py-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold text-white">Catálogo de Juegos</h2>
            <button className="btn btn-success" onClick={() => setShow(true)}>
              ➕ Añadir juego
            </button>
          </div>

          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
            {juegos.map((j, idx) => (
              <div className="col" key={j._id || idx}>
                <div className="card h-100 shadow-sm">
                  <img
                    src={j.imagen || DEFAULT_IMG}
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

      <footer className="bottom-bar d-flex justify-content-center align-items-center text-white small">
        <span>Versión 0.1.0 • Build abc123 • © 2025 GameHub</span>
      </footer>

      {show && (
        <div
          className="modal fade show"
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,.5)' }}
          onClick={() => setShow(false)}
        >
          <div className="modal-dialog" onClick={e => e.stopPropagation()}>
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
                    name="nombre"
                    className="form-control"
                    value={nuevo.nombre}
                    onChange={handleChange}
                    required
                    autoFocus
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Género</label>
                  <select
                    name="genero"
                    className="form-select"
                    value={nuevo.genero || ''}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Selecciona un género</option>
                    <option value="Aventura">Aventura</option>
                    <option value="RPG">RPG</option>
                    <option value="FPS">FPS</option>
                    <option value="Estrategia">Estrategia</option>
                  </select>
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
                  <div className="mb-3">
                    <label className="form-label">Fecha de lanzamiento</label>
                    <input
                      type="date"
                      name="fechaLanzamiento"
                      className="form-control"
                      value={nuevo.fechaLanzamiento}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Plataformas</label>
                    <input
                      name="plataformas"
                      className="form-control"
                      value={nuevo.plataformas}
                      onChange={handleChange}
                      placeholder="Ej: PC, PS5, Xbox"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Calificación</label>
                    <input
                      type="number"
                      name="calificacion"
                      className="form-control"
                      value={nuevo.calificacion}
                      onChange={handleChange}
                      placeholder="1 a 5"
                      min="1"
                      max="5"
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
