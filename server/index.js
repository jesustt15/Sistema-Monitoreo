const express = require('express');
// const { dbConnection } = require('./database/config');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
// const cron = require('cron');
// const Temperatura = require('./models/Temperatura');
const app = express();

app.use(cors({
    
    origin: 'http://localhost:5132',
    credentials: true

})); //usar el corss

app.use(bodyParser.json()); //para leer los valores del esp32

app.use(express.json()); // Middleware para parsear JSON


// dbConnection();

//Rutas
app.use('/sensor/auth', require('./routes/auth'));
app.use('/sensor/valores', require('./routes/valores'));
app.use('/sensor/lugares', require('./routes/lugar'));
app.use('/sensor/config' , require('./routes/config'));
app.use('/sensor/historico', require('./routes/hist_valor'));

// Configurar la tarea cron para eliminar registros antiguos
// const job = new cron.CronJob('0 0 * * *', async () => {
//     try {
//       const result = await Temperatura.deleteMany({
//         tempFecha: { $lt: new Date(Date.now() - 30*24*60*60*1000) }
//       });
//       console.log(`Registros eliminados: ${result.deletedCount}`);
//     } catch (error) {
//       console.error('Error al eliminar registros antiguos:', error);
//     }
//   });


app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});
  