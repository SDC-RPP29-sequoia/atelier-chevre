import axios from 'axios';

export default {
  getProductReviews: async (productId, sortMethod) => {
    return await axios.get(`/reviews/${productId}/${sortMethod}`);
  },
  getProductReviewsMeta: (productId) => {
    return axios.get(`/reviews/${productId}`, {
    }).then(response => {
      return response.data;
    });
  },
};
