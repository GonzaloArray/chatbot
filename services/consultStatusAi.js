const { consultaIaActiva } = require("../http/routes/chatwood-hook");

const consultStatusAI = async() => {
  return consultaIaActiva
}


module.exports = { consultStatusAI };
