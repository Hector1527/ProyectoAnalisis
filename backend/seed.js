const connectDB = require('./config/db');
const Videojuego = require('./models/Videojuego');

connectDB().then(async () => {
  await Videojuego.deleteMany(); // Limpiar la colección (opcional)

  const juegos = [
    {
      nombre: "The Legend of Zelda: Breath of the Wild",
      genero: ["Aventura", "RPG"],
      plataforma: ["Nintendo Switch"],
      lanzamiento: "2017-03-03",
      imagenURL: "https://ejemplo.com/zelda.jpg",
      rating: 5
    },
    // Agrega más juegos aquí...
  ];

  await Videojuego.insertMany(juegos);
  console.log('Datos insertados correctamente');
  process.exit();
});