require('dotenv').config();
const axios = require('axios');
const imgbbUploader = require('imgbb-uploader');
const multer = require('multer');
const upload = multer();
const QAURL = process.env.QAURL;

const getQuestions = (req, res) => {
  let num = req.params.productId;

  let url = `${QAURL}/qa/questions?product_id=${num}&page=1&count=100`;

  axios.get(url, {
    headers: {
      Authorization: process.env.TOKEN
    }
  })
    .then(response => {
      res.json(response.data);
    })
    .catch(err => {
      console.log('err', err);
    });
};

const postQuestion = (req, res) => {
  let data = req.body.data;
  let url = `${QAURL}/qa/questions`;

  axios.post(url, data, {
    headers: {
      Authorization: process.env.TOKEN
    }
  })
    .then(response => {
      res.send(response.data);
    })
    .catch(err => {
      console.log('err', err);
    });
};

const markAnswerHelpful = (req, res) => {
  let answerId = req.body.answerId;
  let url = `${QAURL}/qa/answers/${answerId}/helpful`;

  axios.put(url, {}, {
    headers: {
      Authorization: process.env.TOKEN
    }
  })
    .then(response => {
      res.send(response.data);
    })
    .catch(err => {
      console.log(err);
    });
};

const markQuestionHelpful = (req, res) => {
  let questionId = req.body.questionId;
  let url = `${QAURL}/qa/questions/${questionId}/helpful`;

  axios.put(url, {}, {
    headers: {
      Authorization: process.env.TOKEN
    }
  })
    .then(response => {
      res.send(response.data);
    })
    .catch(err => {
      console.log(err);
    });
};

const reportQuestion = (req, res) => {
  let questionId = req.body.questionId;
  let url = `${QAURL}/qa/questions/${questionId}/report`;

  axios.put(url, {}, {
    headers: {
      Authorization: process.env.TOKEN
    }
  })
    .then(response => {
      res.send(response.data);
    })
    .catch(err => {
      console.log(err);
    });
};

const reportAnswer = (req, res) => {
  let answerId = req.body.answerId;
  let url = `${QAURL}/qa/answers/${answerId}/report`;

  axios.put(url, {}, {
    headers: {
      Authorization: process.env.TOKEN
    }
  })
    .then(response => {
      res.send(response.data);
    })
    .catch(err => {
      console.log(err);
    });
};

const postAnswer = async (req, res) => {
  try {
    let questionId = req.body.questionId;
    let url = `${QAURL}/qa/questions/${questionId}/answers`;

    let data = {
      body: req.body.body,
      name: req.body.name,
      email: req.body.email
    };

    if (req.files.length) {
      let files = req.files.map((file, i) => {
        return new Promise(async (resolve, reject) => {
          let base64string = file.buffer.toString('base64');
          let options = {
            apiKey: process.env.IMG_API_KEY,
            base64string
          };

          let url = await imgbbUploader(options);
          resolve(url.image.url);
        });
      });

      let fileUrls = await Promise.all(files);
      data.photos = fileUrls;
    }

    axios.post(url, data, {
      headers: {
        Authorization: process.env.TOKEN
      }
    })
      .then(response => {
        res.send(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  } catch (error) {
    res.send(error);
  }
};

const getProductName = (req, res) => {
  let url = `${QAURL}/products/${req.params.productId}`;

  axios.get(url, {
    headers: {
      Authorization: process.env.TOKEN
    }
  })
    .then(response => {
      res.json(response.data);
    })
    .catch(err => {
      console.log('err', err);
    });
};

module.exports = {
  getQuestions,
  postQuestion,
  markAnswerHelpful,
  markQuestionHelpful,
  reportQuestion,
  reportAnswer,
  postAnswer,
  getProductName
};