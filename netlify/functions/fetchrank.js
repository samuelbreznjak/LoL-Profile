const axios = require("axios");

exports.handler = async function (event, context) {
  try {
    const {region, id} = event.queryStringParameters;
    const url = `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${process.env.API_KEY}`;

    const { data } = await axios.get(url)

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 404,
      body: err.toString(),
    };
  }
};