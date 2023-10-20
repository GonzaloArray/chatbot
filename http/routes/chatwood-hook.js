const express = require('express');
const {createReadStream} = require('fs')
const {join} = require('path')
const router = express.Router();
const chatWoodHook = async (req, res) => {
  const providerWs = req.providerWs
  console.log(providerWs)
  const body = req.body;
  if (body?.private) {
    res.send(null)
    return
  }
  const phone = body?.conversation?.meta?.sender?.phone_number.replace('+','')
  await providerWs?.sendText(`${phone}@c.us`, body.content)
  res.send(body)
}

let consultaIaActiva = true

router.post('/chatwood-hook', chatWoodHook)
router.get('/toggle-consulta-ia', (req, res) => {
  console.log(consultaIaActiva)
  consultaIaActiva = !consultaIaActiva;
  res.json({ consultaIaActiva, msg: 'Consulta Success' });
});
router.get("/get-qr", async (_, res) => {
  const YOUR_PATH_QR = join(process.cwd(), `bot.qr.png`);
  const fileStream = createReadStream(YOUR_PATH_QR);

  res.writeHead(200, { "Content-Type": "image/png" });
  fileStream.pipe(res);
});

module.exports = {chatWoodHook, router, consultaIaActiva}