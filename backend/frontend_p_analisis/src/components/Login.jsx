function Login() {
    return (
      <div className="container mt-5">
        <h2>Iniciar sesión</h2>
        <form>
          <div className="mb-3">
            <label className="form-label">Correo</label>
            <input type="email" className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input type="password" className="form-control" />
          </div>
          <button type="submit" className="btn btn-primary">Entrar</button>
        </form>
      </div>
    );
  }
  
  export default Login;
  