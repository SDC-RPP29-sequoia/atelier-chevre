const axios = require('axios');

const sendClickData = async (req, res) => {
  try {
    const response = await axios.post('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/interactions', req.body, {
      headers: {
        'Authorization': process.env.TOKEN
      }
    });

    console.log(response.status, response.data);
    res.sendStatus(201);
  } catch (err) {
    console.log(err.message);
    res.status(422).send(err.message);
  }
};


module.exports = sendClickData;