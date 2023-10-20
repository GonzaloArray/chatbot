const query = async(data) => {
  const response = await fetch(
      "http://20.226.166.104:3000/api/v1/prediction/8e0af7b0-90e2-485a-9568-babfd0e9c414",
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
  return result;
}


module.exports = { query };
