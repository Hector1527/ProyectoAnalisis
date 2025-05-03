const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Para desarrollo local (MongoDB local):
    await mongoose.connect('mongodb://localhost:27017/catalogo', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Para producción (Azure Cosmos DB):
    await mongoose.connect('mongodb+srv://Hector:<password>@catalogo-juegos-db.global.mongocluster.cosmos.azure.com/?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000', {
     useNewUrlParser: true,
     useUnifiedTopology: true,
    });

    console.log('Conectado a MongoDB');
  } catch (err) {
    console.error('Error de conexión a MongoDB:', err);
    process.exit(1);
  }
};

module.exports = connectDB;