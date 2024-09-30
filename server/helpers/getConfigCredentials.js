const Config = require('../models/Config');

const getConfigCredentials = async () => {
  const config = await Config.findById('66f6b76792843d8345d4133f'); 
  if (config) {
    return { email: config.email, password: config.password };
  } else {
    throw new Error('Usuario no encontrado');
  }
};

module.exports = getConfigCredentials;