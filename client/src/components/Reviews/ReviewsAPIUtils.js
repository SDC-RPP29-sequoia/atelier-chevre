import axios from 'axios';

export default {
  getProductReviews: (productId) => {
    return axios.get('/reviews', {
      params: {
        productId: productId
      }
    }).then(response => {
      return response.data;
    });
  },
};
