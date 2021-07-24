import axios from 'axios';

export default {
  getProductReviews: (productId) => {
    return axios.get('/getReviews', {
      params: {
        productId: productId
      }
    }).then(response => {
      return response.data;
    });
  }
};
