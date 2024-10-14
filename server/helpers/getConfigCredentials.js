const Config = require('../models/Config');

const getConfigCredentials = async () => {
  const config = await Config.findOne(); 
  if (config) {
    return { email: config.email, password: config.password , emailSend: config.emailSend};
  } else {
    throw new Error('Usuario no encontrado');
  }
};


module.exports = getConfigCredentials;