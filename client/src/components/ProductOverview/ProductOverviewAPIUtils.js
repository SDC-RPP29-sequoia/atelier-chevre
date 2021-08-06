import axios from 'axios';

let url = 'http://localhost:3000';

export default {
  getProduct(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${url}/api/products/${id}`)
        .then(response => {
          resolve(response.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  getProductStyles(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${url}/api/products/${id}/styles`)
        .then(response => {
          resolve(response.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  getReviews(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${url}/api/reviews/${id}`)
        .then(response => {
          resolve(response.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  sendClickData(clickData) {
    return axios.post('/api/interactions/clickData', clickData);
  },
};
