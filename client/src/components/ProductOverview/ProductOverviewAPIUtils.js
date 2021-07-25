import axios from 'axios';

let url = 'http://localhost:3000';

export default {
  getProduct(id) {
    return new Promise((resolve, reject) => {
      axios.get(`${url}/products/${id}`)
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
      axios.get(`${url}/products/${id}/styles`)
        .then(response => {
          resolve(response.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
};