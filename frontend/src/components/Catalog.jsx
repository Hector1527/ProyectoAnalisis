function Catalog() {
    return (
      <div className="container mt-5">
        <h2>Catálogo de Juegos</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <img src="https://th.bing.com/th/id/OIP.JId47Hu0_248HRiHHEqISQHaE4?w=850&h=560&rs=1&pid=ImgDetMain" className="card-img-top" alt="Juego" />
              <div className="card-body">
                <h5 className="card-title">Juego 1</h5>
                <p className="card-text">Descripción del juego 1.</p>
                <a href="#" className="btn btn-primary">Ver más</a>
              </div>
            </div>
          </div>
          {/* Puedes copiar este bloque para más juegos */}
        </div>
      </div>
    );
  }
  
  export default Catalog;
  