const express = require('express');
const { router } = require('./routes/chatwood-hook');


class ServerHttp {
  app;
  port = process.env.PORT ?? 3003
  
  constructor(_providerWs){
    this.providerWs = _providerWs
  }

  buildApp = () => {
    return this.app = express()
    .use(express.json())
    .use((req, res, next) => {
      req.providerWs = this.providerWs
      next()
    })
    .use(router)
    .listen(this.port, () => console.log('Listo el puerto'));
  }

  start (){
    this.buildApp()
  }
}

module.exports = ServerHttp