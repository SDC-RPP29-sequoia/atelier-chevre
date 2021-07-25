import axios from 'axios';

export default {
  getProductReviews: (productId, sortMethod) => {
    return axios.get(`/reviews/${productId}/${sortMethod}`, {
      // params: {
      //   productId: productId
      // }
    }).then(response => {
      return response.data;
    });
  },
};
