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

const flowPrincipal = addKeyword(["hola", "ole", "alo"]).addAction(
  async (ctx, { flowDynamic }) => {
    console.log('se activa')
    const MESSAGE = "🙌 Hola bienvenido a este *Chatbot*";
    await sendMessageChatWood(MESSAGE, "incoming");
    await flowDynamic(MESSAGE);
  }
);

const flowVenta = addKeyword(["producto"])
  .addAnswer("🙌 Hola bienvenido a este *Chatbot*")
  .addAnswer(["articulo1", "articulo2"]);

const main = async () => {
  const adapterDB = new MockAdapter();
  const adapterFlow = createFlow([flowPrincipal, flowVenta]);
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
