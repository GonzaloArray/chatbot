const { key__openAI } = require("../http/routes/chatwood-hook");

const query = async(data) => {
    //8e0af7b0-90e2-485a-9568-babfd0e9c414
  const response = await fetch(
    `http://20.226.166.104:3000/api/v1/prediction/${key__openAI}`,
      {
          headers: {
              Authorization: "Bearer cqsMwLTaz1ur8QFGcvm1TAxAeXrIA7LdyE8E7iLGfkE=",
              "Content-Type": "application/json"
          },
          method: "POST",
          body: JSON.stringify(data)
      }
  );
  const result = await response.json();
  console.log(result);
  return result;
}


module.exports = { query };
