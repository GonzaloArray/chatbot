const {
  createBot,
  createProvider,
  createFlow,
  addKeyword,
} = require("@bot-whatsapp/bot");

const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const MockAdapter = require("@bot-whatsapp/database/mock");
const ServerHttp = require("./http");
const { sendMessageChatWood } = require("./services/chatwood");
const { query } = require("./services/queryIA");
const { consultaIaActiva } = require("./http/routes/chatwood-hook");

const flowPrincipal = addKeyword(["hola", "ole", "alo"]).addAction(
  async (ctx, { flowDynamic }) => {
    const MESSAGE = ctx.body;

    const data = await query({"question": MESSAGE})
    await sendMessageChatWood(data, "incoming");
    await flowDynamic(data);
  }
).addAnswer('Ingresa tu pregunta', {capture: true},async (ctx, { flowDynamic, fallBack }) => {
  console.log(consultaIaActiva)
  if (consultaIaActiva) {
    const MESSAGE = ctx.body;

    const data = await query({"question": MESSAGE})
    await sendMessageChatWood(data, "incoming");
    await flowDynamic(data);
    return fallBack();
  }
})


const main = async () => {
  const adapterDB = new MockAdapter();
  const adapterFlow = createFlow([flowPrincipal]);
  const adapterProvider = createProvider(BaileysProvider);

  await createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });

  const server = new ServerHttp(adapterProvider);
  server.start();
};

main();
