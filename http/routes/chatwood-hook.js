const express = require('express');
const {createReadStream} = require('fs')
const {join} = require('path')
const router = express.Router();
const chatWoodHook = async (req, res) => {
  const providerWs = req.providerWs
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
let key__openAI = ''

router.post('/chatwood-hook', chatWoodHook)
router.post('/integrationAI', (req, res) => {
  key__openAI = req.body.settings.api_key
  console.log(key__openAI)
  res.json({
      id: 10,
      app_id: 'gonza',
      status: true,
      inbox: null,
      account_id: 1,
      hook_type: 'account',
      settings: { api_key: req.body.settings.api_key},
      reference_id: null
    })
})
router.get('/toggle-consulta-ia', (req, res) => {
  consultaIaActiva = !consultaIaActiva;
  console.log(consultaIaActiva)
  res.json({ consultaIaActiva, msg: 'Consulta Success' });
});
router.get("/get-qr", async (_, res) => {
  const YOUR_PATH_QR = join(process.cwd(), `bot.qr.png`);
  const fileStream = createReadStream(YOUR_PATH_QR);

  res.writeHead(200, { "Content-Type": "image/png" });
  fileStream.pipe(res);
});

function getConsultaIaActiva() {
  return consultaIaActiva;
}


module.exports = {chatWoodHook, router, getConsultaIaActiva, key__openAI}