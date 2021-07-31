import axios from 'axios';

export default {
  getProductReviews: async (productId, sortMethod) => {
    return await axios.get(`/api/reviews/${productId}/${sortMethod}`);
  },

  getProductReviewsMeta: (productId) => {
    return axios.get(`/api/reviews/${productId}`, {
    }).then(response => {
      return response.data;
    });
  },

  sendHelpful: (reviewId) => {
    return axios.put(`/api/reviews/${reviewId}/helpful`)
      .then(res => {
        return res;
      })
      .catch(err => {
        alert('You have already marked this review as Helpful');
        return err;
      });
  },

  reportReview: (reviewId) => {
    return axios.put(`/api/reviews/${reviewId}/report`)
      .then(res => {
        return res;
      })
      .catch(err => {
        return err;
      });
  },

  submitFormData: (formData, config) => {
    return axios.post('api/reviews', formData, config);
  }
};
